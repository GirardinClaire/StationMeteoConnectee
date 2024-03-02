<template>
  <div class="SensorSelector">
    <h1>Capteur(s)</h1>
    <div class="list-items-sensor">
      <table>
        <tr v-for="sensor in listSensors" :key="sensor.name">
          <td><input type="checkbox" :id="sensor.name" /></td>
          <td>
            <label :for="sensor.name" :title="sensor.uri">
              {{ sensor.name }}
            </label>
          </td>
        </tr>
      </table>
    </div>
    <button :onclick="this.add_sensor">Ajouter un capteur</button>
  </div>
</template>

<script>
import store from "@/store/index.js";

export default {
  store: store,
  data: function () {
    return {};
  },
  computed: {
    listSensors() {
      const sensors = store.state.sensors;
      return Object.keys(sensors).map((k) => ({
        name: k,
        uri: sensors[k],
      }));
    },
  },
  methods: {
    add_sensor() {
      const name = prompt("Sensor name\nEx: pi28");
      if (!name) {
        return;
      }
      const uri = prompt("Sensor uri\nEx: piensg028:80");
      if (!uri) {
        return;
      }
      store.commit("add_sensor", { name, uri });
    },
  },
};
</script>

<style scoped>
div.SensorSelector .list-items-sensor {
  background-color: rgba(127, 127, 127, 0.1);
  margin: 0 5%;
}

div.SensorSelector .list-items-sensor table {
  margin: auto;
}
</style>
