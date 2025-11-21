import { createPinia, PiniaVuePlugin } from 'pinia';
import 'uno.css';
import Vue from 'vue';
import '../components';
import App from './App.vue';
import { vuetify } from './plugins';
import router from './router';
import store from './store';
Vue.use(PiniaVuePlugin);
Vue.config.productionTip = false;

const pinia = createPinia();
export default {
  run(options) {
    options;
    console.log('run:', options);
    return new Vue({
      router,
      pinia,
      store,
      vuetify,
      render: (h) => h(App)
    }).$mount('#app');
  }
};
