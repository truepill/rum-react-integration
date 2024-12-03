module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    // Disabled till anchor tag have fully been resolved
    'jsx-a11y/anchor-is-valid': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    'max-len': ['error', { ignoreTemplateLiterals: true, ignoreStrings: true, code: 250 }],
    'jsx-a11y/click-events-have-key-events': 'warn',
    '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/no-restricted-imports': [
      'warn',
      {
        paths: [
          {
            name: '@truepill/react-capsule',
            importNames: ['Modal', 'Button', 'TextField', 'Select', 'Autocomplete'],
            message: 'Use pre-styled version of this component.',
            allowTypeImports: true,
          },
        ],
      },
    ],
  },
  extends: ['@truepill/eslint-config-truepill/frontend', 'prettier'],
  settings: {
    'import/resolver': {
      typescript: {},
      node: {
        extension: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  ignorePatterns: [
    '__mocks__',
    'jest.config.ts',
    '.babelrc',
    'jest.setup.ts',
    '.eslintrc.js',
    '.prettierrc.js',
    'e2e',
    'getContentfulEnvironment.js',
    '**/*.test.tsx',
    'src/testing',
    'vite.config.ts',
  ],
}
