<template>
  <div class="DataFilter">
    <h2>Données</h2>
    <!-- <table>
      <tr>
        <td><input type="checkbox" name="" id="ptdr" v-model="ptdr" /></td>
        <td><label for="ptdr">Pression - Température - Pluie</label></td>
      </tr>
      <tr>
        <td><input type="checkbox" name="" id="all" v-model="all" /></td>
        <td><label for="all">Toutes les données</label></td>
      </tr>
    </table> -->
    <table>
      <div class="radio-group">
        <input
          type="radio"
          id="dataTypeNull"
          name="dataType"
          value=""
          v-model="selectedDataType"
          checked
        />
        <label for="dataTypeNull">Toutes les données</label>
      </div>
      <div class="radio-group">
        <input
          type="radio"
          id="dataTypePTDR"
          name="dataType"
          value="ptdr"
          v-model="selectedDataType"
        />
        <label for="dataTypePTDR">Pression Température Pluie</label>
      </div>
    </table>
    <span style="display: none">{{ computedValue }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ptdr: false,
      all: false,
    };
  },
  computed: {
    computedValue() {
      const filter = ["", "ptdr"].filter((key) => this[key]);
      return filter.length ? { filter } : {};
    },
  },
  watch: {
    computedValue(newValue) {
      this.$emit("input", newValue);
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
