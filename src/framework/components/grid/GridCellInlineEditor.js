/* eslint-disable no-unused-vars */
import _ from 'lodash';

const KEY_TAB = 9;

function bindAllFocusableElements(el) {
  var focusableElements = _.filter(el.querySelectorAll('*'), (el) => {
    el.focus();
    return document.activeElement === el;
  });

  _.first(focusableElements).focus();

  this.$focusableElements = focusableElements;

  _.each(focusableElements, (el, index) => {
    el.addEventListener('keydown', this.handleKeydown);
  });

  console.log(focusableElements);

  return focusableElements;
}

export default {
  created() {},

  mounted() {
    // 获取所有对象
    this.$nextTick(() => bindAllFocusableElements.call(this, this.$el));
  },

  computed: {
    userParams() {
      return _.omit(this.params, ['slot']);
    }
  },

  render() {
    const vm = this;
    vm;
    return <div>{vm.params.slot(vm.userParams)}</div>;
  },

  methods: {
    handleKeydown(e) {
      const index = this.$focusableElements.indexOf(e.target);

      // 光标移动
      if (e.keyCode === KEY_TAB) {
        if (e.shiftKey === true) {
          // backward
          if (index === 0) {
            //
            // e.preventDefault();
            return;
          }
        } else {
          // forward
          if (index === this.$focusableElements.length - 1) {
            // e.preventDefault();
            return;
          }
        }
        e.stopPropagation();
      }

      // // cancel edit
      // if (e.key == ESC) {
      // }

      // // finish edit
    }
  }
};
