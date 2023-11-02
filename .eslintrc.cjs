module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'tailwind.config.cjs', 'postcss.config.js'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react', 'import'],
  settings: {
    react: { version: '18.2' },
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/prop-types': 'off',
    '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/order': 'error',
    'sort-imports': ['error', { ignoreDeclarationSort: true }],
  },
};
