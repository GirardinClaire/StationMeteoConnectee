<template>
  <div class="compteur">
    <h1>Page Compteur</h1>
  </div>
  <div id="compteur">
    <Count />
    <Five />
  </div>
</template>

<script>
// @ is an alias to /src
import Count from "@/components/CountComponent.vue";
import Five from "@/components/FiveComponent.vue";

export default {
  name: "CompteurView",
  components: {
    Count,
    Five,
  },
};
</script>
