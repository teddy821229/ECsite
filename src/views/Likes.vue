<template>
  <v-container mb-5>  
    <v-sheet class="py-3 mx-auto" max-width="1440">
      <div
        class="title text-center indigo white--text py-3 elevation-6"
      >
        我的收藏
      </div>
    </v-sheet>

    <v-sheet class="my-3 mx-auto" elevation="4" max-width="1440">
      <SearchingBar />
    </v-sheet>

    <v-sheet elevation="8" class="mt-5 mx-auto" max-width="1440">
      <v-container class="card-container px-10">
        <ProductsCard
          v-for="product in items"
          :key="product.id"
          :initialItem="product"
        />
      </v-container>
    </v-sheet>
  </v-container>
</template>

<script>
import ProductsCard from "./../components/ProductsCard.vue";
import SearchingBar from "./../components/SearchingBar.vue";

const dummyProducts = [
  {
    id: 1,
    name: "bob色彩系列",
    price: 550,
    description: "bob系列第三代，色彩系列！",
    isLiked: true,
    inCart: false,
  },
  {
    id: 2,
    name: "Yuki進化論",
    price: 280,
    description: "yuki第四彈，進化論系列！",
    isLiked: false,
    inCart: true,
  },
  {
    id: 3,
    name: "Dimoo夏日",
    price: 350,
    description: "Dimoo再出新品，夏日系列！",
    isLiked: true,
    inCart: true,
  },
  {
    id: 4,
    name: "幽靈熊愛與死亡",
    price: 350,
    description: "獨角獸家熱門IP第二彈，幽靈熊愛與死亡系列！",
    isLiked: true,
    inCart: false,
  },
  {
    id: 5,
    name: "幽靈熊愛與死亡",
    price: 350,
    description: "獨角獸家熱門IP第二彈，幽靈熊愛與死亡系列！",
    isLiked: true,
    inCart: false,
  },
  {
    id: 6,
    name: "幽靈熊愛與死亡",
    price: 350,
    description: "獨角獸家熱門IP第二彈，幽靈熊愛與死亡系列！",
    isLiked: true,
    inCart: false,
  },
];

export default {
  name: "Likes",
  components: {
    ProductsCard,
    SearchingBar,
  },
  created() {
    this.fetchProducts();
  },
  data: () => ({
    items: [],
  }),
  methods: {
    fetchProducts() {
      this.items = dummyProducts;
    },
  },
};
</script>

<style scoped>
.card-container {
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 0 10px;
}
</style>