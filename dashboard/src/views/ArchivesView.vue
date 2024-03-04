<template>
  <div class="archives">
    <h1>Visualisation des données d'archives</h1>
    <div class="archive_content">
      <Graph ref="graph" />
      <Filter ref="filter" v-on:submit="onSubmitFilter" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import Filter from "@/components/archives/FilterComponent.vue";
import Graph from "@/components/archives/GraphComponent.vue";

export default {
  name: "ArchivesView",
  components: {
    Filter,
    Graph,
  },
  methods: {
    onSubmitFilter(URIs) {
      this.$refs.graph.clear();
      URIs.forEach((uri) => {
        fetch(uri, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((r) => {
            return r.json();
          })
          .then((r) => {
            r.uri = uri;
            this.$refs.graph.addData(r);
          })
          .catch((err) => {
            console.error(err);
          });
      });
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

/*
.archive_content > :nth-child(2) {
  background-color: green;
}
*/
</style>
