module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true
  },
  ignorePatterns: ['.eslintrc.js'],
  overrides: [
    {
      files: ['*.ts', '*.js'],
      rules: {
        'comma-dangle': [
          'error',
          {
            arrays: 'never',
            objects: 'never',
            imports: 'never',
            exports: 'never',
            functions: 'never'
          }
        ],
        'jsx-quotes': ['error', 'prefer-single'],
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-shadow': 'off',
        'no-undef': 'off',
        'prettier/prettier': [
          'error',
          {
            'no-inline-styles': false
          }
        ],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
              regex: '^I[A-Z]',
              match: true
            }
          },
          {
            selector: ['class'],
            format: ['PascalCase'],
            leadingUnderscore: 'forbid'
          },
          {
            selector: ['function'],
            format: ['strictCamelCase'],
            leadingUnderscore: 'allow'
          },
          {
            selector: 'variable',
            format: ['strictCamelCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow'
          }
        ]
      },
      ignore: ['webpack.config.js']
    }
  ]
};
