<template>
  <div class="data-panel">
    <!-- Insérez votre panneau de données ici -->
    <div>
      <!-- Exemple de données -->
      <p>Data goes here</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from "@/store";

export default {
  store: store,
  computed: {},
  methods: {},
};
</script>

<style scoped>
.data-panel {
  flex: 1; /* Faites en sorte que le panneau de données occupe tout l'espace disponible à droite */
  /* Ajoutez des styles supplémentaires pour le panneau de données */
}
</style>
