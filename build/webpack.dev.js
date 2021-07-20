const { merge } = require('webpack-merge');
const common = require('./webpack.base.js');
const { PORT, HOST} = require('./config.js');
module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-source-map', //开发环境下使用
  devServer: {
    host: HOST,
    port: PORT, //默认是8080
    quiet: false, //默认不启用
    inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
    stats: "errors-only", //终端仅打印 error
    overlay: false, //默认不启用
    clientLogLevel: "silent", //日志等级
    compress: true,//是否启用 gzip 压缩,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
});