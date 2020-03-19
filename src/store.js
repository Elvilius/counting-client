import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import http from './http';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: []
  },
  plugins: [createPersistedState()],
  mutations: {
    addProduct(state, product) {
      state.products.push(product);
    },
    removeAllProducts(state) {
      state.products = [];
    },
    async requestData(state) {
      try {
        console.log(state.products);
        const {data} = await http.request({url: '/', method: 'POST'});
        return data;
      } catch (e) {
        console.log({
          e
        });
      }
    }
  },
  getters: {
    products: state => {
      return state.products;
    }
  }
});