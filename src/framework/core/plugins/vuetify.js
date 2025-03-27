import Vue from 'vue';
import 'vuetify/dist/vuetify.min.css';
import Vuetify from 'vuetify/lib/framework';
import zhHans from 'vuetify/lib/locale/zh-Hans';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { zhHans },
    current: 'zhHans'
  },
  icons: {
    iconfont: 'mdiSvg'
  },
  theme: {}
});
