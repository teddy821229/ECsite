<template>
  <div class="content-container">
    <MainCarousel class="mt-10" />
    <v-container>
      <div class="subtitle">最新商品</div>

      <v-divider></v-divider>
      <!-- TODO: decide to use overflow or slide-group -->
      <v-sheet elevation="12" class="mt-10">
        <v-slide-group show-arrows class="item-container">
          <NewestItems
            v-for="item in items"
            :key="item.id"
            :initial-item="item"
          />
        </v-slide-group>
      </v-sheet>

      <!-- TODO: new item card -->
    </v-container>
    <v-container>
      <div class="subtitle">商品列表</div>
      <v-divider></v-divider>
      <v-container class="comment-container"> </v-container>
    </v-container>
  </div>
</template>

<script>
import MainCarousel from "./../components/MainCarousel";
import NewestItems from "./../components/NewestItems.vue";

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
  name: "Home",
  components: {
    MainCarousel,
    NewestItems,
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
.content-container {
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  max-width: 1600px;
}

.subtitle {
  height: 100px;

  font-size: 36px;
  font-weight: 700;
  text-align: center;
  line-height: 100px;
}

.item-container {
  min-width: 80%;
  /* overflow-x: scroll;
  display: flex; */
}
</style>
