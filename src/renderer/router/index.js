import Vue from 'vue'
import Router from 'vue-router'

import store from './../store';

import Login from '@/renderer/components/Views/Login';
import Dashboard from '@/renderer/components/Views/Dashboard';
import { isNullOrUndefined } from 'util';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (isNullOrUndefined(store.getters.seed)) {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router