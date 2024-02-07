<template>
  <div class="data-panel">
    <div id="addSensor">
      <form action="">
        <textarea>Ajouter un capteur</textarea>
        <button>Ok</button>
      </form>
    </div>

    <div id="SelectSensor">
      <select v-model="selectedSensor">
        <option disabled value="">Sélectionnez un capteur</option>
        <option
          v-for="(sensor, index) in sensorList"
          :key="index"
          :value="sensor"
        >
          {{ sensor }}
        </option>
      </select>
    </div>

    <div id="ShowAllData">
      <input type="checkbox" id="showAllDataCheckbox" v-model="showAllData" />
      <label for="showAllDataCheckbox">Afficher toutes les données</label>
    </div>

    <div>
      <p>Data goes here</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from "@/store";

export default {
  store: store,
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
  flex: 1; /* Occupation de tout l'espace disponible à droite */
  border: 5px solid #ccc; /* Ajout d'une bordure de 1px solide avec une couleur grise */
  border-radius: 10px; /* Ajout d'un arrondi aux coins */
  padding: 10px; /* Ajout d'un espacement intérieur de 10px */
  height: 80vh; /* Définit une hauteur fixe */
}
</style>
