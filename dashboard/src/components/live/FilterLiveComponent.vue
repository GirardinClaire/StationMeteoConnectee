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

    <!-- Tableau pour afficher les données récupérées -->

    <table v-if="this.sensorData.length > 0">
      <tbody>
        <tr v-for="(data, index) in this.sensorData" :key="index">
          <td>Capteur</td>
          <td>{{ data.name }}</td>
        </tr>
        <tr v-for="(data, index) in this.sensorData" :key="index">
          <td>Pluie</td>
          <td>{{ data.measurements.rain }}</td>
        </tr>
        <tr v-for="(data, index) in this.sensorData" :key="index">
          <td>Pression</td>
          <td>{{ data.measurements.pressure }}</td>
        </tr>
        <tr v-for="(data, index) in this.sensorData" :key="index">
          <td>Température</td>
          <td>{{ data.measurements.temperature }}</td>
        </tr>
        <tr v-for="(data, index) in this.sensorData" :key="index">
          <td v-if="ptdrFilter_value == ''">Vitesse vent</td>
          <td v-if="ptdrFilter_value == ''">
            {{ data.measurements.wind.speed }}
          </td>
        </tr>
        <tr v-for="(data, index) in this.sensorData" :key="index">
          <td v-if="ptdrFilter_value == ''">Direction vent</td>
          <td v-if="ptdrFilter_value == ''">
            {{ data.measurements.wind.direction }}
          </td>
        </tr>
        <tr v-for="(data, index) in this.sensorData" :key="index">
          <td v-if="ptdrFilter_value == ''">Luminosité</td>
          <td v-if="ptdrFilter_value == ''">{{ data.measurements.light }}</td>
        </tr>
        <tr v-for="(data, index) in this.sensorData" :key="index">
          <td v-if="ptdrFilter_value == ''">Hygrométrie</td>
          <td v-if="ptdrFilter_value == ''">
            {{ data.measurements.humidity }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
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
      sensorData: [],
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
          this.sensorData = results;
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
