import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  count: 5,
  bootstrap: {},
  logado: false,
};

const getters = {
  isLogado() {
    return state.logado;
  },
};

const mutations = {
  setBootstrap(bootstrap, payload) {
    state.bootstrap = payload;
  },
  setLogin(logado, icLogado) {
    state.logado = icLogado;
  },
};

const actions = {
  setBootstrap: ({ commit }) => {
    commit('setBootstrap');
  },
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
});
