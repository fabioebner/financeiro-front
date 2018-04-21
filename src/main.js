import 'vuetify/dist/vuetify.min.css';

import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App';
import router from './router';
import store from './store/store';

axios.cors = true;

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VueAxios, axios);
Vue.use(Vuex);

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
