<template>
  <div class="data-panel">
    <Filter ref="filter" />
    <!-- <div>
      <p>Data goes here</p>
    </div> -->
  </div>
</template>

<script>
import store from "@/store";
import Filter from "@/components/live/FilterLiveComponent.vue";

export default {
  store: store,
  components: {
    Filter,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
.data-panel {
  border: 5px solid #ccc; /* Ajout d'une bordure de 1px solide avec une couleur grise */
  border-radius: 10px; /* Ajout d'un arrondi aux coins */
  padding: 10px; /* Ajout d'un espacement intérieur de 10px */
}
</style>
