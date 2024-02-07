<template>
  <div class="home">
    <Home msg="Station Météo" />
    <img alt="Vue logo" src="../assets/meteo.png" />
  </div>
</template>

<script>
// @ is an alias to /src
import Home from "@/components/HomeComponent.vue";

export default {
  name: "HomeView",
  components: {
    Home,
  },
};
</script>
