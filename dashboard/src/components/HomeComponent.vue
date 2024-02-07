<!-- <template></template>

<script>
// @ is an alias to /src
import store from "@/store";

export default {
  store: store,
  computed: {},
  methods: {},
};
</script>

<style scoped></style> -->

<template>
  <div class="Home">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
  },
};
</script>
