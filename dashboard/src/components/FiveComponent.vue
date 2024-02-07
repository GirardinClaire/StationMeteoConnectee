<template>
  <div>{{ isFive }}</div>
</template>

<script>
// @ is an alias to /src
import store from "@/store";

export default {
  store: store,
  computed: {
    isFive() {
      return store.state.count % 5 === 0
        ? "Multiple de 5 !!!"
        : "PAS Multiple de 5";
    },
  },
};
</script>
