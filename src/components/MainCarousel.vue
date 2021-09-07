<template >
  <v-carousel
    v-model="model"
    class="carousel elevation-12"
    cycle
    interval="5000"
    height="600"
  >
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  name: "MainCarousel",
  data: () => ({
    model: 0,
    items: [
      {
        src: 'https://i.imgur.com/S3sxvPn.jpg',
      },
      {
        src: "https://i.imgur.com/ThcMCQb.jpg",
      },
      {
        src: "https://i.imgur.com/WsKKK4k.jpg",
      },
      {
        src: "https://i.imgur.com/WsWQKED.jpg",
      },
    ],
  }),
};
</script>

<style >
.carousel {
  max-width: 1000px;
}



</style>