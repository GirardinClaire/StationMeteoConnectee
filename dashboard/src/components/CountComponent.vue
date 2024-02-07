<template>
  <p>{{ count }}</p>
  <p>
    <button @click="increment">+</button>
    <button @click="decrement">&minus;</button>
  </p>
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
