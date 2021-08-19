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

      <router-link :to="{ name: 'products' }">
        <v-btn text color="white"> 商品列表 </v-btn>
      </router-link>

      <router-link to="/likes">
        <v-btn text color="white"> 我的收藏 </v-btn>
      </router-link>

      <router-link to="/member/setting">
        <v-btn text color="white"> 會員中心 </v-btn>
      </router-link>

      <!-- 購物車 -->
      <div class="text-center">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="400"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="mx-2" icon color="white" v-bind="attrs" v-on="on">
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
          </template>

          <v-card>
            <!-- title -->
            <v-list>
              <v-list-item>
                <v-list-item-avatar color="amber">
                  <span class="white--text text-h5">TL</span>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>Teddy Lee</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>
            <!-- 購物車內容 -->
            <v-list class="py-0" v-if="itemInCart.length > 0">
              <!-- v-for -->
              <v-list-item
                v-for="item in itemInCart"
                :key="item.id"
                class="d-flex align-center my-6"
              >
                <v-img
                  :src="
                    item.Item.image ||
                    `https://picsum.photos/id/${12 + item.Item.id}/500/300`
                  "
                  max-width="80px"
                  class="rounded mr-6"
                >
                </v-img>

                <v-sheet
                  width="110px"
                >
                  <div class="text-subtitle nowrap">
                    {{ item.Item.name }}
                  </div>

                  <v-list-item-subtitle class="nowrap"
                    >$ {{ item.Item.price }}</v-list-item-subtitle
                  >
                </v-sheet>

                <v-sheet
                  width="85px"
                >
                  <v-text-field
                    hide-details
                    class="text-subtitle pa-0 ma-0 "
                    v-model="item.quantity"
                    type="number"
                    @blur="checkQuantity(item.id)"
                    outlined
                    dense
                  >
                    <v-icon
                      slot="append"
                      color="grey"
                      class="button mt-1"
                      @click="addQuantity(item.id)"
                      small
                      >mdi-plus</v-icon
                    >
                    <v-icon
                      slot="prepend-inner"
                      color="grey"
                      class="button mt-1"
                      @click="minusQuantity(item.id)"
                      small
                      >mdi-minus</v-icon
                    >
                  </v-text-field>
                </v-sheet>

                <v-spacer></v-spacer>
                <v-sheet>
                  <v-list-item-title class="text-h6 font-weight-black">
                    $ {{ item.quantity * item.Item.price }}
                  </v-list-item-title>
                </v-sheet>
              </v-list-item>
            </v-list>
            <v-sheet 
              v-else
              class="text-center grey--text py-16"
            >
              購物車是空的！快去找喜歡的商品吧！
            </v-sheet>
            <v-divider></v-divider>

            <v-card-actions>
              <span>總金額：{{totalAmount}}
              </span>
              <v-spacer></v-spacer>
              <v-btn text @click="menu = false"> 關閉 </v-btn>
              <v-btn color="primary" text> 前往結帳 </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>

      <!-- 登出/登入 功能 -->

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
          name: "Dimmo",
          image: "",
          price: 350,
          stock: 23,
        },
        quantity: 4,
      },
      {
        id: 2,
        Item: {
          id: 6,
          name: "LULU豬",
          image: "",
          price: 375,
          stock: 56,
        },
        quantity: 2,
      },
    ],
    menu: false,
  }),
  methods: {
    addQuantity(id) {
      let target = this.itemInCart.find((item) => item.id === id);
      if (target.quantity === target.Item.stock) {
        return;
      }
      target.quantity += 1;
    },
    minusQuantity(id) {
      let target = this.itemInCart.find((item) => item.id === id);
      if (target.quantity === 1) {
        this.itemInCart = this.itemInCart.filter(item => item.id !== id)
        return;
      }
      target.quantity -= 1;
    },
    checkQuantity(id) {
      let target = this.itemInCart.find((item) => item.id === id);
      if (target.quantity > target.Item.stock) {
        target.quantity = target.Item.stock;
      }
    },
  },
  computed: {
    totalAmount() {
      let price = 0
      this.itemInCart.forEach(item => price += item.Item.price * item.quantity)
      return price
    }
  }
};
</script>

<style scoped>
.nowrap {
  white-space: nowrap;
}

.title a {
  color: #fff;
}

a {
  text-decoration: none;
}
</style>

<style>
input[type="number"] {
  text-align: center;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
</style>