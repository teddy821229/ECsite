<template>
  <v-container elevation="12" class="py-1 grey lighten-4">
    <HistoryPurchaseCard
      v-for="purchase in purchases"
      :key="purchase.id"
      :purchase="purchase"
    />
  </v-container>
</template>

<script>
import HistoryPurchaseCard from "./../components/HistoryPurchaseCard.vue";

const dummyPurchases = [
  {
    id: "eva12345",
    amount: 3200,
    date: '2021/8/14',
    Products: [
      {
        id: 1,
        name: "Bob色彩系列",
        image: '',
        quantity: 2,
        price: 550,
      },
      {
        id: 14,
        name: "Rico海島",
        image: '',
        quantity: 4,
        price: 350,
      },
      {
        id: 12,
        name: "Rico海洋",
        image: '',
        quantity: 2,
        price: 350,
      },
    ],
  },
  {
    id: "pig33675",
    amount: 3000,
    date: '2021/8/10',
    Products: [
      {
        id: 1,
        name: "Bob色彩系列",
        image: '',
        quantity: 4,
        price: 550,
      },
      {
        id: 17,
        name: "Dimoo動物",
        image: '',
        quantity: 2,
        price: 400,
      },
    ],
  },
];

export default {
  name: "HistoryPurchase",
  components: {
    HistoryPurchaseCard,
  },
  created() {
    this.fetchPurchase();
  },
  data: () => ({
    purchases: [],
  }),
  methods: {
    fetchPurchase() {
      this.purchases = dummyPurchases;
    },
  },
};
</script>

<style scoped>
</style>