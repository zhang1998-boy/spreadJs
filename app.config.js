module.exports = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    echarts: 'echarts',
  },
  // cdn的css链接
  css: [

  ],
  // cdn的js链接
  js: [
    'https://s1.longfor.com/public/js/vue/2.6.12/vue.min.js',
    'https://s1.longfor.com/public/js/vue-router/3.5.3/vue-router.min.js',
    'https://s1.longfor.com/public/js/vux/3.6.2/vuex.min.js',
    'https://s1.longfor.com/public/js/echart/5.2.2/echarts.min.js',

    'https://s.longfor.com/public/js/maia-apm/2.0/maia-apm-sdk.js' // APM生产环境
    // 'https://s.longfor.com/public/js/maia-apm/2.0/maia-apm-sdk.test.js' // APM测试环境
  ],
};
