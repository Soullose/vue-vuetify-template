import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../../../views/HomeView.vue';
import HomeLayout from '../layout/home';

import notfound from '@/framework/views/404/notfound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/testAggrid',
    name: 'home',
    component: HomeLayout,
    children: [
      {
        path: '/testAggrid',
        name: 'testAggrid',
        component: () => import(/* webpackChunkName: "about" */ '../../../components/TestAggrid.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: '/home',
    name: 'home',
    component: HomeLayout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: HomeView
      }
    ]
  },
  {
    path: '/',
    redirect: '/404',
    name: 'notfound',
    component: HomeLayout,
    children: [
      {
        path: '*',
        name: 'notfound',
        component: notfound
      }
    ]
  },
  {
    path: '/testAggrid',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../../../components/TestAggrid.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../../../views/AboutView.vue')
  },
  {
    path: '*',
    name: 'notfound',
    component: notfound
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // console.log('to', to);
  // console.log('from', from);
  const routeExists = router.getRoutes().some((route) => route.path === to.path);
  if (!routeExists && to.name === undefined) {
    next(Error('错误'));
  }
  next();
});

export default router;
