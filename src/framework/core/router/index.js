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
        // 当 /testAggrid 匹配成功，
        // TestAggrid 会被渲染在 HomeLayout 的 <router-view> 中
        path: 'testAggrid',
        name: 'testAggrid',
        component: () => import(/* webpackChunkName: "about" */ '../../../components/TestAggrid.vue'),
        meta: {
          title: 'testAggrid'
        }
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

/**
 * 全局解析守卫
 */
router.beforeResolve((to, from, next) => {
  // console.log('to', to);
  // console.log('from', from);
  next();
});

/**
 * 全局前置守卫
 * @param  to     即将要进入的目标 路由对象
 * @param  from   当前导航正要离开的路由
 * @param  next   一定要调用该方法来 resolve 这个钩子
 */
router.beforeEach((to, from, next) => {
  // console.log('to', to);
  // console.log('from', from);
  const routeExists = router.getRoutes().some((route) => route.path === to.path);
  if (!routeExists && to.name === undefined) {
    next(Error('错误'));
  } else {
    next();
  }
});

/**
 * 全局后置钩子
 * @param  to     即将要进入的目标 路由对象
 * @param  from   当前导航正要离开的路由

 */
router.afterEach((to, from) => {
  // ...
});

export default router;
