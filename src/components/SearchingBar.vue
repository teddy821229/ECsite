<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col class="d-flex search-row">
          <v-text-field
            label="搜尋商品"
            placeholder="IP / 公司 / 或是系列名稱"
            v-model="keyword"
            outlined
            hide-details
          ></v-text-field>
          <v-btn
            class="mr-4 search-button"
            type="submit"
            text
            height="56px"
            @click="searchResult"
          >
            搜尋
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
      if (this.target === "likes") {
        this.$router.push({
          name: this.target,
          query: {
            keyword: this.keyword,
          },
        });
        return
      }
      this.$router.push({
        name: this.target,
        query: {
          filterId: 1,
          seriesId: "all",
          keyword: this.keyword,
        },
      });
      this.$emit("after-search", this.keyword);
    },
  },
};
</script>


<style scoped>
</style>