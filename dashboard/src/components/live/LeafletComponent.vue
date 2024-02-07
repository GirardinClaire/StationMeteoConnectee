<template>
  <div class="leaflet-map">
    <div style="height: 600px; width: 700px">
      <l-map ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          layer-type="base"
          name="OpenStreetMap"
        ></l-tile-layer>
      </l-map>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from "@/store";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";

export default {
  store: store,
  components: {
    LMap,
    LTileLayer,
  },
  computed: {
    zoom() {
      return store.state.zoom;
    },
  },
};
</script>

<style scoped>
.leaflet-map {
  flex: 1; /* Faites en sorte que la carte Leaflet occupe tout l'espace disponible à gauche */
  height: 400px; /* Ajustez la hauteur selon vos besoins */
}
</style>
