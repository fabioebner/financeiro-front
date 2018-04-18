import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Principal from '@/components/Principal';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Principal',
      component: Principal,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ],
});
