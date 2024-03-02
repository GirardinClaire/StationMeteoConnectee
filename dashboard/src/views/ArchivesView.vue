<template>
  <div class="archives">
    <h1>Visualisation des données d'archives</h1>
    <div class="archive_content">
      <SensorSelect />
      <SensorSelect />
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
