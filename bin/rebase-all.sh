#!/bin/bash

# Check for uncommitted changes
if ! git diff-index --quiet HEAD -- || ! git diff --cached --quiet; then
  echo "[ERROR] There are uncommitted changes in the current branch '$CURRENT_BRANCH'."
  echo "[INFO] Please commit or stash your changes before trying again."
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
echo "[OK] Switching to base branch: $BASE_BRANCH"
git checkout "$BASE_BRANCH" || { echo "[ERROR] Failed to checkout $BASE_BRANCH"; exit 1; }

# Check if up to date
git pull

# Get branch list excluding basic
BRANCHES=$(git branch --format='%(refname:short)' | grep -v "$BASE_BRANCH")

echo ""
echo "[INFO] Rebasing branches onto $BASE_BRANCH..."
echo ""

for BRANCH in $BRANCHES; do
    echo "[INFO] Rebasing $BRANCH onto $BASE_BRANCH..."
    git checkout "$BRANCH" >/dev/null 2>&1
    if git rebase "$BASE_BRANCH"; then
        echo "[OK] Rebase success: $BRANCH"
        SUCCESSFUL_BRANCHES+=("$BRANCH")
    else
        echo "[ERROR] Rebase failed (conflict): $BRANCH"
        FAILED_BRANCHES+=("$BRANCH")
        git rebase --abort
    fi
    echo ""
done

# Return to original branch
git checkout "$CURRENT_BRANCH" >/dev/null 2>&1

# Output results
echo "[DONE] Rebase completed!"
echo "---------------------------"
echo "[OK] Successful branches:"
for B in "${SUCCESSFUL_BRANCHES[@]}"; do
    echo " - $B"
done

echo ""
echo "[ERROR] Failed branches:"
for B in "${FAILED_BRANCHES[@]}"; do
    echo " - $B"
done
