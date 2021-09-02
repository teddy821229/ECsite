<template>
  <v-container>
    <v-sheet class="mx-auto px-3 my-5" elevation="12" max-width="1440" rounded>
      <v-row>
        <v-col cols="5">
          <v-img
            aspect-ratio="1.7778"
            src="https://picsum.photos/id/11/500/300"
            class="mx-auto my-4 rounded-lg"
          ></v-img>
        </v-col>

        <v-col cols="7" class="pl-5 my-3">
          <div class="text-h5 font-weight-black">
            {{ Item.name }}
          </div>
          <div class="row align-center mt-5 ml-1">
            <div class="rating">{{ Item.rating }}</div>
            <v-rating
              half-increments
              v-model="Item.rating"
              length="5"
              color="amber"
              background-color="grey lighten-1"
              dense
              class="mb-1"
              readonly
              small
            ></v-rating>
          </div>
          <div class="amount text-h6 mt-10">
            售價: <span class="ml-5">$ {{ Item.price }} / 個</span>
          </div>

          <div class="quantity-container d-flex align-center mt-2">
            <div class="text text-h6 mt-5">數量：</div>
            <v-text-field
              hide-details
              class="ml-3 text-h6"
              v-model.number="quantity"
              type="number"
              @blur="checkQuantity"
              :disabled="Item.stock === 0"
            >
              <v-icon
                slot="append-outer"
                color="grey"
                class="button"
                @click="addQuantity"
                >mdi-plus</v-icon
              >
              <v-icon
                slot="prepend"
                color="grey"
                class="button"
                @click="minusQuantity"
                >mdi-minus</v-icon
              >
            </v-text-field>
            <div class="stock mt-5 ml-5">還剩 {{ Item.stock }} 個</div>
          </div>

          <v-divider class="mt-5"></v-divider>

          <div class="total text-h6 mt-5">
            總金額： <span>{{ quantity * Item.price }}</span>
          </div>

          <div class="button-container mt-10">
            <v-btn
              class="px-10 py-6 mr-5"
              color="pink"
              outlined
              @click="toggleLiked"
            >
              <v-icon>{{ isLiked ? "mdi-heart" : "mdi-heart-outline" }}</v-icon
              >{{ isLiked ? "取消收藏" : "加入收藏" }}
            </v-btn>

            <v-btn
              class="px-10 py-6 mr-5"
              color="amber"
              outlined
              :disabled="Item.stock === 0"
              @click="addToCart"
            >
              <v-icon>mdi-cart-plus</v-icon>
              加入購物車</v-btn
            >

            <v-btn
              class="px-10 py-6 mr-5"
              color="indigo white--text"
              :disabled="Item.stock === 0"
            >
              直接購買</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "./../utils/helper";
import { v4 as uuidv4 } from "uuid";
import Papa from "papaparse";

const ProductsURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT54r-aPFDVkBm3KfUCm3C1N6kwcAN7fVqFzsUc2IKShjEpO3TQjKPKY2zUbkeQkQD6OaQ56CyR0ECC/pub?gid=0&single=true&output=csv";


export default {
  name: "Product",
  data: () => ({
    Item: {
      id: -1,
      name: "",
      rating: 0,
      price: 0,
      stock: 0,
    },
    quantity: 1,
  }),
  created() {
    const { id: productId } = this.$route.params
    this.fetchProduct(productId)
  },
  beforeRouteUpdate(to, from, next) {
    const { id: productId } = to.params
    this.fetchProduct(productId)
    next()
  },
  computed: {
    ...mapState(["user", "itemInCart", "likes"]),
    isInCart() {
      return this.itemInCart.some(
        (cartItem) => cartItem.Item.id === this.Item.id
      );
    },
    isLiked() {
      return this.likes.some((like) => like.id === this.Item.id);
    },
  },
  methods: {
    fetchProduct(productId) {
      Papa.parse(ProductsURL, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          results.data.map(product => {
            if(productId > results.data.length) {
              Toast.fire({
                icon: 'error',
                title: '該商品不存在'
              })
            } else if(product.id == productId) {
              this.Item = {
                ...this.Item,
                ...product
              }
            }
          })
        }
      })
    },
    addQuantity() {
      if (this.quantity === this.Item.stock) {
        return;
      }
      this.quantity += 1;
    },
    minusQuantity() {
      if (this.quantity === 0) {
        return;
      }
      this.quantity -= 1;
    },
    checkQuantity() {
      if (this.quantity > this.Item.stock) {
        this.quantity = this.Item.stock;
      }
      if (this.quantity < 0) {
        this.quantity = 1;
      }
    },
    toggleLiked() {
      if (this.user.id === -1) {
        Toast.fire({
          icon: "error",
          title: "無法加入收藏，請先登入",
        });
        return;
      }
      if (this.likes.some((like) => like.id === this.Item.id)) {
        this.$store.commit("removeLike", this.Item);
      } else {
        this.$store.commit("setLike", this.Item);
      }
    },
    addToCart() {
      if (this.user.id === -1) {
        Toast.fire({
          icon: "error",
          title: "無法加入購物車，請先登入",
        });
        return;
      }
      if (this.isInCart) {
        Toast.fire({
          icon: "warning",
          title: "商品已經在購物車內！",
        });
        return;
      }
      const targetItem = {
        id: uuidv4(),
        Item: {
          id: this.Item.id,
          name: this.Item.name,
          image: "",
          price: this.Item.price,
          stock: this.Item.stock,
        },
        quantity: this.quantity,
      };
      this.$store.commit("setCartItem", targetItem);
      Toast.fire({
        icon: "success",
        title: "加入購物車成功！",
      });
    },
  },
};
</script>

<style>
.rating {
  font-size: 1rem;
  padding-right: 5px;
}

.text,
.stock {
  white-space: nowrap;
}

.quantity-container {
  max-width: 375px;
}

.quantity-container input[type="number"] {
  text-align: center;
}

.quantity-container input[type="number"]::-webkit-outer-spin-button,
.quantity-container input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}

.quantity-container .button {
  cursor: pointer;
  border: 2px solid #aaa;
  border-radius: 20px;
}
</style>