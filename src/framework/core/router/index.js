import { setupLayouts } from 'virtual:generated-layouts';
import Vue from 'vue';
import VueRouter from 'vue-router';
import generatedRoutes from '~pages';

Vue.use(VueRouter);
// const routes = [
//   {
//     path: '/',
//     redirect: '/home',
//     name: 'home',
//     component: HomeLayout,
//     children: [
//       {
//         path: '/home',
//         name: 'home',
//         component: HomeView
//       }
//     ]
//   },
//   {
//     path: '/',
//     redirect: '/testAggrid',
//     name: 'home',
//     component: HomeLayout,
//     children: [
//       {
//         // 当 /testAggrid 匹配成功，
//         // TestAggrid 会被渲染在 HomeLayout 的 <router-view> 中
//         path: 'testAggrid',
//         name: 'testAggrid',
//         component: () => import(/* webpackChunkName: "about" */ '../../../components/TestAggrid.vue'),
//         meta: {
//           title: 'testAggrid'
//         }
//       }
//     ]
//   },
//   {
//     path: '/',
//     redirect: '/404',
//     name: 'notfound',
//     component: HomeLayout,
//     children: [
//       {
//         path: '*',
//         name: 'notfound',
//         component: notfound
//       }
//     ]
//   },
//   {
//     path: '/testAggrid',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../../../components/TestAggrid.vue')
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../../../views/AboutView.vue')
//   },
//   {
//     path: '*',
//     name: 'notfound',
//     component: notfound
//   }
// ];

const root = {
  path: '/',
  redirect: '/home',
  name: 'all',
  component: home,
  children: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    }
  ]
};
/// 标题前缀
const titlePrefix = 'W2-';

// const root = { name: '/', path: '/', redirect: '/home', prop: true };
// generatedRoutes.push(root);
export const routes = setupLayouts(generatedRoutes);
console.log('routes:', routes);
console.log('generatedRoutes:', generatedRoutes);

routes.map((route) => {
  console.log('route:', route);
});

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes
});

/**
 * 全局前置守卫
 * @param  to     即将要进入的目标 路由对象
 * @param  from   当前导航正要离开的路由
 * @param  next   一定要调用该方法来 resolve 这个钩子
 */
router.beforeEach((to, from, next) => {
  console.log('to1', to);
  console.log('from', from);
  const routeExists = router.getRoutes().some((route) => route.path === to.path);
  if (!routeExists && to.name === undefined) {
    next(Error('错误'));
  } else {
    next();
  }
});
/**
 * 全局解析守卫
 */
router.beforeResolve((to, from, next) => {
  console.log('to2', to);
  // console.log('from', from);
  // if(to.path === '/') {
  //   rediect
  // }else{
  next();
  // }
});
/**
 * 全局后置钩子
 * @param  to     即将要进入的目标 路由对象
 * @param  from   当前导航正要离开的路由
 */
router.afterEach((to, from) => {
  // ...
  console.log('to3', to);
  if (to?.name === 'all') {
    document.title = titlePrefix + '404';
  } else if (to.meta.title) {
    console.log('to:', to);
    if (typeof to.meta.title === 'string') {
      document.title = titlePrefix + to.meta.title;
    }
  }
});

export default router;
