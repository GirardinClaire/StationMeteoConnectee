<template>
  <div class="leaflet-map">
    <l-map ref="map" v-model:zoom="zoom" :center="mapCenter">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />
      <span>{{ sensorsData }}</span>
      <l-marker
        v-for="(sensor, index) in sensorsDatas"
        :key="index"
        :lat-lng="[
          (() => {
            console.log('a', sensor);
            return sensor.location.coords[0];
          })(),
          sensor.location.coords[1],
        ]"
      ></l-marker>
      <l-marker :lat-lng="[52.519967, 13.405117]"></l-marker>
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
    };
  },
  async mounted() {
    await this.requestSensorsLocation();
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
    async requestSensorsLocation() {
      try {
        Promise.all(
          this.request_query.map((url) => fetch(url).then((r) => r.json()))
        )
          .then((result) => {
            this.sensorsData.push(result);
          })
          .catch((error) => {
            console.error(
              "Une erreur s'est produite lors de la récupération des données:",
              error
            );
          });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données de tous les capteurs:",
          error
        );
      }
      // console.log(this.sensorsData);
    },
  },
};
</script>

<style scoped>
.leaflet-map {
  height: calc(100vh - 11em); /* ajustement la hauteur */
  position: relative;
}

.leaflet-map div {
  height: 100%;
}
</style>
