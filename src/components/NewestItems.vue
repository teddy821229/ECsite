<template>
  <v-hover>
    <v-slide-item>
      <v-card class="mx-4 my-2 product-card" max-width="296">
        <v-img
          height="200"
          width="300"
          :src="
            item.image || `https://picsum.photos/id/${10 + item.id}/500/300`
          "
          lazy-src="https://picsum.photos/id/11/100/60"
        ></v-img>
        <div class="card-section d-flex">
          <v-card-title class="text-title">{{ item.name }}</v-card-title>
          <v-card-text class="text-subtitle"> {{ item.price | moneyFilter}}</v-card-text>
        </div>

        <v-card-text class="pt-1 pb-0 description-part">
          <v-row align="center" class="mx-0">
            <v-rating
              :value="4.5"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>
            <div class="grey--text ms-4">{{item.rating}}</div>
          </v-row>
 
          <div class="mt-5">
            {{ item.description }}
          </div>
        </v-card-text>

        <v-card-actions class="mx-2 mt-3 mb-1">
          <v-spacer></v-spacer>

          <v-btn
            icon
            :color="isLiked ? 'pink' : 'grey'"
            @click="toggleLiked"
          >
            <v-icon>mdi-heart</v-icon>
          </v-btn>

          <v-btn icon :color="isInCart ? 'primary' : 'grey'" @click="addToCart">
            <v-icon>mdi-cart</v-icon>
          </v-btn>

          <router-link
            :to="{ name: 'product', params: { id: item.id } }"
            class="ml-3"
          >
            <v-btn elevation="4" color="primary">前往購買</v-btn>
          </router-link>
        </v-card-actions>
      </v-card>
    </v-slide-item>
  </v-hover>
</template>


<script>
import { Toast } from "./../utils/helper";
import { mapState } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { moneyFilter } from './../utils/mixins'

export default {
  name: "NewestItems",
  mixins: [moneyFilter],
  props: {
    initialItem: {
      type: Object,
      required: true,
    },
  },
  watch: {
    initialItem: {
      handler: function (newValue) {
        this.item = {
          ...this.item,
          ...newValue,
        };
      },
      deep: true,
    },
  },
  created() {
    this.fetchItem();
  },
  data: () => ({
    item: {
      id: -1,
      name: "",
      price: 0,
      stock: 50,
    },
  }),
  computed: {
    ...mapState(["user", "itemInCart", 'likes']),
    isInCart() {
      return this.itemInCart.some(
        (cartItem) => cartItem.Item.id === this.item.id
      );
    },
    isLiked() {
      return this.likes.some(like => like.id === this.item.id)
    }
  },
  methods: {
    fetchItem() {
      this.item = {
        ...this.item,
        ...this.initialItem,
      };
    },
    toggleLiked() {
      if(this.user.id === -1) {
        Toast.fire({
          icon: 'error',
          title: '無法加入收藏，請先登入'
        })
        return
      }
      if(this.likes.some(like => like.id === this.item.id)) {
        this.$store.commit('removeLike', this.item)
      } else {
        this.$store.commit('setLike', this.item)
      }
    },
    addToCart() {
      if(this.user.id === -1) {
        Toast.fire({
          icon: 'error',
          title: '無法加入購物車，請先登入'
        })
        return
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
          id: this.item.id,
          name: this.item.name,
          image: this.item.image,
          price: this.item.price,
          stock: this.item.stock,
        },
        quantity: 1,
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

<style scoped>
.product-card {
  display: flex;
  flex-flow: column;
}

.text-title {
  white-space: nowrap;
  padding-right: 0;
  font-weight: 700;
}

.text-subtitle {
  font-size: 1em;
  padding-left: 5px;
  align-self: flex-end;
  color: #666666;
}

.description-part {
  flex-grow: 1;
}
</style>

