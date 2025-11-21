import * as mdicons from '@mdi/js';
import vue from '@vitejs/plugin-vue2';
// import browserslistToEsbuild from 'browserslist-to-esbuild';
import { fileURLToPath, URL } from 'node:url';
import regexpPlugin from 'rollup-plugin-regexp';
import { VuetifyResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';

const mdi = {};
Object.keys(mdicons).forEach((key) => {
  const value = mdicons[key];
  mdi[
    key
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
      .replace(/([0-9]+)/g, '-$1')
  ] = value;
});

export default defineConfig({
  plugins: [
    regexpPlugin({
      exclude: ['node_modules/**'],
      find: /\b(?<![/\w])(mdi-[\w-]+)\b(?!\.)/,
      replace: (match) => {
        if (mdi[match]) {
          return mdi[match];
        } else {
          console.warn('[plugin-regexp] No matched svg icon for ' + match);
          return match;
        }
      },
      sourcemap: false
    }),
    vue(),
    Components({
      // generate `components.d.ts` global declarations
      dts: true,
      // auto import for directives
      directives: true,
      // resolvers for custom components
      resolvers: [
        // Vuetify
        VuetifyResolver()
      ]
    })
  ],
  // loader: {
  //   '.js': 'js',
  //   '.js': 'jsx',
  //   '.js': 'tsx', // 默认是 .js:js
  //   '.ts': 'tsx', // 默认是 .ts:ts
  //   '.tsx': 'tsx', // 默认就支持
  //   '.jsx': 'jsx' // 默认就支持
  // },
  esbuild: {
    // loader: {
    //   '.js': 'jsx',
    //   '.js': 'tsx', // 默认是 .js:js
    //   '.ts': 'tsx', // 默认是 .ts:ts
    //   '.tsx': 'tsx', // 默认就支持
    //   '.jsx': 'jsx' // 默认就支持
    // }
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue']
  },
  server: {
    host: '0.0.0.0',
    // port: 3000,
    watch: {
      usePolling: true
    },
    hmr: true,
    /// 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
    strictPort: false
    // open: '/'
  },
  /// 构建选项
  build: {
    // target: browserslistToEsbuild(),
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vuetify: ['vuetify']
          //   utils: ['lodash-es']
        }
      }
    }
  }
});
