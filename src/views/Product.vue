<template>
  <v-container>
    <v-sheet class="mx-auto px-3 my-5" elevation="12" max-width="1440" rounded>
      <v-row>
        <v-col cols="5">
          <v-img
            aspect-ratio="1.7778"
            src="https://picsum.photos/id/11/500/300"
            class="mx-auto my-4"
          ></v-img>
        </v-col>

        <v-col cols="7" class="pl-5 my-3">
          <div class="text-h5 font-weight-black">
            BOB男友系列第三彈 —— 色彩系列
          </div>
          <div class="row align-center mt-5 ml-1">
            <div class="rating ">{{ rating }}</div>
            <v-rating
              half-increments
              v-model="rating"
              length="5"
              color="amber"
              background-color="grey lighten-1"
              dense
              class="mb-1"
              readonly
              small
            ></v-rating>
            <div class="rating-count pl-4">447 筆評論</div>
          </div>
          <div class="amount text-h6 mt-10">
            售價: <span class="ml-5">$ 550 / 個</span>
          </div>

          <div class="quantity d-flex align-center mt-2">
            <div class="text text-h6 mt-5">數量：</div>
            <v-text-field
              hide-details
              class="ml-3 text-h6"
              v-model="quantity"
              type="number"
              @blur="checkQuantity"
              :disabled="stock === 0"
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
            <div class="stock mt-5 ml-5">還剩 {{ stock }} 個</div>
          </div>

          <v-divider class="mt-5"></v-divider>

          <div class="total text-h6 mt-5">
            總金額： <span>{{ quantity * price }}</span>
          </div>

          <div class="button-container mt-10">
            <v-btn
              class="px-10 py-6 mr-5"
              color="pink"
              outlined
              v-model="isLiked"
              @click="toggleLiked"
            >
              <v-icon>{{ isLiked ? "mdi-heart" : "mdi-heart-outline" }}</v-icon
              >{{ isLiked ? "取消收藏" : "加入收藏" }}
            </v-btn>

            <v-btn
              class="px-10 py-6 mr-5"
              color="amber"
              outlined
              :disabled="stock === 0"
            >
              <v-icon>mdi-cart-plus</v-icon>
              加入購物車</v-btn
            >

            <v-btn
              class="px-10 py-6 mr-5"
              color="indigo white--text"
              :disabled="stock === 0"
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
export default {
  name: "Product",
  data: () => ({
    name: "",
    rating: 4.5,
    commentCounts: "",
    price: 550,
    quantity: 1,
    stock: 15,
    isLiked: true,
    inCart: false,
  }),
  methods: {
    addQuantity() {
      if (this.quantity === this.stock) {
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
      if (this.quantity > this.stock) {
        this.quantity = this.stock;
      }
    },
    toggleLiked() {
      this.isLiked = !this.isLiked;
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

.quantity {
  max-width: 375px;
}

input[type="number"] {
  text-align: center;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}

.button {
  cursor: pointer;
  border: 2px solid #aaa;
  border-radius: 20px;
}
</style>