export default {
  render() {
    var vm = this;

    return <div class="text-center">{vm.params.node.rowIndex + 1}</div>;
  }
};
