import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        cart: [],
        search: ''
    },
    plugins: [createPersistedState()],
    mutations: {
        add(state, product) {
            state.cart.push(product);
        },
        searchSet(state, search) {
            state.search = search;
        }
    },
});