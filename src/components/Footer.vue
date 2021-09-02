<template>
  <v-footer padless color="indigo darken-1">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link.id"
        color="white"
        text
        class="my-2 mx-2 btn"
        :to="link.route"
      >
        {{ link.name }}
      </v-btn>
      <v-col class="indigo darken-4 py-4 text-center white--text" cols="12">
        Copyright &copy; {{ new Date().getFullYear() }}
        <strong> 一四四分之二 </strong>
        <router-link class="text" to="#">
          <v-btn text color="white">隱私權政策</v-btn>
        </router-link>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    links: [
      {
        id: "1",
        name: "首頁",
        route: { name: "home" },
      },
      {
        id: 2,
        name: "商品列表",
        route: {
          name: "products",
          query: {
            filterId: 1,
            seriesId: "all",
            keyword: "",
          },
        },
      },
      {
        id: 3,
        name: "我的收藏",
        route: { name: "likes" },
      },
      {
        id: 4,
        name: "會員中心",
        route: { name: "member" },
      },
    ],
  }),
};
</script>

<style scoped>
.text {
  display: block;
  padding-top: 10px;
  font-size: 0.8rem;
  color: #fff;
  text-decoration: none;
}
</style>