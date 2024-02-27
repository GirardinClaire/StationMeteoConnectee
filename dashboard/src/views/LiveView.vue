<template>
  <div class="live">
    <h1>Visualisation des données en LIVE</h1>
    <div class="map">
      <Leaflet />
      <PanelData />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Leaflet from "@/components/live/LeafletComponent.vue";
import PanelData from "@/components/live/PanelDataComponent.vue";

export default {
  name: "LiveView",
  components: {
    Leaflet,
    PanelData,
  },
};
</script>

<style scoped>
.live {
  /* Styles pour le conteneur principal */
}

.map {
  display: grid;
  grid-template-columns: 1fr 20em;
  grid-template-rows: 1fr;
}
</style>
