<template>
  <div class="Datetime">
    <h2>Durée</h2>
    <div class="tableContent">
      <table>
        <tr>
          <td><label for="from">Date début</label></td>
          <td><input type="date" id="from" v-model="from" /></td>
        </tr>
        <tr>
          <td><label for="to">Date fin</label></td>
          <td><input type="date" id="to" v-model="to" /></td>
        </tr>
        <tr>
          <td><label for="interval">Interval</label></td>
          <td><input type="text" id="interval" v-model="interval" /></td>
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
      from: "",
      to: "",
      interval: "",
    };
  },
  computed: {
    value() {
      const newValue = { from: this.from };
      if (this.to) {
        newValue.to = this.to;
      }
      if (this.interval) {
        newValue.interval = this.interval;
      }

      this.$emit("input", newValue);
      return newValue;
    },
  },
  methods: {},
};
</script>

<style scoped>
div.Datetime {
  overflow-y: scroll;
}

div.Datetime div.tableContent {
  background-color: rgba(127, 127, 127, 0.1);
  margin: 0 5%;
}

div.Datetime table {
  margin: auto;
}
</style>
