import { createStore } from "vuex";

export default createStore({
  state() {
    let sensors = localStorage.getItem("sensors");
    try {
      sensors = JSON.parse(sensors);
    } catch (e) {
      sensors = null;
    }
    return {
      count: 0,
      sensors: sensors
        ? sensors
        : { piensg027: "piensg027:80", piensg028: "piensg028:80" },
    };
  },
  getters: {},
  mutations: {
    increment: (state) => state.count++,
    decrement: (state) => state.count--,
    add_sensor: (state, { name, uri }) => {
      state.sensors[name] = uri;
      localStorage.setItem("sensors", JSON.stringify(state.sensors));
    },
  },
  actions: {},
  modules: {},
});
