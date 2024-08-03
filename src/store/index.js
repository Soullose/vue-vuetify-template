import framework from '@/framework/store';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 框架状态，外观
    theme: {
      asideMenuFolded: false
    }
  },
  getters: {},
  mutations: {
    TOGGLE_ASIDE_MENU(state) {
      state.theme.asideMenuFolded = !state.theme.asideMenuFolded;
    }
  },
  actions: {},
  modules: { framework }
});
