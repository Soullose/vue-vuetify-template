///
export default {
  namespaced: true,
  state: {
    menus: []
  },
  /// 修改state中的数据
  mutations: {
    INIT_ROUTERS(state, routers) {
      state.menus = routers;
    },
    ADD_ROUTERS(state, routers) {
      state.menus = [...state.menus, ...routers];
    }
  },
  /// 异步操作提交给mutations,actions事件无法直接修改state中的数据,需要提交给mutations
  actions: {
    initRouters({ commit }, routers) {
      commit('INIT_ROUTERS', routers);
    },
    addRouters({ commit }, routers) {
      commit('ADD_ROUTERS', routers);
    }
  },
  /// 获取state中的数据
  getter: {
    getMenus(state) {
      return state.menus;
    }
  }
};
