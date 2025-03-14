import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../../../views/HomeView.vue';
import HomeLayout from '../layout/home';

Vue.use(VueRouter);

const routes = [
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
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
