<template >
  <v-carousel
    v-model="model"
    class="carousel elevation-12"
    cycle
    interval="5000"
  >
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "MainCarousel",
  data: () => ({
    model: 0,
    items: [
      {
        src: "https://i.imgur.com/npIOQof.jpg",
      },
      {
        src: "https://i.imgur.com/Xjl5xwu.jpg",
      },
      {
        src: "https://i.imgur.com/8Z3sNo4.jpg",
      },
      {
        src: "https://i.imgur.com/8eXPyxG.jpg",
      },
    ],
  }),
};
</script>

<style scoped>
.carousel {
  width: 80%;
  object-fit: cover;
}
</style>