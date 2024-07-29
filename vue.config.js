const { defineConfig } = require('@vue/cli-service');
const port = process.env.PORT;

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  // 生产环境是否生成 sourceMap 文件,方便调试
  productionSourceMap: true,
  devServer: {
    port: port,
    proxy: {}
  }
});
