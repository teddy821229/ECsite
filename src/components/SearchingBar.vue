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
          <v-btn class="mr-4 search-button" type="submit" text height="56px"> 搜尋 </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "SearchingBar",
  data: () => ({
    keyword: "",
  }),
};
</script>


<style scoped>

</style>