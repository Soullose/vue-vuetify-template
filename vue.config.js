const { defineConfig } = require('@vue/cli-service');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const { VuetifyLoaderPlugin } = require('vuetify-loader');
// var webpack = require('webpack');
module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  productionSourceMap: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': __dirname + '/src',
        '@assets': __dirname + '/src/assets',
        '@components': __dirname + '/src/components',
        '@defaultLayout': __dirname + '/src/layout/default',
        '@homeLayout': __dirname + '/src/layout/home'
      }
    },
    module: {
      rules: [
        // {
        //   loader: 'babel-loader',
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   options: {
        //     plugins: ['lodash'],
        //     presets: [['env', { modules: false, targets: { node: 4 } }]]
        //   }
        // }
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
      new VuetifyLoaderPlugin()
    ],
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()]
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    open: true
  }
});
