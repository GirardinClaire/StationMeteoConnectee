<template>
  <div class="data-panel">
    <div id="addGraph">
      <form action="">
        <textarea></textarea>
        <button>Ok</button>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import store from "@/store";

export default {
  store: store,
  data() {},
  computed: {},
  methods: {},
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
