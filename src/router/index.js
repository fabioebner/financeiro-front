import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Principal from '@/components/Principal';
import FrenteCaixa from '@/components/FrenteCaixa';
import NovoPedido from '@/components/NovoPedido';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/principal',
      name: 'Principal',
      component: Principal,
      children: [
        {
          path: 'frentecaixa',
          name: 'FrenteCaixa',
          component: FrenteCaixa,
        },
        {
          path: 'novoPedido',
          name: 'NovoPedido',
          component: NovoPedido,
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      redirect: { name: 'Login' },
    },
  ],
});
