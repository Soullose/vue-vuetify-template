<script>
import _ from 'lodash';

const KEY_TAB = 9;
const KEY_ENTER = 13;

// eslint-disable-next-line no-unused-vars
function bindAllFocusableElements(el) {
  var focusableElements = _.filter(el.querySelectorAll('*'), (el) => {
    el.focus();
    return document.activeElement === el;
  });

  focusableElements.length === 0 || _.first(focusableElements).focus();

  this.$focusableElements = focusableElements;

  _.each(focusableElements, (el) => {
    el.addEventListener('keydown', this.handleKeydown);
  });

  return focusableElements;
}

export default {
  props: {
    elId: {
      type: String,
      default: () => _.uniqueId('grid-cell-pop-editor-menu-')
    }
  },

  data: () => ({
    menuVisible: false
  }),

  computed: {
    userParams() {
      return _.omit(this.params, ['slot']);
    },

    renderValue() {
      return '用于回显的暂态值';
    }
  },

  render() {
    var vm = this;

    var scopedSlots = vm._u([
      {
        key: 'activator',
        fn: function ({ on }) {
          return (
            <div class="d-flex align-center px-4">
              <div class="grow">卢 - 超</div>
              <v-btn class="xbutton" id={vm.elId + '_activator'} icon small tabindex="0" color="primary" on={on}>
                <v-icon small>{vm.menuVisible ? 'mdi-chevron-double-up' : 'mdi-chevron-double-down'}</v-icon>
              </v-btn>
            </div>
          );
        },
        proxy: false
      }
    ]);

    return (
      <div>
        <v-menu
          offset-y={true}
          eager={true}
          value={vm.menuVisible}
          close-on-content-click={false}
          scopedSlots={scopedSlots}
          on={{
            input: vm.menuVisibleChanged
          }}
        >
          <v-card id={vm.elId + '_content'}>
            <v-card-text>{vm.params.slot(vm.params)}</v-card-text>
          </v-card>
        </v-menu>
      </div>
    );
  },

  created() {},

  mounted() {
    this.$nextTick(() => {
      this.$el.querySelector('#' + this.elId + '_activator').focus();
    });
  },

  methods: {
    isPopup() {
      return false;
    },

    getValue() {
      return {};
    },

    menuVisibleChanged(value) {
      this.menuVisible = value;
      if (value === true) {
        _.delay(() => {
          if (_.isNil(this.$focusableElements)) {
            bindAllFocusableElements.call(this, document.querySelector('#' + this.elId + '_content'));
          }
          this.$focusableElements.length === 0 || this.$focusableElements[0].focus();
        }, 200);
      } else {
        this.$el.querySelector('#' + this.elId + '_activator').focus();
      }
    },

    handleKeydown(e) {
      const index = this.$focusableElements.indexOf(e.target);

      // 光标移动
      if (e.keyCode === KEY_TAB) {
        if (e.shiftKey === true) {
          // backward
          if (index === 0) {
            _.defer(() => {
              var activatorEl = this.$el.querySelector('#' + this.elId + '_activator');
              activatorEl.focus();
              activatorEl.click();
            });
            event.preventDefault();
          }
        } else {
          // forward
          if (index === this.$focusableElements.length - 1) {
            _.defer(() => {
              var activatorEl = this.$el.querySelector('#' + this.elId + '_activator');
              activatorEl.focus();
              activatorEl.click();
            });
            event.preventDefault();
          }
        }
      }

      if (e.keyCode === KEY_ENTER) {
        // if (index === 0) {
        // } else {
        // }
        var activatorEl = this.$el.querySelector('#' + this.elId + '_activator');
        activatorEl.focus();
        activatorEl.click();
        event.preventDefault();
      }

      e.stopPropagation();
    }
  }
};
</script>

<style scoped>
.xbutton {
  outline: none;
}
</style>
