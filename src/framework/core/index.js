import '@/assets/styles/index.scss';
// import { createPinia, PiniaVuePlugin } from 'pinia';
import Vue from 'vue';
import '../components';
import App from './App.vue';
import plugins from './plugins';
import router from './router';
// import store from './store';
console.log('plugins:', plugins);
// Vue.use(PiniaVuePlugin);
Vue.config.productionTip = false;

// const pinia = createPinia();
export default {
  run(options) {
    options;
    console.log('run:', options);
    return new Vue({
      router,
      // pinia,
      // store,
      // vuetify,
      ...plugins,
      render: (h) => h(App)
    }).$mount('#app');
  }
};
