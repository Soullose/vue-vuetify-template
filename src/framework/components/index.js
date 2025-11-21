import _ from 'lodash';
import Vue from 'vue';
import { XGrid } from './grid';
const components = { XGrid };

var installed = false;
function install(Vue) {
  if (!installed) {
    _.each(components, (component, name) => {
      Vue.component(name, component);
    });

    installed = true;
  }
}

install(Vue);

export default {
  ...components
};
