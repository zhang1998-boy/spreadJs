
// 配置参考：http://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  extends: [
    'plugin:vue/essential', // vue的eslint规范
    '@lfiot/eslint-config-vue2' // vue2
  ],
  // 全局变量在此处加入生命，避免eslint校验
  globals: {
    BMap: true,
    htconfig: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'node_modules/@vue/cli-service/webpack.config.js',
      },
    },
  },
  rules: {
    'linebreak-style': [0, 'error', 'window'],
    'import/prefer-default-export': 0,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
};
