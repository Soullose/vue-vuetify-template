import type { InstallPlugin } from '@/framework/utils/types';
import type { Component } from 'vue';
import 'vuetify/dist/vuetify.min.css';
import Vuetify from 'vuetify/lib';
import { Resize, Ripple, Scroll } from 'vuetify/lib/directives';
import en from 'vuetify/lib/locale/en';
import zhHans from 'vuetify/lib/locale/zh-Hans';
// import type { VuetifyParsedTheme } from 'vuetify/types/services/theme';

function filename(path: string) {
  return path
    .split(/(\\|\/)/g)
    .pop()!
    .replace(/\.[^/.]+$/, '');
}

const svgIcons = Object.fromEntries(
  Object.entries(
    import.meta.glob<Component>('@/assets/icons/*.svg', {
      eager: true,
      import: 'default'
    })
  ).map(([k, v]) => [filename(k), { component: v }])
);

const theme = {
  primary: '#388FFF', // 2A87FF
  secondary: '#2A87FF',
  accent: '#9C27b0',
  info: '#00CAE3'
};

const light = {
  primary: '#000',
  secondary: '#FFD65E',
  accent: '#EDAFB8',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
};
export const install: InstallPlugin = (vue) => {
  vue.use(Vuetify, {
    directives: {
      Ripple,
      Resize,
      Scroll
    }
  });
  return new Vuetify({
    lang: {
      locales: { zhHans, en },
      current: 'zhHans'
    },
    theme: {
      disable: false,
      dark: false,
      themes: {
        light: {
          primary: '#1565C0',
          secondary: '#50606F',
          tertiary: '#48617B',
          accent: '#9c27b0', // 强调色
          error: '#BA1A1A', // 错误色
          info: '#00bcd4', // 信息色
          success: '#4caf50', // 成功色
          warning: '#ff9800' // 警告色
        },
        dark: {
          primary: '#A9C7FF',
          secondary: '#B8C8D9',
          tertiary: '#AFC9E7',
          accent: '#9c27b0', // 强调色
          error: '#FFB4AB', // 错误色
          info: '#00bcd4', // 信息色
          success: '#4caf50', // 成功色
          warning: '#ff9800' // 警告色
        }
      },
      options: {
        // themeCache: {
        //   // https://vuetifyjs.com/features/theme/#section-30ad30e330c330b730e5
        //   get: (key: VuetifyParsedTheme) => {
        //     return localStorage.getItem(`parsed-theme-${key.primary.base}`);
        //   },
        //   set: (key: VuetifyParsedTheme, value: string) => {
        //     localStorage.setItem(`parsed-theme-${key.primary.base}`, value);
        //   }
        // },
        customProperties: true
      }
    },
    icons: {
      iconfont: 'mdiSvg',
      values: {
        ...svgIcons
      }
    },
    breakpoint: {
      thresholds: {
        xs: 600,
        sm: 960,
        md: 1280,
        lg: 1920
      },
      mobileBreakpoint: 'sm',
      scrollBarWidth: 0
    }
  });
};
