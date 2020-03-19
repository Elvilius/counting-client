import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    price: null
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
        await fetch('http://localhost:4000/', {
          method: 'POST',
          headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
          body: JSON.stringify(state.products)
        })
    }
  },
  
  getters: {
    products: state => {
      return state.products;
    }
  }
});