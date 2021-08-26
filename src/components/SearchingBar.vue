<template>
  <v-form @submit.prevent.stop="searchResult">
    <v-container>
      <v-row>
        <v-col class="d-flex search-row">
          <v-text-field
            label="搜尋商品"
            placeholder="請輸入關鍵字"
            v-model="keyword"
            outlined
            hide-details
          ></v-text-field>
          <v-btn class="ml-2 my-2" type="submit" text height="40px">
            搜尋
          </v-btn>
          <v-btn class="mr-1 my-2" color="red" text type="button" height="40px" @click="cleanSearch">
            清除
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "SearchingBar",
  props: {
    target: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    keyword: "",
  }),
  methods: {
    searchResult() {
      document.documentElement.scrollTop = 0;
      if(this.keyword === this.$route.query.keyword) {
        return
      }
      if (this.target === "likes") {
        this.$router.push({
          name: this.target,
          query: {
            keyword: this.keyword,
          },
        });
        this.$emit("after-search", this.keyword.toLowerCase());
        return;
      }
      this.$router.push({
        name: this.target,
        query: {
          filterId: 1,
          seriesId: "all",
          keyword: this.keyword,
        },
      });
      this.$emit("after-search", this.keyword.toLowerCase());
    },
    cleanSearch() {
      // use $refs
      document.documentElement.scrollTop = 0;
      if(this.keyword === '') {
        return
      }
      this.keyword = ''
      if (this.target === "likes") {
        this.$router.push({
          name: this.target,
          query: {
            keyword: '',
          },
        });
        this.$emit("after-search", "");
        return;
      }
      this.$router.push({
        name: this.target,
        query: {
          filterId: 1,
          seriesId: "all",
          keyword: '',
        },
      });
      this.$emit("after-search", "");
    }
  },
};
</script>


<style scoped>
</style>