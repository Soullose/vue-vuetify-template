export default {
  render() {
    var vm = this;
    return <div class="d-flex fill-height">{vm.params.slot(vm.params)}</div>;
  }
};
