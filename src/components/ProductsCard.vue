<template>
  <v-card class="mx-4 my-6 product-card" max-width="220">
    <v-img
      height="146"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>
    <div class="card-section">
      <v-card-title class="text-title">{{ item.name }}</v-card-title>
      <v-card-title class="text-subtitle"> NTD {{ item.price }}</v-card-title>
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
        <div class="grey--text ms-4">4.5 (413)</div>
      </v-row>
    </v-card-text>

    <v-card-actions class="mx-2 mt-3 mb-1">
      <v-spacer></v-spacer>

      <template v-if="item.isLiked">
        <v-btn icon color="pink">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn icon color="gray">
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </template>

      <template v-if="item.inCart">
        <v-btn icon color="primary">
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn icon color="gray">
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </template>

      <router-link :to="{ name: 'product', params: { id: item.id }}" class="ml-3">
        <v-btn elevation="4" color="primary">現在購買</v-btn>
      </router-link>
    </v-card-actions>
  </v-card>
</template>


<script>
export default {
  name: "ProductsCard",
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
    },
  }),
  methods: {
    fetchItem() {
      this.item = {
        ...this.item,
        ...this.initialItem,
      };
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
  font-weight: 700;
  padding-bottom: 0;
}

.text-subtitle {
  font-size: 1em;
  padding-top: 0;
  align-self: flex-end;
  color: #666666;
}

.description-part {
  flex-grow: 1;
}
</style>
