<template >
  <v-carousel v-model="model" 
    class="carousel elevation-12" 
    cycle 
    interval="5000"
  > 
    <v-carousel-item v-for="color in colors" :key="color">
      <v-sheet :color="color" height="100%" tile>
        <v-row class="fill-height" align="center" justify="center">
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "MainCarousel",
  data: () => ({
    model: 0,
    colors: ["primary", "secondary", "yellow darken-2", "red"],
  }),
};
</script>

<style scoped>
  .carousel {
    width: 80%;
  }
</style>