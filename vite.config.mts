import * as mdicons from '@mdi/js';
import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue2';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import { fileURLToPath, URL } from 'node:url';
import postcssPresetEnv from 'postcss-preset-env';
import regexpPlugin from 'rollup-plugin-regexp';
import UnoCSS from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { VuetifyResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import { compression } from 'vite-plugin-compression2';
import Inspect from 'vite-plugin-inspect';
import { viteMockServe } from 'vite-plugin-mock';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';

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

export default defineConfig(({ command }) => {
  // console.log('command:', command);
  return {
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/]
      }),
      viteMockServe({
        // default
        mockPath: 'mock',
        enable: command === 'serve',
        ignore: /^\_/,
        watchFiles: true
      }),
      Pages({
        dirs: [
          // issue #68
          { dir: fileURLToPath(new URL('./src/views', import.meta.url)), baseRoute: '' },
          // 案例
          { dir: fileURLToPath(new URL('src/features/**/pages', import.meta.url)), baseRoute: 'features' },
          { dir: fileURLToPath(new URL('src/admin/pages', import.meta.url)), baseRoute: 'admin' }
        ],
        exclude: ['**/components.{ts,tsx}'],
        extensions: ['vue', 'md', 'jsx'],
        extendRoute(route: any) {
          // console.log('route-:', route);
          // if (route.path === '/') {
          //   return {
          //     ...route,
          //     redirect: '/home'
          //   };
          // }
          // 404页面不加权限
          if (route.name == 'all') {
            return route;
          }
          if (route.name === 'about') route.props = (route: any) => ({ query: route.query.q });

          if (route.name === 'components') {
            return {
              ...route,
              beforeEnter: (route: any) => {
                console.log(route);
              }
            };
          }
        }
      }),
      Layouts({ layoutsDirs: 'src/framework/core/layout', defaultLayout: 'home' }),
      legacy(),
      Inspect(),
      compression(),
      regexpPlugin({
        exclude: ['node_modules/**', 'node_modules/@mdi\/js\/.+', 'node_modules\/vuetify\/.+'],
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
      Components({
        dirs: ['src/components', 'src/framework/core/layout'],
        // generate `components.d.ts` global declarations
        dts: true,
        // auto import for directives
        directives: true,
        // resolvers for custom components
        resolvers: [
          // Vuetify
          VuetifyResolver()
        ]
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.vue\.[tj]sx?\?vue/, // .vue (vue-loader with experimentalInlineMatchResource enabled)
          /\.md$/ // .md
        ],
        imports: [
          'vue',
          'vue-router',
          'pinia',
          // custom
          {
            '@vueuse/core': [
              // named imports
              'useMouse', // import { useMouse } from '@vueuse/core',
              // alias
              ['useFetch', 'useMyFetch'] // import { useFetch as useMyFetch } from '@vueuse/core',
            ],
            axios: [
              // default imports
              ['default', 'axios'] // import { default as axios } from 'axios',
            ]
          },
          // example type import
          {
            from: 'vue-router',
            imports: ['RouteLocationRaw'],
            type: true
          },
          {
            // '@/framework/core/layout/home/index.vue': ['HomeLayout', ['default', 'HomeLayout']],
            // '@/views/HomeView.vue': ['HomeView', ['default', 'HomeView']]
          }
        ],
        // Array of strings of regexes that contains imports meant to be filtered out.
        ignore: ['useMouse', 'useFetch'],
        // Enable auto import by filename for default module exports under directories
        defaultExportByFilename: false,
        // Options for scanning directories for auto import
        dirsScanOptions: {
          types: true // Enable auto import the types under the directories
        },
        // Auto import for module exports under directories
        // by default it only scan one level of modules under the directory
        dirs: [
          'src/components', // only root modules
          'src/components/**', // all nested modules
          'src/views',
          'src/views/HomeView.vue',
          'src/framework/core/layout/',
          'src/framework/core/layout/**',
          'src/framework/core/layout/home',
          'src/framework/core/layout/home/**',
          'src/framework/core/layout/default',
          // 'src/framework/core/layout/default/**',
          // ...
          {
            glob: './hooks',
            types: true // enable import the types
          },
          {
            glob: './composables',
            types: false // If top level dirsScanOptions.types importing enabled, just only disable this directory
          }
          // ...
        ],
        // Filepath to generate corresponding .d.ts file.
        // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
        // Set `false` to disable.
        dts: './auto-imports.d.ts',
        // Array of strings of regexes that contains imports meant to be ignored during
        // the declaration file generation. You may find this useful when you need to provide
        // a custom signature for a function.
        ignoreDts: ['ignoredFunction', /^ignore_/],
        // Auto import inside Vue template
        // see https://github.com/unjs/unimport/pull/15 and https://github.com/unjs/unimport/pull/72
        vueTemplate: true,

        // Auto import directives inside Vue template
        // see https://github.com/unjs/unimport/pull/374
        vueDirectives: undefined,

        // Custom resolvers, compatible with `unplugin-vue-components`
        // see https://github.com/antfu/unplugin-auto-import/pull/23/
        resolvers: [
          /* ... */
        ],
        // Include auto-imported packages in Vite's `optimizeDeps` options
        // Recommend to enable
        viteOptimizeDeps: true,
        // Inject the imports at the end of other imports
        injectAtEnd: true,
        // Generate corresponding .eslintrc-auto-import.json file.
        // eslint globals Docs - https://eslint.org/docs/user-guide/configuring/language-options#specifying-globals
        eslintrc: {
          enabled: true, // Default `false`
          // provide path ending with `.mjs` or `.cjs` to generate the file with the respective format
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        // Save unimport items into a JSON file for other tools to consume
        dumpUnimportItems: './auto-imports.json' // Default `false`
      }),
      UnoCSS()
    ],
    css: {
      devSourcemap: true,
      preprocessorMaxWorkers: true,
      // https://vitejs.dev/config/#css-preprocessoroptions
      preprocessorOptions: {
        sass: {
          additionalData: [
            // vuetify variable overrides
            '@import "@/assets/styles/variables.scss"',
            ''
          ].join('\n')
        }
      },
      postcss: {
        plugins: [postcssPresetEnv({ stage: 3 })]
      }
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
      port: 3000,
      watch: {
        usePolling: true
      },
      hmr: true,
      /// 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
      strictPort: false
      // open: '/home'
    },
    /// 构建选项
    build: {
      target: browserslistToEsbuild(),
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
  };
});
