const path = require('path')
const eslint = require('@eslint/js')
const tseslint = require('typescript-eslint')
const importPlugin = require('eslint-plugin-import')
const prettierPlugin = require('eslint-plugin-prettier/recommended')
const pluginVitest = require('@vitest/eslint-plugin')
const simpleImportSort = require('eslint-plugin-simple-import-sort')
const pluginReact = require('eslint-plugin-react')
const pluginReactHooks = require('eslint-plugin-react-hooks')
const jsxA11y = require('eslint-plugin-jsx-a11y')

module.exports = tseslint.config(
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: path.join(__dirname, 'tsconfig.json'),
        },
        node: true,
      },
      react: {
        version: 'detect',
      },
    },
  },
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    rules: pluginReactHooks.configs.recommended.rules,
  },
  jsxA11y.flatConfigs.recommended,
  {
    name: 'vpp-tests',
    files: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    ...pluginVitest.configs.recommended,
    rules: {
      ...pluginVitest.configs.recommended.rules,
      'vitest/no-disabled-tests': 'warn',
      'vitest/no-focused-tests': 'error',
      'vitest/prefer-to-have-length': 'warn',
      'jsx-a11y/anchor-has-content': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
    },
    settings: {
      vitest: {
        typecheck: true,
      },
      languageOptions: {
        globals: {
          ...pluginVitest.environments.env.globals,
        },
      },
    },
  },
  prettierPlugin,
  {
    name: 'eslint-config-truepill/frontend',
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      // These rules allow automatic nice-looking import sorting using --fix
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'sort-imports': 'off',
      'import/order': 'off',
      // These are disabled for stylistic reasons
      'no-console': [
        'warn',
        {
          allow: ['info', 'warn', 'debug', 'error', 'exception'],
        },
      ],
      'no-void': [
        'error',
        {
          allowAsStatement: true,
        },
      ],
      camelcase: 'off',
      '@typescript-eslint/camelcase': 'off',
      '@typescript-eslint/member-delimiter-style': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-use-before-define': 'error',
      // This is disabled so it doesn't delete stuff on autofix
      'no-unreachable': 'off',
      // These are enabled for more strictness
      '@typescript-eslint/no-useless-constructor': ['error'],
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/prefer-promise-reject-errors': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'no-var': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'react/jsx-uses-react': 'warn',
      'react/jsx-uses-vars': 'warn',
      'react/no-access-state-in-setstate': 'warn',
      'react/no-unused-state': 'warn',
      'react/prop-types': 'off',
      // These rules are duplicated by Typescript rules
      'no-array-constructor': 'off',
      'no-empty-function': 'off',
      'no-extra-semi': 'off',
      'no-unused-vars': 'off',
      'no-use-before-define': 'off',
      'no-useless-constructor': 'off',
      'require-await': 'off',
    },
  },
  {
    name: 'rum-react-integration',
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
  },
)
