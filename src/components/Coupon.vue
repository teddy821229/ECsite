<template>
  <v-container>
    <v-form class="d-flex align-center mx-2" @submit.prevent.stop="addTicket">
      <div class="title">新增優惠卷</div>
      <v-text-field
        placeholder="請輸入優惠代碼"
        class="px-5"
        max="8"
        hint="優惠卷皆為8碼，英文皆大寫。"
        v-model="ticketCode"
      >
      </v-text-field>
      <v-btn type="submit" text>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-form>
    <v-divider class="mt-2"></v-divider>
    <div v-if="status.isLoading" class="loading-box">
      <half-circle-spinner
        :animation-duration="1200"
        :size="80"
        color="#1A237E"
      />
    </div>
    <template v-else>
      <v-container class="card-container">
        <CouponTicket
          v-for="ticket in tickets"
          :key="ticket.id"
          :ticket="ticket"
        />
      </v-container>
    </template>
  </v-container>
</template>

<script>
import CouponTicket from "./../components/CouponTicket.vue";
import { Toast } from "./../utils/helper";
import Papa from "papaparse";
import { HalfCircleSpinner } from "epic-spinners";

const CouponURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT54r-aPFDVkBm3KfUCm3C1N6kwcAN7fVqFzsUc2IKShjEpO3TQjKPKY2zUbkeQkQD6OaQ56CyR0ECC/pub?gid=1432926202&single=true&output=csv";

const OtherCouponURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT54r-aPFDVkBm3KfUCm3C1N6kwcAN7fVqFzsUc2IKShjEpO3TQjKPKY2zUbkeQkQD6OaQ56CyR0ECC/pub?gid=1353915558&single=true&output=csv";

export default {
  name: "Coupon",
  components: {
    CouponTicket,
    HalfCircleSpinner,
  },
  created() {
    this.fetchTickets();
    this.fetchOther();
  },
  data: () => ({
    tickets: [],
    ticketCode: "",
    otherTickets: [],
    status: {
      isLoading: true
    }
  }),
  methods: {
    fetchTickets() {
      // this.tickets = dummyTickets
      Papa.parse(CouponURL, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          results.data.forEach((item) => {
            let discount = null;
            if (item.discountType === "divide") {
              discount = function (price) {
                return price * item.discount;
              };
            } else if (item.discountType === "minus") {
              discount = function (price) {
                return price - item.discount;
              };
            } else {
              discount = function (price, fee) {
                return price - fee;
              };
            }
            this.tickets.push({
              id: item.id,
              name: item.name,
              type: item.type === "無" ? "" : item.type,
              minimum: item.minimum,
              code: item.code,
              limitDate: item.limitDate,
              function: discount,
            });
          });
          this.status.isLoading = false
        },
      });
    },
    fetchOther() {
      Papa.parse(OtherCouponURL, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          this.otherTickets = results.data;
        },
      });
    },
    addTicket() {
      let ticket = this.otherTickets.find(
        (ticket) => ticket.code === this.ticketCode
      );
      if (ticket) {
        let discount = null;
        if (ticket.discountType === "divide") {
          discount = function (price) {
            return price * ticket.discount;
          };
        } else if (ticket.discountType === "minus") {
          discount = function (price) {
            return price - ticket.discount;
          };
        } else {
          discount = function (price, fee) {
            return price - fee;
          };
        }
        this.tickets.push({
          id: ticket.id,
          name: ticket.name,
          type: ticket.type === "無" ? "" : ticket.type,
          minimum: ticket.minimum,
          code: ticket.code,
          limitDate: ticket.limitDate,
          function: discount,
        });
        Toast.fire({
          icon: "success",
          title: `新增優惠卷－${ticket.name}`,
        });
        this.ticketCode = "";
      } else {
        Toast.fire({
          icon: "error",
          title: "優惠卷不存在",
        });
      }
    },
  },
};
</script>

<style scoped>
.card-container {
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  grid-gap: 10px 30px;
}

.loading-box {
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>