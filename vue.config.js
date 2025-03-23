const { defineConfig } = require('@vue/cli-service');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const { VuetifyLoaderPlugin } = require('vuetify-loader');
// var webpack = require('webpack');
const path = require('path');
module.exports = defineConfig(async () => {
  const { default: UnoCSS } = await import('@unocss/webpack');
  return {
    transpileDependencies: ['vuetify', 'unocss'],
    // transpileDependencies: true,
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    productionSourceMap: true,
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
            use: [
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true
                }
              }
            ]
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
          }
        ]
      },
      plugins: [
        new CompressionPlugin({
          algorithm: 'gzip',
          threshold: 8192,
          filename: '[path][base].gz[query]'
        }),
        new MiniCssExtractPlugin({
          // filename: 'css/[name].[contenthash].css'
        }),
        new LodashModuleReplacementPlugin(),
        new VuetifyLoaderPlugin(),
        UnoCSS({})
      ],
      optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        realContentHash: true
      },
      experiments: {
        asyncWebAssembly: true,
        syncWebAssembly: true
      }
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
      open: true
    }
  };
});
