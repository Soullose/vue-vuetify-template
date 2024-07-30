const { join } = require('path');
const { defineConfig } = require('@vue/cli-service');
const CompressionPlugin = require('compression-webpack-plugin');
const port = process.env.PORT;

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  // 生产环境是否生成 sourceMap 文件,方便调试
  productionSourceMap: true,
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: 'w2',
    resolve: {
      alias: {
        '@': join(__dirname, 'src')
      }
    },
    plugins: [
      new CompressionPlugin({
        algorithm: 'gzip',
        filename: '[path][base].gz',
        test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 匹配文件名
        threshold: 10240, // 对超过10k的数据压缩
        // Compress all assets, including files with `0` bytes size
        // minRatio: Infinity

        // Compress all assets, excluding files with `0` bytes size
        // minRatio: Number.MAX_SAFE_INTEGER

        minRatio: 0.8,
        deleteOriginalAssets: false // 不删除源文件
      })
    ]
  },
  devServer: {
    open: true,
    port: port,
    proxy: {}
  }
});
