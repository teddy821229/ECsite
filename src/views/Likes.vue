<template>
  <v-container mb-5>  
    <v-sheet class="py-3 mx-auto" max-width="1200">
      <div
        class="title text-center indigo white--text py-3 elevation-6"
      >
        我的收藏
      </div>
    </v-sheet>

    <v-sheet class="my-3 mx-auto" elevation="4" max-width="1200">
      <SearchingBar 
        target="likes"
        @after-search="afterSearch"
      />
    </v-sheet>

    <v-sheet elevation="8" class="mt-5 mx-auto" max-width="1200">
      <v-container class="card-container px-10">
        <template v-if="likes.length === 0">
          <v-sheet
            height="200"
            class="d-flex flex-column justify-center align-center"
          >
          <p class="noLikes text-h6 grey--text">
            還沒有收藏任何商品唷，快去逛逛吧！
          </p>
          <v-btn
            outlined
            width="140px"
            class="mt-2 py-5 indigo white--text"
            :to="{ 
              name: 'products', 
              query: {
                filterId: 1,
                seriesId: 'all',
                keyword: ''
              }
            }"
          >
            前往商品列表
          </v-btn>
            
          </v-sheet>
        </template>
        <ProductsCard
          v-for="product in filterItems"
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

import { mapState } from 'vuex'


export default {
  name: "Likes",
  components: {
    ProductsCard,
    SearchingBar,
  },
  data: () => ({
    searchInput: ''
  }),
  methods: {
    afterSearch(keyword) {
      this.searchInput = keyword;
    },
  },
  computed: {
    ...mapState(['likes']),
    filterItems() {
      return this.likes.filter(item => item.name.toLowerCase().includes(this.searchInput))
    }
  }
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