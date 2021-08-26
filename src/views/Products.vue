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
          <SearchingBar target="products" @after-search="afterSearch" />
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
                    keyword: searchInput,
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
              v-for="item in filterProducts"
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

import { mapState } from "vuex";

const dummyProducts = [
  {
    id: 1,
    name: "bob色彩系列",
    series: 'unicorn1',
    price: 550,
    rating: 4.5,
    releaseDate: new Date(2021, 3, 3),
    description: "bob系列第三代，色彩系列！",
  },
  {
    id: 2,
    name: "Yuki進化論",
    series: 'popmart4',
    price: 280,
    rating: 4.2,
    releaseDate: new Date(2021, 7, 3),
    description: "yuki第四彈，進化論系列！",
  },
  {
    id: 3,
    name: "Dimoo夏日",
    series: 'popmart1',
    price: 350,
    rating: 4.7,
    releaseDate: new Date(2021, 7, 20),
    description: "Dimoo再出新品，夏日系列！",
  },
  {
    id: 4,
    name: "幽靈熊愛與死亡",
    series: 'unicorn4',
    price: 350,
    rating: 3.9,
    releaseDate: new Date(2021, 6, 11),
    description: "獨角獸家熱門IP第二彈，幽靈熊愛與死亡系列！",
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
        rules: function(items, sort) {
          if(sort === 'ascending') {
            return items.sort((a, b) => b.releaseDate - a.releaseDate)
          }
          return items.sort((a, b) => a.releaseDate - b.releaseDate)
        }
      },
      // {
      //   id: 2,
      //   code: "bestsell",
      //   name: "熱門商品",
      //   rules: function(items, sort) {
      //     if(sort === 'descending') {
      //       return items.sort((a, b) => b.releaseDate - a.releaseDate)
      //     }
      //     return items.sort((a, b) => a.releaseDate - b.releaseDate)
      //   }
      // },
      {
        id: 3,
        code: "rating",
        name: "綜合評分",
        rules: function(items, sort) {
          if(sort === 'ascending') {
            return items.sort((a, b) => b.rating - a.rating)
          }
          return items.sort((a, b) => a.rating - b.rating)
        }
      },
      {
        id: 4,
        code: "price",
        name: "價格",
        rules: function(items, sort) {
          if(sort === 'ascending') {
            return items.sort((a, b) => b.price - a.price)
          }
          return items.sort((a, b) => a.price - b.price)
        }
      },
    ],
    items: [],
    selectFilter: 1,
    selectSeries: "all",
    sort: "descending",
    searchInput: "",
  }),
  created() {
    this.fetchProducts();
    const { filterId = "", seriesId = "" } = this.$route.query;
    this.selectSeries = seriesId;
    this.selectFilter = Number(filterId);
  },
  beforeRouteUpdate(to, from, next) {
    const { filterId = "", seriesId = "" } = to.query;
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
      this.searchInput = "";
    },
    afterSearch(keyword) {
      this.selectSeries = "all";
      this.selectFilter = 1;
      this.searchInput = keyword;
    },
  },
  computed: {
    ...mapState(["user"]),
    filterProducts() {
      let afterFilterList = this.items

       afterFilterList = afterFilterList.filter(item => item.name.toLowerCase().includes(this.searchInput))

      // series
      if(this.selectSeries !== 'all') 

      afterFilterList =  afterFilterList.filter(item => item.series.includes(this.selectSeries))

      // sort by

      const filter = this.tags.find(tag => tag.id === this.selectFilter)
      afterFilterList = filter.rules(afterFilterList, this.sort)

      return afterFilterList

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