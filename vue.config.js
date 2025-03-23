const { defineConfig } = require('@vue/cli-service');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const { VuetifyLoaderPlugin } = require('vuetify-loader');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
// const threadLoader = require('thread-loader');
// var webpack = require('webpack');
const path = require('path');

// const jsWorkerPool = {
//   // options

//   // 产生的 worker 的数量，默认是 (cpu 核心数 - 1)
//   // 当 require('os').cpus() 是 undefined 时，则为 1
//   workers: 2,
//   // 一个 worker 进程中并行执行工作的数量
//   // 默认为 20
//   workerParallelJobs: 50,

//   // 额外的 node.js 参数
//   workerNodeArgs: ['--max-old-space-size=1024'],

//   // 允许重新生成一个僵死的 work 池
//   // 这个过程会降低整体编译速度
//   // 并且开发环境应该设置为 false
//   poolRespawn: false,
//   // 闲置时定时删除 worker 进程
//   // 默认为 500ms
//   // 可以设置为无穷大， 这样在监视模式(--watch)下可以保持 worker 持续存在
//   poolTimeout: 500,
//   // 池分配给 worker 的工作数量
//   // 默认为 200
//   // 降低这个数值会降低总体的效率，但是会提升工作分布更均一
//   poolParallelJobs: 50,
//   // 池的名称
//   // 可以修改名称来创建其余选项都一样的池
//   name: 'my-pool'
// };
// threadLoader.warmup(jsWorkerPool, ['babel-loader']);
module.exports = defineConfig(async () => {
  const { default: UnoCSS } = await import('@unocss/webpack');
  return {
    transpileDependencies: ['vuetify', 'unocss'],
    // transpileDependencies: ['vuetify'],
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    productionSourceMap: false,
    configureWebpack: {
      devtool: 'inline-source-map',
      resolve: {
        alias: {
          '@': path.join(__dirname, 'src'),
          '@assets': path.join(__dirname, 'src', 'assets'),
          '@components': path.join(__dirname, 'src', 'components'),
          '@defaultLayout': path.join(__dirname, 'src', 'layout', 'default'),
          '@homeLayout': path.join(__dirname, 'src', 'layout', 'home'),
          '@framework': path.join(__dirname, 'src', 'framework')
        }
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            include: path.resolve('src'),
            use: [
              // {
              //   loader: 'thread-loader',
              //   options: jsWorkerPool
              // },
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true
                }
              }
            ]
          },
          {
            test: /\.module\.(scss|sass)$/,
            include: path.resolve('src'),
            use: [
              'style-loader',
              MiniCssExtractPlugin.loader, // 仅生产环境
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [['postcss-preset-env']]
                  }
                }
              },
              // {
              //   loader: 'thread-loader',
              //   options: {
              //     workerParallelJobs: 2
              //   }
              // },
              'sass-loader'
            ].filter(Boolean)
          },
          {
            test: /\.md$/,
            use: [
              {
                loader: 'html-loader'
              },
              {
                loader: 'markdown-loader',
                options: {
                  // Pass options to marked
                  // See https://marked.js.org/using_advanced#options
                }
              }
            ]
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource'
          }
        ]
      },
      plugins: [
        new CompressionPlugin({
          algorithm: 'gzip',
          threshold: 10240,
          filename: '[path][base].gz[query]'
        }),
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash].css'
        }),
        new LodashModuleReplacementPlugin(),
        new VuetifyLoaderPlugin(),
        UnoCSS({}),
        // 打包体积分析
        // new BundleAnalyzerPlugin(),
        new SpeedMeasurePlugin()
      ],
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            parallel: 4,
            terserOptions: {
              parse: {
                ecma: 8
              },
              compress: {
                ecma: 5,
                warnings: false,
                comparisons: false,
                inline: 2,
                drop_console: true,
                drop_debugger: true
              },
              mangle: {
                safari10: true
              },
              output: {
                ecma: 5,
                comments: false,
                ascii_only: true
              }
            }
          })
        ],
        realContentHash: true
      },
      experiments: {
        asyncWebAssembly: true,
        syncWebAssembly: true
      }
      // cache: {
      //   type: 'filesystem',
      //   compression: 'gzip',
      //   allowCollectingMemory: true,
      //   cacheDirectory: path.resolve(__dirname, '.temp_cache'),
      //   buildDependencies: {
      //     config: [__filename]
      //   }
      // }
    },
    chainWebpack(config) {
      config.module.rule('vue').uses.delete('cache-loader');
      config.merge({
        cache: false
      });
    },
    css: {
      extract:
        process.env.NODE_ENV === 'development'
          ? {
              filename: 'css/[name].css',
              chunkFilename: 'css/[name].css'
            }
          : true
    },
    devServer: {
      host: '0.0.0.0',
      port: 3000,
      open: true,
      compress: true,
      hot: true
    }
  };
});
