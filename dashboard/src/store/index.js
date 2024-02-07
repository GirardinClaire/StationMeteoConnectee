import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      count: 0,
    };
  },
  getters: {},
  mutations: {
    increment: (state) => state.count++,
    decrement: (state) => state.count--,
    // addCpateur: (state) => state.add(),
  },
  actions: {},
  modules: {},
});
