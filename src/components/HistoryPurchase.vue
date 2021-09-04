<template>
  <v-container elevation="12" class="py-1">
    <div v-if="status.isLoading" class="loading-box">
      <half-circle-spinner
        :animation-duration="1200"
        :size="80"
        color="#1A237E"
      />
    </div>
    <template v-else>
      <HistoryPurchaseCard
        v-for="purchase in purchases"
        :key="purchase.id"
        :purchase="purchase"
      />
    </template>
  </v-container>
</template>

<script>
import HistoryPurchaseCard from "./../components/HistoryPurchaseCard.vue";
import Papa from "papaparse";
import { HalfCircleSpinner } from "epic-spinners";

const HistoryPurchaseURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT54r-aPFDVkBm3KfUCm3C1N6kwcAN7fVqFzsUc2IKShjEpO3TQjKPKY2zUbkeQkQD6OaQ56CyR0ECC/pub?gid=499604739&single=true&output=csv";

export default {
  name: "HistoryPurchase",
  components: {
    HistoryPurchaseCard,
    HalfCircleSpinner,
  },
  created() {
    this.fetchPurchase();
  },
  data: () => ({
    purchases: [],
    status: {
      isLoading: true,
    },
  }),
  methods: {
    fetchPurchase() {
      Papa.parse(HistoryPurchaseURL, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          results.data.forEach((list) => {
            if (this.purchases.some((item) => item.id === list.orderId)) {
              const target = this.purchases.find(
                (item) => item.id === list.orderId
              );
              target.Products.push({
                id: list.itemId,
                name: list.itemName,
                image: list.itemImage,
                price: list.itemPrice,
                quantity: list.purchaseQuantity,
              });
            } else {
              this.purchases.push({
                id: list.orderId,
                date: list.orderTime,
                Products: [
                  {
                    id: list.itemId,
                    name: list.itemName,
                    image: list.itemImage,
                    price: list.itemPrice,
                    quantity: list.purchaseQuantity,
                  },
                ],
              });
            }
          });
          this.status.isLoading = false
        },
      });
    },
  },
};
</script>

<style scoped>
.loading-box {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>