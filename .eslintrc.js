module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    //'standard-with-typescript',
    //'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    'prettier/prettier': 'error'
    //'@typescript-eslint/quotes': 'off',
    //semi: 'off',
    //quotes: 'off'
  },

  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      env: {
        node: true
      },
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],

  ignorePatterns: ['.eslintrc.js']
}
