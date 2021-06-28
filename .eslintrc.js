module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'arrow-parens': 'off',
    'space-unary-ops': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-confusing-arrow': 'off',
  },
};
