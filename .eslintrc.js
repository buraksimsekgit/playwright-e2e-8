module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    // "plugin:prettier/recommended", // Add Prettier plugin
  ],
  parser: '@typescript-eslint/parser', // Specify the TypeScript parser
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: "./tsconfig.json",
  },
  rules: {
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
    'max-len': [
      'error',
      { code: 120, ignoreComments: true, ignoreStrings: true },
    ],
    'no-undef': 'off',
    "@typescript-eslint/no-floating-promises": "error", // rule to make sure there are no missing awaits before the asynchronous calls to the Playwright API.
    // "prettier/prettier": "error", // Add Prettier rules
  },
}
