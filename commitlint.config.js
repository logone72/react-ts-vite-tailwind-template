/**
 * @see https://commitlint.js.org/reference/configuration.html
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-case': [2, 'always', 'lower-case'],
  },
};
