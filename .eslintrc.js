module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    jest: true,
    browser: true, 
  },
  parserOptions: {
    ecmaVersion: 2020, 
    sourceType: 'module', 
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: ['node_modules/*'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect', 
    },
  },
  rules: {
    'linebreak-style': ['error', 'unix'], 
    'react/prop-types': 'off', 
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/anchor-is-valid': ['error', {
      'components': ['Link'],
      'specialLink': ['hrefLeft', 'hrefRight'],
      'aspects': ['invalidHref', 'preferButton']
    }],
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
  },
};
