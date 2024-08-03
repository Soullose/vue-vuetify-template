import _ from 'lodash';
import Vue from 'vue';
import VueRouter from 'vue-router';

import Layout from '@/components/layout';

import store from '../store';

Vue.use(VueRouter);

const constantsRoutes = [
  {
    path: '/',
    name: 'layout',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        meta: { title: '主页' },
        component: () => import('../views/HomeView.vue')
      },
      {
        path: '/about',
        name: 'about',
        meta: { title: '关于' },
        component: () => import('../views/AboutView.vue')
      },
      {
        path: '/login',
        name: 'login',
        meta: { title: '登录' }
      }
    ]
  }
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];
function createMenus(routes, filter) {
  const menus = [];
  if (filter) {
    routes = routes.filter((i) => filter(i));
  }
  routes.forEach((route) => {
    if (route.path === '/' && route.children) {
      createMenus(route.children).forEach((item) => {
        menus.push(item);
      });
    } else {
      let children;
      if (route.children) {
        children = createMenus(route.children);
      }

      const meta = route;
      menus.push({
        text: _.get(meta, 'meta.title', 'wu'),
        icon: '',
        path: route.path,
        children
      });
    }
  });
  return menus;
}
store.dispatch('framework/initRouters', createMenus(constantsRoutes));
const router = new VueRouter({
  routes: [...constantsRoutes]
});

export default router;
