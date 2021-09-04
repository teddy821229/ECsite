<template>
  <v-container>
    <v-sheet class="mx-auto px-3 my-5" elevation="12" max-width="1200" rounded>
      <v-row>
        <ProductsCategoryList
          :series-list="seriesList"
          :filterId="selectFilter"
          :searchInput="searchInput"
          :is-loading="status.isLoading"
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
          <div v-if="status.isLoading" class="loading-box">
            <half-circle-spinner
              :animation-duration="1200"
              :size="80"
              color="#1A237E"
            />
          </div>
          <template v-else>
            <v-container class="product-container px-3">
              <ProductsCard
                v-for="item in afterPaginate"
                :key="item.id"
                :initial-item="item"
              />
            </v-container>
            <div class="text-center">
              <v-pagination
                v-model="showIndex.nowPage"
                :length="totalPage"
              ></v-pagination>
            </div>
          </template>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
import Papa from "papaparse";

import ProductsCategoryList from "./../components/ProductsCategoryList.vue";
import SearchingBar from "./../components/SearchingBar.vue";
import ProductsCard from "./../components/ProductsCard.vue";

import { mapState } from "vuex";

import { HalfCircleSpinner } from "epic-spinners";

const SeriesURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT54r-aPFDVkBm3KfUCm3C1N6kwcAN7fVqFzsUc2IKShjEpO3TQjKPKY2zUbkeQkQD6OaQ56CyR0ECC/pub?gid=11022087&single=true&output=csv";

const ProductsURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT54r-aPFDVkBm3KfUCm3C1N6kwcAN7fVqFzsUc2IKShjEpO3TQjKPKY2zUbkeQkQD6OaQ56CyR0ECC/pub?gid=0&single=true&output=csv";

export default {
  name: "Products",
  components: {
    ProductsCategoryList,
    SearchingBar,
    ProductsCard,
    HalfCircleSpinner,
  },
  data: () => ({
    tags: [
      {
        id: 1,
        code: "latest",
        name: "最新上市",
        rules: function (items, sort) {
          if (sort === "ascending") {
            return items.sort((a, b) => b.releaseDate - a.releaseDate);
          }
          return items.sort((a, b) => a.releaseDate - b.releaseDate);
        },
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
        rules: function (items, sort) {
          if (sort === "ascending") {
            return items.sort((a, b) => b.rating - a.rating);
          }
          return items.sort((a, b) => a.rating - b.rating);
        },
      },
      {
        id: 4,
        code: "price",
        name: "價格",
        rules: function (items, sort) {
          if (sort === "ascending") {
            return items.sort((a, b) => b.price - a.price);
          }
          return items.sort((a, b) => a.price - b.price);
        },
      },
    ],
    items: [],
    seriesList: [],
    selectFilter: 1,
    selectSeries: "all",
    sort: "ascending",
    searchInput: "",
    showIndex: {
      nowPage: 1,
      perPage: 9,
    },
    status: {
      isLoading: true,
    },
  }),
  watch: {
    showIndex: {
      handler: () => {
        document.documentElement.scrollTop = 0;
      },
      deep: true,
    },
  },
  created() {
    this.fetchProducts();
    const { filterId = "", seriesId = "" } = this.$route.query;
    this.selectSeries = seriesId;
    this.selectFilter = Number(filterId);
    this.fetchList();
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
      Papa.parse(ProductsURL, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          results.data.forEach((product) => {
            this.items.push({
              ...product,
              releaseDate: new Date(product.releaseDate),
            });
          });
        },
      });
    },
    fetchList() {
      Papa.parse(SeriesURL, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          // this.seriesList = results.data
          results.data.forEach((series) => {
            if (this.seriesList.some((item) => item.id === series.seriesId)) {
              const target = this.seriesList.find(
                (item) => item.id === series.seriesId
              );
              target.Items.push({
                id: series.ipId,
                title: series.ipName,
              });
            } else {
              this.seriesList.push({
                id: series.seriesId,
                title: series.seriesName,
                Items: [
                  {
                    id: series.ipId,
                    title: series.ipName,
                  },
                ],
              });
            }
          });
          this.status.isLoading = false;
        },
      });
    },
    toggleSort() {
      if (this.sort === "ascending") {
        this.sort = "descending";
        this.showIndex.nowPage = 1;
        return;
      }
      if (this.sort === "descending") {
        this.sort = "ascending";
        this.showIndex.nowPage = 1;
        return;
      }
    },
    afterChangeCategory(id) {
      this.selectSeries = id;
      this.searchInput = "";
      this.showIndex.nowPage = 1;
    },
    afterSearch(keyword) {
      this.selectSeries = "all";
      this.selectFilter = 1;
      this.searchInput = keyword;
      this.showIndex.nowPage = 1;
    },
  },
  computed: {
    ...mapState(["user"]),
    filterProducts() {
      let afterFilterList = this.items;

      afterFilterList = afterFilterList.filter((item) =>
        item.name.toLowerCase().includes(this.searchInput)
      );

      // series
      if (this.selectSeries !== "all")
        afterFilterList = afterFilterList.filter((item) =>
          item.series.includes(this.selectSeries)
        );

      // sort by

      const filter = this.tags.find((tag) => tag.id === this.selectFilter);
      afterFilterList = filter.rules(afterFilterList, this.sort);

      // pagination

      return afterFilterList;
    },
    afterPaginate() {
      return this.filterProducts.slice(
        (this.showIndex.nowPage - 1) * this.showIndex.perPage,
        this.showIndex.nowPage * this.showIndex.perPage
      );
    },
    totalPage() {
      return Math.ceil(this.filterProducts.length / this.showIndex.perPage);
    },
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
.loading-box {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>