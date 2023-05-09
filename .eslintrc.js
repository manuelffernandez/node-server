module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true
  },
  extends: 'standard-with-typescript',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    project: ['tsconfig.json']
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off'
  }
}
