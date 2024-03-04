<template>
  <div class="Filter">
    <h1>Filtre</h1>
    <SensorSelect
      ref="sensors"
      v-on:input="
        (value) => {
          this.sensors_value =
            value instanceof Array ? value : this.$refs.sensors.value;
        }
      "
    />
    <ptdrFilter
      ref="filter"
      v-on:input="(value) => (this.ptdrFilter_value = value)"
    />
    <button @click="submit">Valider</button>
    <span style="display: none">queries preview: {{ request_query }}</span>
  </div>
</template>

<script>
// @ is an alias to /src

import SensorSelect from "@/components/SensorSelect.vue";
import ptdrFilter from "@/components/live/ptdrComponent.vue";
import store from "@/store/index.js";

export default {
  store: store,
  components: {
    SensorSelect,
    ptdrFilter,
  },
  data: function () {
    return {
      ptdrFilter_value: "",
      sensors_value: [],
    };
  },
  computed: {
    request_query() {
      return this.sensors_value.map((sensor_name) => {
        console.log(
          `http://${store.state.sensors[sensor_name]}/live?` +
            this.ptdrFilter_value
        );
        return (
          `http://${store.state.sensors[sensor_name]}/live?` +
          this.ptdrFilter_value
        );
      });
    },
  },

  methods: {
    submit() {
      Promise.all(
        this.request_query.map((url) => fetch(url).then((r) => r.json()))
      )
        .then((results) => {
          // Stocker les données des capteurs dans sensorData
          this.sensorData = results;
          // Vous pouvez également effectuer d'autres opérations avec les données ici
          console.log(this.sensorData);
        })
        .catch((error) => {
          console.error(
            "Une erreur s'est produite lors de la récupération des données:",
            error
          );
        });
    },
  },
};
</script>

<style scoped>
div.Filter {
  background-color: rgba(127, 127, 127, 0.1);
  overflow-y: scroll;
}
</style>
