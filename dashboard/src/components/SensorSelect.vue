<template>
  <div class="SensorSelector">
    <h2 v-if="multiple">Capteurs</h2>
    <h2 v-if="!multiple">Capteur</h2>
    <div class="list-items-sensor">
      <table>
        <tr v-if="!multiple">
          <td>
            <input
              type="radio"
              :id="id + 'SensorNull'"
              name="sensorName"
              value=""
              v-model="selected_key"
              checked
            />
          </td>
          <td>
            <label :for="id + 'SensorNull'"> Aucun capteur </label>
          </td>
        </tr>
        <tr v-for="sensor in listSensors" :key="sensor.name">
          <td>
            <input
              v-if="multiple"
              type="checkbox"
              :id="id + sensor.name"
              :value="sensor.name"
              v-model="selected_keys"
            />
            <input
              v-if="!multiple"
              type="radio"
              :id="id + sensor.name"
              name="sensorName"
              :value="sensor.name"
              v-model="selected_key"
            />
          </td>
          <td>
            <label :for="id + sensor.name" :title="sensor.uri">
              {{ sensor.name }}
            </label>
          </td>
        </tr>
      </table>
    </div>
    <button :onclick="this.add_sensor">Ajouter un capteur</button>
    <span style="display: none">{{ value }}</span>
  </div>
</template>

<script>
import store from "@/store/index.js";

let uuid = 0;

export default {
  beforeCreate() {
    this.uuid = (uuid++).toString();
  },
  store: store,
  data: function () {
    return {
      id: this.uuid,
      selected_keys: [], // mode multiple
      selected_key: null, // mode simple
    };
  },
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    listSensors() {
      const sensors = store.state.sensors;
      return Object.keys(sensors).map((k) => ({
        name: k,
        uri: sensors[k],
      }));
    },
    value() {
      const newValue = this.multiple
        ? [...this.selected_keys.entries()].map((e) => e[1])
        : this.selected_key
        ? [this.selected_key]
        : [];
      this.$emit("input", newValue);
      return newValue;
    },
  },
  methods: {
    add_sensor() {
      console.log(this);
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
