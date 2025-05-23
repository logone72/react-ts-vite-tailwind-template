#!/bin/bash

# Check for uncommitted changes
if ! git diff-index --quiet HEAD -- || ! git diff --cached --quiet; then
  echo -e "\033[31m[ERROR]\033[0m There are uncommitted changes in the current branch '$CURRENT_BRANCH'."
  echo -e "\033[34m[INFO]\033[0m Please commit or stash your changes before trying again."
  exit 1
fi

# Base branch
BASE_BRANCH="basic"

# Arrays to store results
SUCCESSFUL_BRANCHES=()
FAILED_BRANCHES=()

# Save current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# First checkout to base branch
echo -e "\033[32m[OK]\033[0m Switching to base branch: $BASE_BRANCH"
git checkout "$BASE_BRANCH" || { echo -e "\033[31m[ERROR]\033[0m Failed to checkout $BASE_BRANCH"; exit 1; }

# Check if up to date
git pull

# Get branch list excluding basic
BRANCHES=$(git branch --format='%(refname:short)' | grep -v "$BASE_BRANCH")

echo ""
echo -e "\033[34m[INFO]\033[0m Rebasing branches onto $BASE_BRANCH..."
echo ""

for BRANCH in $BRANCHES; do
    echo -e "\033[34m[INFO]\033[0m Rebasing $BRANCH onto $BASE_BRANCH..."
    git checkout "$BRANCH" >/dev/null 2>&1
    if git rebase "$BASE_BRANCH"; then
        echo -e "\033[32m[OK]\033[0m Rebase success: $BRANCH"
        SUCCESSFUL_BRANCHES+=("$BRANCH")
    else
        echo -e "\033[31m[ERROR]\033[0m Rebase failed (conflict): $BRANCH"
        FAILED_BRANCHES+=("$BRANCH")
        git rebase --abort
    fi
    echo ""
done

# Return to original branch
git checkout "$CURRENT_BRANCH" >/dev/null 2>&1

# Output results
echo -e "\033[32m[DONE]\033[0m Rebase completed!"
echo -e "\033[36m---------------------------\033[0m"
echo -e "\033[32mSuccessful branches:\033[0m"
for B in "${SUCCESSFUL_BRANCHES[@]}"; do
    echo " - $B"
done

if [ ${#FAILED_BRANCHES[@]} -gt 0 ]; then
    echo ""
    echo -e "\033[31mFailed branches:\033[0m"
    for B in "${FAILED_BRANCHES[@]}"; do
        echo " - $B"
    done
fi

# New array for branches that actually changed
CHANGED_BRANCHES=()

for BRANCH in "${SUCCESSFUL_BRANCHES[@]}"; do
    git checkout "$BRANCH" >/dev/null 2>&1

    # Check if there are differences between local branch and remote
    if ! git diff --quiet "$BRANCH" "origin/$BRANCH"; then
        CHANGED_BRANCHES+=("$BRANCH")
    fi
done

# Return to original branch
git checkout "$CURRENT_BRANCH" >/dev/null 2>&1

# If no changed branches, just skip and exit
if [ ${#CHANGED_BRANCHES[@]} -eq 0 ]; then
    echo ""
    echo -e "\033[34m[INFO]\033[0m No branches changed after rebase. Nothing to push."
    exit 0
fi

# If there are changed branches, ask
echo ""
echo -e "\033[34m[INFO]\033[0m The following branches have actual changes after rebase:"
for B in "${CHANGED_BRANCHES[@]}"; do
    echo " - $B"
done
echo ""
echo -e "\033[34m[INFO]\033[0m Do you want to push these branches to origin? (y/n)"
read -r PUSH_CONFIRM

if [[ ! "$PUSH_CONFIRM" =~ ^[Yy]$ ]]; then
    echo -e "\033[34m[INFO]\033[0m Skipping push. Exiting."
    exit 0
fi

# Proceed with push
echo ""
echo -e "\033[34m[INFO]\033[0m Pushing changed branches to origin..."
echo ""

for BRANCH in "${CHANGED_BRANCHES[@]}"; do
    echo -e "\033[34m[INFO]\033[0m Pushing $BRANCH to origin..."
    git checkout "$BRANCH" >/dev/null 2>&1
    if git push origin "$BRANCH" --force-with-lease; then
        echo -e "\033[32m[OK]\033[0m Push success: $BRANCH"
    else
        echo -e "\033[31m[ERROR]\033[0m Push failed: $BRANCH"
    fi
    echo ""
done

# Final checkout back to the original branch
git checkout "$CURRENT_BRANCH" >/dev/null 2>&1
echo -e "\033[34m[INFO]\033[0m Returned to branch: $CURRENT_BRANCH"