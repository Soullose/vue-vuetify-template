import Vue from 'vue';
import '../components';
import App from './App.vue';
import { vuetify } from './plugins';
import router from './router';
import store from './store';
Vue.config.productionTip = false;

export default {
  run(options) {
    options;
    console.log('run:', options);
    return new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App)
    }).$mount('#app');
  }
};
