<template>
  <div class="leaflet-map">
    <l-map ref="map" v-model:zoom="zoom" :center="mapCenter">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />
      <span>{{ sensorsData }}</span>
      <l-marker v-for="pos in markerPosition" :key="pos" :lat-lng="pos" />
    </l-map>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
// import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import store from "@/store/index.js";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      zoom: 2,
      sensorsData: [],
      mapCenter: [47.41322, -1.219482], // Centre de la carte par défaut
      markerPosition: [],
    };
  },
  mounted() {
    this.requestSensorsLocation();
  },

  computed: {
    request_query() {
      const listSensors = Object.keys(store.state.sensors).map((k) => ({
        name: k,
        uri: store.state.sensors[k],
      }));

      return listSensors.map((sensor) => {
        return `http://${sensor.uri}/live`;
      });
    },

    sensorsDatas() {
      return this.sensorsData;
    },
  },

  methods: {
    requestSensorsLocation() {
      this.markerPosition = [];
      this.request_query.forEach((url) => {
        fetch(url)
          .then((r) => r.json())
          .then((result) => {
            this.markerPosition.push(result.location.coords);
          })
          .catch((err) => {
            console.error(`Fail to load position from ${url} : ${err}`);
          });
      });
    },
  },
};
</script>

<style scoped>
.leaflet-map {
  height: calc(100vh - 11em);
  /* ajustement la hauteur */
  position: relative;
}

.leaflet-map div {
  height: 100%;
}
</style>
