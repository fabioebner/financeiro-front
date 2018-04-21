import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  count: 5,
  bootstrap: {},
};

const getters = {

};

const mutations = {
  setBootstrap(bootstrap, payload) {
    state.bootstrap = payload;
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
