<template>
  <v-container>
    <v-sheet class="mx-auto px-3 my-5" elevation="12" max-width="1200" rounded>
      <v-row>
        <ProductsCategoryList
          :filterId="selectFilter"
          :searchInput="searchInput"
          @after-change-category="afterChangeCategory"
        />
        <v-divider vertical></v-divider>
        <v-col cols="9">
          <SearchingBar 
            @after-search="afterSearch"
          />
          <v-divider></v-divider>

          <v-sheet
            elevation="4"
            class="my-5 py-3 px-5 d-flex align-center"
            height="80px"
          >
            <div class="text mr-5">篩選</div>
            <div class="chips-container">
              <v-btn
                v-for="tag in tags"
                :key="tag.id"
                class="mx-1"
                depressed
                rounded
                exact-active-class="indigo white--text"
                exact
                @click="selectFilter = tag.id"
                :to="{
                  name: 'products',
                  query: {
                    filterId: tag.id,
                    seriesId: selectSeries,
                    keyword: searchInput
                  },
                }"
              >
                {{ tag.name }}
              </v-btn>
              <v-spacer></v-spacer>
            </div>
            <v-btn icon @click="toggleSort">
              <v-icon v-if="sort === 'ascending'">mdi-sort-ascending</v-icon>
              <v-icon v-else>mdi-sort-descending</v-icon>
            </v-btn>
          </v-sheet>

          <v-divider></v-divider>
          <v-container class="product-container px-3">
            <ProductsCard
              v-for="item in items"
              :key="item.id"
              :initial-item="item"
            />
          </v-container>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
import ProductsCategoryList from "./../components/ProductsCategoryList.vue";
import SearchingBar from "./../components/SearchingBar.vue";
import ProductsCard from "./../components/ProductsCard.vue";

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
];

export default {
  name: "Products",
  components: {
    ProductsCategoryList,
    SearchingBar,
    ProductsCard,
  },
  data: () => ({
    tags: [
      {
        id: 1,
        code: "latest",
        name: "最新上市",
      },
      {
        id: 2,
        code: "bestsell",
        name: "熱門商品",
      },
      {
        id: 3,
        code: "rating",
        name: "綜合評分",
      },
      {
        id: 4,
        code: "price",
        name: "價格",
      },
    ],
    selectFilter: 1,
    selectSeries: "all",
    sort: "ascending",
    searchInput: '',
    items: [],
  }),
  created() {
    this.fetchProducts();
    const { filterId = "", seriesId = "" } = this.$route.query;
    this.selectSeries = seriesId;
    this.selectFilter = Number(filterId);
  },
  beforeRouteUpdate(to, from, next) {
    const { filterId = "", seriesId = ""} = to.query;
    this.selectSeries = seriesId;
    this.selectFilter = Number(filterId);
    document.documentElement.scrollTop = 0;
    next();
  },
  methods: {
    fetchProducts() {
      this.items = dummyProducts;
    },
    toggleSort() {
      if (this.sort === "ascending") {
        this.sort = "descending";
        // TODO: sort data
        return;
      }
      if (this.sort === "descending") {
        this.sort = "ascending";
        // TODO: sort data
        return;
      }
    },
    afterChangeCategory(id) {
      this.selectSeries = id;
      this.searchInput = ''
    },
    afterSearch(keyword) {
      this.selectSeries = 'all'
      this.selectFilter = 1
      this.searchInput = keyword
    }
  },
};
</script>

<style scoped>
.text {
  white-space: nowrap;
}

.chips-container {
  display: flex;
  flex-grow: 1;
  overflow-x: scroll;
}

.chips-container::-webkit-scrollbar {
  height: 60px;
  display: none;
}
.product-container {
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 0 10px;
}
</style>