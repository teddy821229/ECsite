<template>
  <v-app-bar fixed color="indigo" class="align-center">
    <v-app-bar-title class="title pl-5">
      <router-link to="/home"> 一四四分之二 </router-link>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <template v-if="isAuthenticated">
      <router-link to="/home">
        <v-btn text color="white"> 首頁 </v-btn>
      </router-link>

      <router-link :to="{ name: 'products'}">
        <v-btn text color="white"> 商品列表 </v-btn>
      </router-link>

      <router-link to="/likes">
        <v-btn text color="white"> 我的收藏 </v-btn>
      </router-link>

      <router-link to="/member/setting">
        <v-btn text color="white"> 會員中心 </v-btn>
      </router-link>

      <v-btn class="mx-2" icon color="white">

        <v-badge
          offset-x="10"
          offset-y="10"
          color="red"
          :content="itemInCart.length"
          :value="itemInCart.length"
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>

      </v-btn>

      <router-link to="#">
        <v-btn class="mx-2" icon color="white">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </router-link>
    </template>
    <template v-else>
      <router-link to="/home">
        <v-btn text color="white"> 註冊 </v-btn>
      </router-link>

      <router-link to="/home">
        <v-btn text color="white"> 登入 </v-btn>
      </router-link>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: "TopNavBar",
  props: {
    isAuthenticated: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    itemInCart: [
      {
        id: 1,
        Item: {
          id: 3,
          name: 'Dimmo',
          price: 350,
          quantity: 4
        }
      }
    ]
  })
};
</script>

<style scoped>
.title a {
  color: #fff;
}

a {
  text-decoration: none;
}
</style>