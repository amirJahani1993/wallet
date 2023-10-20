module.exports = {
  root: true,
  extends: '@react-native',
  parser: '@typescript-eslint/parser',
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    'prettier/prettier': 'warn',
  },
};
