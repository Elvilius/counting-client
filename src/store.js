import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

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
    }
  },
  getters: {
    products: state => {
      return state.products;
    }
  }
});
