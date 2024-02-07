<template>
  <div class="archives">
    <h1>Visualisation des données d'archives</h1>
    <div class="map">
      <Graph />
      <From />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Graph from "@/components/archives/GraphComponent.vue";
import From from "@/components/archives/FormComponent.vue";

export default {
  name: "LiveView",
  components: {
    Graph,
    From,
  },
};
</script>

<style scoped>
.archives {
  /* Styles pour le conteneur principal */
}

.map {
  display: flex;
}
</style>
