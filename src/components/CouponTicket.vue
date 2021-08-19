<template>
  <v-hover v-slot="{ hover }">
    <v-card 
      class="card my-2 d-flex align-center"
      :elevation="hover ? 8 : 4 "
      :class="{moveY: hover}"
    >
      <v-container class="icon-container py-7 ma-0 indigo">
        <v-icon x-large color="white"> mdi-ticket-percent-outline </v-icon>
      </v-container>

      <v-container class="py-0">
        <v-card-title>{{ ticket.name }} </v-card-title>
        <v-card-subtitle>使用期限： {{ ticket.limitDate }}</v-card-subtitle>
      </v-container>
      <div class="type-label amber white--text pa-1 rounded" v-if="ticket.type">
        {{ ticket.type }}
      </div>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    ticket: {
      type: Object,
      default: () => ({}),
    },
  },
  name: "CouponTicket",
};
</script>

<style scoped>
.moveY {
  transform: translateY(-5px);
}

.card {
  position: relative;
  width: 100%;
  max-width: 450px;
}

.card::after {
  content: "";
  height: 100%;
  width: 0;

  position: absolute;
  top: 0;
  left: -4px;

  border-left: 8px dotted #fff;
  background-color: transparent;
}

.icon-container {
  width: 30%;
  text-align: center;
}

.type-label {
  position: absolute;
  top: -12px;
  left: 0;

  transform: rotate(0.9turn) translateX(-30%);
  background: #fff;
  z-index: 1;

  font-size: 0.5rem;
}
</style>