<template>
  <v-app-bar fixed color="indigo" class="align-center">
    <v-app-bar-title class="title pl-5">
      <router-link to="/home"> 一四四分之二 </router-link>
    </v-app-bar-title>
    <v-spacer></v-spacer>

    <router-link to="/home">
      <v-btn text color="white"> 首頁 </v-btn>
    </router-link>

    <router-link
      :to="{
        name: 'products',
        query: {
          filterId: 1,
          seriesId: 'all',
          keyword: '',
        },
      }"
    >
      <v-btn text color="white"> 商品列表 </v-btn>
    </router-link>

    <template v-if="isAuthenticated">
      <router-link to="/likes">
        <v-btn text color="white"> 我的收藏 </v-btn>
      </router-link>

      <router-link to="/member/setting">
        <v-btn text color="white"> 會員中心 </v-btn>
      </router-link>

      <!-- 購物車 -->
      <template v-if="!onCheckoutPage">
        <div class="text-center">
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="450"
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
                  class="d-flex align-center my-6 item-card"
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

                  <v-sheet width="150px">
                    <div class="text-subtitle nowrap">
                      {{ item.Item.name }}
                    </div>

                    <v-list-item-subtitle class="nowrap"
                      >$ {{ item.Item.price }}</v-list-item-subtitle
                    >
                  </v-sheet>

                  <v-sheet width="100px" class="mr-8">
                    <v-text-field
                      hide-details
                      class="text-subtitle pa-0 ma-0"
                      v-model.number="item.quantity"
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
                      {{ (item.quantity * item.Item.price) | moneyFilter }}
                    </v-list-item-title>
                  </v-sheet>
                </v-list-item>
              </v-list>
              <v-sheet v-else class="text-center grey--text py-16">
                購物車是空的！快去找喜歡的商品吧！
              </v-sheet>
              <v-divider></v-divider>

              <v-card-actions>
                <span>總金額：{{ totalAmount | moneyFilter }} </span>
                <v-spacer></v-spacer>
                <v-btn text @click="menu = false"> 關閉 </v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="toCheckout"
                  :disabled="itemInCart.length < 1"
                >
                  前往結帳
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </div>
      </template>
    </template>

    <!-- 登出/登入 功能 -->

    <template v-if="isAuthenticated">
      <v-btn class="mx-2" icon color="white" @click="handleLogout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </template>

    <template v-else>
      <router-link to="/register">
        <v-btn text color="white"> 註冊 </v-btn>
      </router-link>

      <router-link to="/login">
        <v-btn text color="white" to="/login"> 登入 </v-btn>
      </router-link>
    </template>
  </v-app-bar>
</template>

<script>
import Swal from "sweetalert2";
import { Toast } from "../utils/helper";
import { mapState } from "vuex";
import { moneyFilter } from "./../utils/mixins";

export default {
  name: "TopNavBar",
  mixins: [moneyFilter],
  props: {
    isAuthenticated: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    menu: false,
  }),
  methods: {
    addQuantity(id) {
      const target = this.itemInCart.find((item) => item.id === id);
      if (target.quantity === target.Item.stock) {
        return;
      }
      target.quantity += 1;
      this.$store.commit("setCartItem", target);
    },
    minusQuantity(id) {
      const target = this.itemInCart.find((item) => item.id === id);
      if (target.quantity === 1) {
        Swal.fire({
          title: "確定要移除商品嗎？",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#D76972",
          cancelButtonColor: "#aaa",
          confirmButtonText: "確定",
          toast: true,
          position: "top-end",
        }).then((result) => {
          if (result.isConfirmed) {
            this.$store.commit("removeCartItem", target);
          }
        });
        return;
      }
      target.quantity -= 1;
      this.$store.commit("setCartItem", target);
    },
    checkQuantity(id) {
      const target = this.itemInCart.find((item) => item.id === id);
      if (target.quantity > target.Item.stock) {
        target.quantity = target.Item.stock;
      }
      if (target.quantity < 0) {
        target.quantity = 1;
      }
      if (target.quantity === 0) {
        Swal.fire({
          title: "確定要移除商品嗎？",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#D76972",
          cancelButtonColor: "#aaa",
          confirmButtonText: "確定",
          toast: true,
          position: "top-end",
        }).then((result) => {
          if (result.isConfirmed) {
            this.$store.commit("removeCartItem", target);
          } else {
            target.quantity = 1;
          }
        });
        return;
      }
      this.$store.commit("setCartItem", target);
    },
    toCheckout() {
      document.scrollingElement.scrollTop = 0
      this.$router.push("/checkout")
      this.menu = false;
    },
    handleLogout() {
      Swal.fire({
        title: "確定要登出嗎？",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#D76972",
        cancelButtonColor: "#aaa",
        confirmButtonText: "登出",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.commit("revokeAuthentication");
          Toast.fire({
            icon: "success",
            title: "您已經成功登出",
          });
          const nowPage = this.$route;
          if (
            nowPage.path.includes("member") ||
            nowPage.path.includes("likes")
          ) {
            this.$router.push("/login");
          }
        }
      });
    },
  },
  computed: {
    totalAmount() {
      let price = 0;
      this.itemInCart.forEach(
        (item) => (price += item.Item.price * item.quantity)
      );
      return price;
    },
    ...mapState(["itemInCart"]),
    onCheckoutPage() {
      return this.$route.name === "checkout"
    }
  },
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
.item-card input[type="number"] {
  text-align: center;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
</style>