module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['prettier'],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'prefer-const': 'error',
    'no-console': 'off',
    // 要求使用 === 和 !==
    eqeqeq: 'warn',
  },
}
