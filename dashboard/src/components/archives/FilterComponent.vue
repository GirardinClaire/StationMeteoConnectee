<template>
  <div class="Filter">
    <h1>Filtre</h1>
    <Datetime
      ref="datetime"
      v-on:input="(value) => (this.datetime_value = value)"
    />
    <SensorSelect
      multiple
      ref="sensors"
      v-on:input="
        (value) => {
          this.sensors_value =
            value instanceof Array ? value : this.$refs.sensors.value;
        }
      "
    />
    <DataFilter
      ref="filter"
      v-on:input="(value) => (this.dataFilter_value = value)"
    />
    <button @click="submit">Valider</button>
    <span style="display: none">queries preview: {{ request_query }}</span>
  </div>
</template>

<script>
// @ is an alias to /src

import SensorSelect from "@/components/SensorSelect.vue";
import DataFilter from "@/components/archives/DataFilterComponent.vue";
import Datetime from "@/components/archives/DatetimeComponent.vue";
import store from "@/store/index.js";

export default {
  store: store,
  components: {
    SensorSelect,
    DataFilter,
    Datetime,
  },
  data: function () {
    return {
      datetime_value: "",
      dataFilter_value: "",
      sensors_value: [],
    };
  },
  computed: {
    request_query() {
      const queryArgs = new URLSearchParams({
        ...this.datetime_value,
        ...this.dataFilter_value,
      }).toString();

      return this.sensors_value.map((sensor_name) => {
        return `http://${store.state.sensors[sensor_name]}/archive?${queryArgs}`;
      });
    },
  },
  methods: {
    submit() {
      this.$emit("submit", this.request_query);
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
