<template>
<!-- TODO: hover and detials -->
  <v-card class="my-5 pa-5 rounded-lg" elevation="8">
    <v-row class="align-center">
      <v-card-title class="pa-3"> 訂單編號： {{ purchase.id }} </v-card-title>
      <v-spacer></v-spacer>
      <v-card-subtitle class="pa-3"
        >訂購時間：{{ purchase.date }}</v-card-subtitle
      >
    </v-row>

    <v-divider class="my-3"></v-divider>

    <v-sheet>
      <v-container
        v-for="product in purchase.Products"
        :key="product.id"
        class="d-flex align-center py-0"
      >
        <v-img
          lazy-src="https://picsum.photos/id/11/100/60"
          :src=" product.image || `https://picsum.photos/id/${12+product.id}/500/300`"
          max-width="100px"
          contain
          class="rounded"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <v-container>
          <v-card-title class="py-2">{{ product.name }}</v-card-title>
          <v-card-subtitle class="py-2"
            >$ {{ product.price }} x {{ product.quantity }}</v-card-subtitle
          >
        </v-container>
        <v-card-subtitle class="nowrap text-h6 font-weight-bold"
          >$ {{ product.price * product.quantity }}</v-card-subtitle
        >
      </v-container>
    </v-sheet>

    <v-divider class="my-3"></v-divider>

    <v-container class="d-flex justify-end">
      <v-card-title class="text-h5 font-weight-black indigo--text"
        >總金額：{{ totalAmount }}</v-card-title
      >
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    purchase: {
      type: Object,
      required: true,
    },
  },
  name: "HistoryPurchaseCard",
  computed: {
    totalAmount() {
      let total = 0;
      this.purchase.Products.forEach(
        (product) => (total += product.quantity * product.price)
      );
      return total;
    },
  },
};
</script>

<style scoped>
.nowrap {
  white-space: nowrap;
}
</style>