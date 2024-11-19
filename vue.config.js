const { resolve } = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development';
// config 文件
const appConfig = require('./app.config'); // 本地|CDN上js|css资源文件
// const proxyMsg = require('./dev.env.js') // TODO: 本地开发使用mock，使用正是接口 解注释

const cdn = {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  externals: appConfig.externals,
  css: appConfig.css,
  js: appConfig.js,
};

module.exports = {
  publicPath: process.env.BASE_URL, // 根域上下文目录
  outputDir: 'dist', // 构建输出目录
  assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
  lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
  runtimeCompiler: true, // 运行时版本是否需要编译
  transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  productionSourceMap: !isProduction, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  filenameHashing: true,

  chainWebpack: (config) => {
    config.plugin('html')
      .tap((args) => {
        args[0].cdn = cdn;
        return args;
      });

    // 打包配置输出文件
    config.output.filename('js/[name].[hash].js').end();
    config.output.chunkFilename('js/[name].[hash].js').end();

    config.resolve.alias
      .set('@', resolve('src'))
      .set('~@', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'));
    // 移除 preload 插件，避免加载多余的资源
    config.plugins.delete('preload-index');
    // 移除 prefetch 插件
    config.plugins.delete('prefetch-index');

    config.plugin('html').tap((args) => {
      args[0].title = 'vue2 template';
      return args;
    });
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons')) // 排除掉src/icons目录
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons')) // 指定src/icons要处理svg的文件目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader') // 用svg-sprite-loader解析
      .options({
        symbolId: 'icon-[name]', // symbol id命名格式 icon-图标名称
      })
      .end();

    const oneOfsMap = config.module.rule('scss').oneOfs.store;
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Provide path to the file with resources
          hoistUseStatements: true,
          // 要公用的scss的路径
          resources: [
            resolve('src/assets/style/variables.scss'),
            resolve('src/assets/style/mixin.scss'),
            resolve('node_modules/@longfor/maia-ui-v2-theme/element-variables.scss')
          ],
        })
        .end();
    });
  },
  configureWebpack: (config) => {
    config.externals = cdn.externals; // CDN引入配置

    if (isProduction) {
      // 代码压缩
      config.plugins.push(
        new TerserPlugin({
          terserOptions: {
            // 生产环境自动删除console
            compress: {
              drop_debugger: true,
              drop_console: true,
              pure_funcs: ['console.log'],
            },
          },
          sourceMap: false,
          parallel: true,
        })
      );

      // gzip压缩,需要后台同学配合，根据需要自行放开
      const productionGzipExtensions = ['html', 'js', 'css'];
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp(
            `\\.(${productionGzipExtensions.join('|')})$`
          ),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          // deleteOriginalAssets: true // 删除原文件
        })
      );
    } else {
      config.devtool = 'cheap-source-map';
    }

    // stylelint
    config.plugins.push(
      new StyleLintPlugin({
        files: ['src/**/*.{css,scss,less,html,vue}'],
        fix: true,
        cache: false,
        emitErrors: true,
        failOnError: false,
      })
    );
  },
  devServer: {
    quiet: true,
    port: 8098,
    https: true,
    // host: 'localhost-uat.longfor.com',
    overlay: {
      warnings: false,
      errors: false,
    },
    clientLogLevel: process.env.NODE_ENV === 'development' ? 'none' : 'info', // 控制日志级别
    proxy: {
      '/zt-invest-calculate': {
        target: 'https://gateway-open-uat.longfor.com/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/zt-invest-calculate': '/zt-invest-calculate' // 重写路径
        }
      },
    },
    open: true,
    hot: true,
    compress: true,
  },
};
