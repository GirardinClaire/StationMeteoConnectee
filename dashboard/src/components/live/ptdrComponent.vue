<template>
  <div class="DataFilter">
    <h2>Données</h2>
    <table>
      <div class="radio-group">
        <input
          type="radio"
          id="allData"
          value=""
          v-model="selectedFilter"
          checked
        />
        <label for="allData">Toutes les données</label>
      </div>
      <div class="radio-group">
        <input
          type="radio"
          id="ptdrData"
          value="ptdr"
          v-model="selectedFilter"
        />
        <label for="ptdrData">Pression - Température - Pluie</label>
      </div>
    </table>
    <span style="display: none">{{ value }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFilter: "",
    };
  },
  computed: {
    value() {
      this.$emit("input", this.selectedFilter);
      return this.selectedFilter;
    },
  },
};
</script>

<style scoped>
div.DataFilter {
  background-color: rgba(127, 127, 127, 0.1);
  overflow-y: scroll;
}

div.DataFilter table {
  margin: auto;
}
</style>
