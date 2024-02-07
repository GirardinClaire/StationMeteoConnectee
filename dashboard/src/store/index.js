import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      count: 0,
      zoom: 2,
    };
  },
  getters: {},
  mutations: {
    increment: (state) => state.count++,
    decrement: (state) => state.count--,
  },
  actions: {},
  modules: {},
});
