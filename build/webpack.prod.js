const { resolve } = require('path');
const glob = require('glob');
const { merge }= require('webpack-merge');
const common = require('./webpack.base.js');
const TerserPlugin = require("terser-webpack-plugin");
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { PROJECT_PATH, EXCLUE_DIR } = require('./config.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'none',
  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin({
      extractComments: false,
      parallel: true, //-- 多进程打包
      terserOptions: {
        compress: { pure_funcs: ['console.log'] },
      },
    })].filter(Boolean),
  },
  plugins: [
    new PurgeCSSPlugin({
      paths: glob.sync(`${resolve(PROJECT_PATH, './src')}/**/*.{tsx,scss,less,css}`, { nodir: true }),
      whitelist: ['html', 'body']
    }),
    // isReport && isReport.includes('report=true') ? new BundleAnalyzerPlugin(): ''
  ]
});