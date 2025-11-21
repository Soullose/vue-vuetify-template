import Vue from 'vue';
// import type { VuetifyParsedTheme } from 'vuetify/types/services/theme'
import Vuetify from 'vuetify/lib';
import { Resize, Ripple, Scroll } from 'vuetify/lib/directives';
import zhHans from 'vuetify/lib/locale/zh-Hans';

const svgIcons = Object.fromEntries(
  Object.entries(
    import.meta.glob<Component>('@/assets/icons/*.svg', {
      eager: true,
      import: 'default',
    }),
  ).map(([k, v]) => [filename(k), { component: v }]),
)

Vue.use(Vuetify,{
  directives: {
    Ripple,
    Resize,
    Scroll
  },
});

export default new Vuetify({
  lang: {
    locales: { zhHans },
    current: 'zhHans'
  },
  icons: {
    iconfont: 'mdiSvg',
    values: {
      ...svgIcons
    }
  }
});
