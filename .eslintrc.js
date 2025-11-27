module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    '@react-native-community',
    'airbnb-base',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:jest/recommended',
  ],
  rules: {
    // '@typescript-eslint/indent': ['error', 2],
    // This global require is disabled because of using images in the application
    'global-require': 0,
    '@typescript-eslint/no-use-before-define': ['off', {allowTypedFunctionExpressions: true}],
    'no-use-before-define': ['off', {allowTypedFunctionExpressions: true}],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'react/prop-types': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/prefer-default-export': 'off',
    // see https://github.com/benmosher/eslint-plugin-import/issues/1558
    'import/extensions': [
      'error',
      'always',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
      },
    ],
    quotes: [2, 'single', {avoidEscape: true}],
    'key-spacing': ['error', {beforeColon: false, afterColon: true}],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.native.js'],
      },
    },
  },
  plugins: ['jest', 'react-hooks'],
};
