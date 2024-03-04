<template>
  <div class="DataFilter">
    <h2>Données</h2>
    <div class="tableContent">
      <table>
        <tr>
          <td><input type="checkbox" name="" id="rain" v-model="rain" /></td>
          <td><label for="rain">Pluie</label></td>
        </tr>
        <tr>
          <td><input type="checkbox" name="" id="prsr" v-model="prsr" /></td>
          <td><label for="prsr">Pression</label></td>
        </tr>
        <tr>
          <td><input type="checkbox" name="" id="tprt" v-model="tprt" /></td>
          <td><label for="tprt">Température</label></td>
        </tr>
        <tr>
          <td><input type="checkbox" name="" id="wind" v-model="wind" /></td>
          <td><label for="wind">Vent</label></td>
        </tr>
        <tr>
          <td><input type="checkbox" name="" id="lght" v-model="lght" /></td>
          <td><label for="lght">Luminosité</label></td>
        </tr>
        <tr>
          <td><input type="checkbox" name="" id="hmdt" v-model="hmdt" /></td>
          <td><label for="hmdt">Hygrométrie</label></td>
        </tr>
      </table>
    </div>
    <span style="display: none">{{ value }}</span>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data: function () {
    return {
      rain: true,
      prsr: true,
      tprt: true,
      wind: false,
      hmdt: false,
      lght: false,
    };
  },
  computed: {
    value() {
      //prsr, tprt, rain, wind, hmdt, lght;
      const filter = ["prsr", "tprt", "rain", "wind", "hmdt", "lght"].filter(
        (key) => this[key]
      );
      const newValue = filter.length ? { filter: filter } : {};
      this.$emit("input", newValue);
      return newValue;
    },
  },
  methods: {},
};
</script>

<style scoped>
div.DataFilter {
  overflow-y: scroll;
}

div.DataFilter div.tableContent {
  background-color: rgba(127, 127, 127, 0.1);
  margin: 0 5%;
}

div.DataFilter table {
  margin: auto;
}
</style>
