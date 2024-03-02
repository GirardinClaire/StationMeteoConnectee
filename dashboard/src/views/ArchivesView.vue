<template>
  <div class="archives">
    <h1>Visualisation des données d'archives</h1>
    <div class="archive_content">
      <SensorSelect multiple ref="sensorSel1" v-on:eventTest="eventTest" />
      <SensorSelect ref="sensorSel2" />
      <button @click="action(1)">log value</button>
      <button @click="action(2)">log value</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import SensorSelect from "@/components/SensorSelect.vue";

export default {
  name: "ArchivesView",
  components: {
    SensorSelect,
  },
  methods: {
    eventTest(data) {
      console.log(data);
    },
    action(v) {
      if (v == 1) {
        console.log(this.$refs.sensorSel1.value);
      } else {
        console.log(this.$refs.sensorSel2.value);
      }
    },
  },
};
</script>

<style scoped>
.archive_content {
  background-color: rgba(127, 127, 127, 0.1);
  position: relative;
  height: calc(100vh - 8.2em);
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 1fr;
  /*padding: 0.1em;*/
  box-sizing: border-box;
}

.archive_content > :nth-child(2) {
  background-color: green;
}
</style>
