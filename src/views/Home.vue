<template>
  <v-container class="content-container">
    <MainCarousel class="mt-10" />
    <v-container>
      <div class="subtitle">最新商品</div>

      <v-divider></v-divider>
      <!-- TODO: decide to use overflow or slide-group -->
      <v-sheet elevation="12" class="mt-10 mx-auto py-8" max-width="1200px">
        <v-slide-group show-arrows>
          <NewestItems
            v-for="item in newestItems"
            :key="item.id"
            :initial-item="item"
          />
        </v-slide-group>
      </v-sheet>

      <!-- TODO: new item card -->
    </v-container>

    <v-container>
      <div class="subtitle">熱銷商品</div>
      <v-divider></v-divider>

      <v-sheet elevation="12" class="mt-10 mx-auto" max-width="1200px">
        <v-tabs fixed-tabs color="indigo" class="py-2 px-8">
          <v-tab
            v-for="tab in series"
            :key="tab.id"
            @click="selectCategory = tab.id"
          >
            {{ tab.name }}
          </v-tab>
        </v-tabs>
        <v-container class="products-container px-3 py-10">
          <NewestItems
            v-for="item in filteredTopFive"
            :key="item.id"
            :initial-item="item"
          />
          <v-card class="more-card" max-width="296" elevation="0">
            <v-hover v-slot="{ hover }">
              <v-sheet
                class="
                  circle-container
                  d-flex
                  align-center
                  justify-center
                  flex-column
                  rounded-circle
                "
                :color=" hover ? 'indigo' : 'white'"
                :elevation="hover ? 8 : 4"
                @click.prevent.stop="toPage"
              >
                <v-icon 
                  :color=" hover ? 'white' : 'indigo'"
                > mdi-plus-circle-outline </v-icon>
                <span class="text-h6"
                  :class="hover ? 'white--text' : 'indigo--text'"
                >看更多</span>
              </v-sheet>
            </v-hover>
          </v-card>
        </v-container>
      </v-sheet>
    </v-container>
  </v-container>
</template>

<script>
import MainCarousel from "./../components/MainCarousel";
import NewestItems from "./../components/NewestItems.vue";

const dummyNuwest = [
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

const dummyTopFiveItem = [
  {
    id: 1,
    name: "bob色彩系列",
    price: 550,
    description: "bob系列第三代，色彩系列！",
    categoryId: 'popmart',
    isLiked: true,
    inCart: false,
  },
  {
    id: 2,
    name: "bob環遊系列",
    price: 550,
    description: "bob系列第三代，色彩系列！",
    categoryId: 'popmart',
    isLiked: true,
    inCart: false,
  },
  {
    id: 3,
    name: "Rico海島",
    price: 550,
    description: "我是獨角獸系列",
    categoryId: 'popmart',
    isLiked: true,
    inCart: false,
  },
  {
    id: 4,
    name: "幽靈熊旅館",
    price: 550,
    description: "幽靈熊最新第三代，跟前幾代長很像。",
    categoryId: 'popmart',
    isLiked: true,
    inCart: false,
  },
  {
    id: 5,
    name: "幽靈熊愛與死亡",
    price: 550,
    description: "幽靈熊最新第二代",
    categoryId: 'popmart',
    isLiked: true,
    inCart: false,
  },
  {
    id: 6,
    name: "小甜豆秋葉原",
    price: 550,
    description: "小甜豆秋葉原",
    categoryId: 'unicorn',
    isLiked: true,
    inCart: false,
  },
  {
    id: 7,
    name: "Dimoo動物",
    price: 550,
    description: "Dimoo動物",
    categoryId: 'unicorn',
    isLiked: true,
    inCart: false,
  },
  {
    id: 8,
    name: "豬女",
    price: 550,
    description: "豬女",
    categoryId: 'unicorn',
    isLiked: true,
    inCart: false,
  },
  {
    id: 9,
    name: "眼淚",
    price: 550,
    description: "眼淚",
    categoryId: 'unicorn',
    isLiked: true,
    inCart: false,
  },
  {
    id: 10,
    name: "yuki進化論",
    price: 550,
    description: "yuki進化論",
    categoryId: 'unicorn',
    isLiked: true,
    inCart: false,
  },
];

const dummySeries = [
  {
    id: 'popmart',
    name: "泡泡瑪特",
  },
  {
    id: 'unicorn',
    name: "尋找獨角獸",
  },
  {
    id: '52toys',
    name: "52TOYS",
  },
  {
    id: 22,
    name: "潮玩",
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
    this.fetchSeries();
  },
  data: () => ({
    newestItems: [],
    topFiveItems: [],
    series: [],
    selectCategory: 'popmart',
  }),
  methods: {
    fetchProducts() {
      this.newestItems = dummyNuwest;
      this.topFiveItems = dummyTopFiveItem;
    },
    fetchSeries() {
      this.series = dummySeries;
    },
    toPage() {
      document.documentElement.scrollTop = 0
      this.$router.push({
        name: 'products',
        query: {
          filterId: 1,
          seriesId: this.selectCategory,
          keyword: ''
        }
      })
    }
  },
  computed: {
    filteredTopFive() {
      return this.topFiveItems.filter(
        (item) => item.categoryId === this.selectCategory
      );
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

.products-container {
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px 10px;
}

.more-card {
  position: relative;
}

.circle-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  width: 100px;
  height: 100px;
  cursor: pointer;
}

</style>
