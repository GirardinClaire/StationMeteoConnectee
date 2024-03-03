<template>
  <div class="data-panel">
    <Filter ref="filter" />
    <div>
      <p>Data goes here</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from "@/store";
import Filter from "@/components/live/FilterComponentLive.vue";

export default {
  store: store,
  components: {
    Filter,
  },
  data() {
    return {
      addedSensor: "", // Variable pour stocker le capteur à ajouter
      selectedSensor: "", // Variable pour stocker le capteur sélectionné
      sensorList: ["piensg028", "piensg029"], // Liste des noms des capteurs
      showAllData: false, // Variable pour stocker l'état de la case à cocher
    };
  },
  computed: {},
  methods: {},
  // watch:
};
</script>

<style scoped>
.data-panel {
  border: 5px solid #ccc; /* Ajout d'une bordure de 1px solide avec une couleur grise */
  border-radius: 10px; /* Ajout d'un arrondi aux coins */
  padding: 10px; /* Ajout d'un espacement intérieur de 10px */
}
</style>
