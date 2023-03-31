import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';
import mockGetPayments from '@/mocks/getPayments';

Vue.use(Vuex);

export default new Vuex.Store({

  state: () => ({
    data: [],
    isLoading: false,
    isCached: !!localStorage.getItem('cache'),
  }),

  mutations: {
    setState(state, value) {
      Object.entries(value).forEach(([key, data]) => {
        if (!Array.isArray(state[key]) && state[key] && typeof state[key] === 'object') {
          state[key] = {
            ...state[key],
            ...data,
          };
        } else {
          state[key] = data;
        }
      });
    },
    createCache(state) {
      localStorage.setItem('cache', JSON.stringify(state.data));
    },
    useCache(state) {
      state.data = JSON.parse(localStorage.getItem('cache'));
    },
    clearCache() {
      localStorage.removeItem('cache');
    },
  },

  actions: {
    async load({ commit }, params = {}) {
      commit('setState', { isLoading: true });

      try {
        const { data } = process.env.NODE_ENV === 'development' ? await mockGetPayments() : await api.getPayments(params);

        if (Array.isArray(data)) {
          commit('setState', { data });
        }
      } catch (e) {
        console.dir('e', e);
        // eslint-disable-next-line no-alert
        alert(e?.message);
      } finally {
        commit('setState', { isLoading: false });
      }
    },
  },
});
