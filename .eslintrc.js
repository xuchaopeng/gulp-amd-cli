module.exports = {
  root: true,
  // 环境配置（根据实际情况做取舍）
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    jquery: true
  },
  // 继承eslint的默认配置和prettier的配置。
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  // 支持babel的使用
  parser: 'babel-eslint',
  parserOptions: {
    // 支持es6模块语法
    sourceType: 'module'
  },
  // 自定义规则（优先级最高）
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        printWidth: 120,
        tabWidth: 2,
        semi: true
      }
    ],
    'no-console': 'off',
    "no-unused-vars":0,
    "no-undef":0,
    "no-useless-escape":0
  }
};