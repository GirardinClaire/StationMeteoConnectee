<template>
  <div class="compteur">
    <h1>Page Compteur</h1>
  </div>
  <div id="app">
    <p>{{ count }}</p>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">&minus;</button>
    </p>
    <div>{{ isFive }}</div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from "@/store";

export default {
  store: store,
  computed: {
    count() {
      return store.state.count;
    },
    isFive() {
      return store.state.count % 5 === 0
        ? "Multiple de 5 !!!"
        : "PAS Multiple de 5";
    },
  },
  methods: {
    increment() {
      store.commit("increment");
    },
    decrement() {
      store.commit("decrement");
    },
  },
};
</script>
