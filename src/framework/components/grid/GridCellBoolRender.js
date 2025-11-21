import _ from 'lodash';

export default {
  computed: {
    icon() {
      return _.isNil(this.params.value) ? 'mdi-blank' : this.params.vaule === true ? 'mdi-checkbox-outline' : 'mdi-checkbox-blank-outline';
    }
  },
  render() {
    var vm = this;

    if (_.isNil(vm.params.value)) {
      return <div></div>;
    }

    var icon = vm.params.value === true ? 'mdi-checkbox-marked' : vm.params.value === false ? 'mdi-checkbox-blank-outline' : 'mdi-blank';

    var color = vm.params.value === true ? 'red darken-2' : vm.params.value === false ? '' : '';

    return (
      <div class="fill-height d-flex align-center">
        <v-icon color={color}>{icon}</v-icon>
      </div>
    );
  }
};
