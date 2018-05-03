import 'vuetify/dist/vuetify.min.css';

import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import axios from 'axios';
import moment from 'moment';
import VueAxios from 'vue-axios';
import App from './App';
import router from './router';
import store from './store/store';


axios.cors = true;

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.prototype.moment = moment;

// Configuracao do BigNumber
// https://github.com/MikeMcl/bignumber.js
BigNumber.config({
  DECIMAL_PLACES: 13,
  ROUNDING_MODE: 2,
  FORMAT: {
    groupSize: 3,
    groupSeparator: ' ',
    decimalSeparator: ',',
  },
});

router.beforeEach((to, from, next) => {
  if (to.name === 'Login') {
    next();
  } else if (window.logado === undefined) {
    next({ name: 'Login' });
  } else if (window.logado) {
    next();
  } else {
    next({ name: 'Login' });
  }
});

// Vue.axios.get(api).then((response) => {
//   console.log(response.data)
// })

// this.axios.get(api).then((response) => {
//   console.log(response.data)
// })

// this.$http.get(api).then((response) => {
//   console.log(response.data)
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  auth: undefined,
  bootstrap: {},
  router,
  render: h => h(App),
});
