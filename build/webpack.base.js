
const { resolve } = require('path')
const WebpackBar = require('webpackbar');
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { IS_DEV, PROJECT_PATH, EXCLUE_DIR, URLS_INFO } = require('./config.js');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const outPath = IS_DEV ? './dist-test' : './dist'
const proPlugins = !IS_DEV ? [
  new MiniCssExtractPlugin({
    filename: 'assets/css/app.[contenthash:8].css',
    chunkFilename: 'assets/css/app.[contenthash:8].css',
    ignoreOrder: false,
  }),
] : []
module.exports = {
  entry: resolve(PROJECT_PATH, './src/index.js'),
  output: {
    path: resolve(PROJECT_PATH, outPath),
    filename: 'assets/js/app.[hash:8].js',
  },
  resolve:{
    extensions: ['.js', '.ts', '.jsx', '.tsx'],
    alias: {
      '@': resolve(PROJECT_PATH, './src') 
    }
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendors: {
          name: `chunk-vendors`,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial',
          // name(module) {
          //   const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
          //   return `pkg.${packageName.replace('@', '')}`
          // }
        },
        common: {
          name: `chunk-common`,
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        use: ['babel-loader'],
        exclude: EXCLUE_DIR //排除 node_modules 目录
      },
      {
        test: /\.css$/i,
        use: [ 
          IS_DEV ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer'),
                // 修复一些和 flex 布局相关的 bug
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  autoprefixer: {
                    grid: true,
                    flexbox: 'no-2009'
                  },
                  stage: 3,
                }),
              ]
            }
          }
       ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]  
      },
      // {
      //   test: /\.(sass|scss)$/i,
      //   use:[
      //     'style-loader',
      //     'css-loader',
      //     {
      //       loader: 'sass-loader',
      //       options: {
      //         // indentedSyntax: true,
      //         // sass-loader version >= 8
      //         // sassOptions: {
      //         //   indentedSyntax: true
      //         // }
      //       },
      //     }
      //   ],
      //   // exclude: EXCLUE_DIR
      // },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, //10K
              esModule: false,
              outputPath: 'assets'
            }
          }
        ],
        exclude: EXCLUE_DIR
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(PROJECT_PATH, './public/index.html'),
      filename: 'index.html',
      cache: false, // 特别重要：防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
      minify: IS_DEV ? false : {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        useShortDoctype: true,
      }
    }),
    
    new CopyPlugin({
      patterns: [
        {
          context: resolve(PROJECT_PATH, './public'),
          from: '*',
          to: resolve(PROJECT_PATH, './dist'),
          toType: 'dir',
        },
      ],
    }),
    // new VueLoaderPlugin(),
    new HardSourceWebpackPlugin(),
    new HardSourceWebpackPlugin.ExcludeModulePlugin([
      {
        // HardSource works with mini-css-extract-plugin but due to how
        // mini-css emits assets, assets are not emitted on repeated builds with
        // mini-css and hard-source together. Ignoring the mini-css loader
        // modules, but not the other css loader modules, excludes the modules
        // that mini-css needs rebuilt to output assets every time.
        test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
      }
    ]),
    new CleanWebpackPlugin(),
    new WebpackBar({
      reporter: {
        done: function(){
          console.log()
          console.log(`App running at:`)
          console.log(`  - Local:   ${chalk.cyan(URLS_INFO.localUrlForTerminal)}`)
          console.log(`  - Network: ${chalk.cyan(URLS_INFO.lanUrlForTerminal)}`)
        }
      }
    }),
    ...proPlugins,
  ]
}