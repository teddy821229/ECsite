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
    <v-container class="card-container">
      <CouponTicket v-for="ticket in tickets" :key="ticket.id" :ticket="ticket" />
    </v-container>
  </v-container>
</template>

<script>
import CouponTicket from "./../components/CouponTicket.vue";
import { Toast } from './../utils/helper'

const dummyTickets = [
  {
    id: 1,
    name: '滿1000折100',
    type:'',
    minimum: 1000,
    limitDate: '無限期使用',
    code: '467AABAA',
    function: function(price) {
      if(price >= 1000) {
        return price - 100
      }
      return
    }
  },
  {
    id: 2,
    name: '89折，低消須達到2000',
    type:'',
    minimum: 2000,
    limitDate: '2021/09/09',
    code: '89898989',
    function: function(price) {
      if(price >= 2000) {
        return Math.floor(price * .89)
      }
      return
    }
  },
  {
    id: 3,
    name: '免運費，低消須達到1200',
    type:'',
    minimum: 1200,
    code: '467AABAA',
    limitDate: '2021/10/10',
    function: function(price, fee) {
      if(price >= 1200) {
        return price - fee
      }
      return
    }
  },
  {
    id: 4,
    name: '無條件100元折價',
    type:'新會員福利',
    minimum: 0,
    code: '467AABAA',
    limitDate: '無限期使用',
    function: function(price) {
      return price - 100
    }
  },
  {
    id: 5,
    name: '滿1000元享200元折價',
    type:'新會員福利',
    minimum: 1000,
    code: '467AABAA',
    limitDate: '無限期使用',
    function: function(price) {
      return price - 100
    }
  }
]

const otherTickets = [
  {
    id: 13,
    name: '滿千折百',
    type:'夏季限定',
    minimum: 1000,
    code: 'SUM1000D',
    limitDate: '2021/08/31',
    function: function(price) {
      return price - 100
    }
  },
  {
    id: 15,
    name: '無條件免運費',
    type:'夏季限定',
    minimum: 0,
    code: 'SUMFREEF',
    limitDate: '無限期使用',
    function: function(price, fee) {
      return price - fee
    }
  }
]

export default {
  name: "Coupon",
  components: {
    CouponTicket,
  },
  created() {
    this.fetchTickets()
  },
  data: () => ({
    tickets: [],
    ticketCode: ''
  }),
  methods: {
    fetchTickets() {
      this.tickets = dummyTickets
    },
    addTicket() {
      let ticket = otherTickets.find(ticket => ticket.code === this.ticketCode)
      if(ticket) {
        this.tickets.push(ticket)
        Toast.fire({
          icon: 'success',
          title: `新增優惠卷－${ticket.name}`
        })
        this.ticketCode = ''
      } else {
        Toast.fire({
          icon: 'error',
          title: '優惠卷不存在'
        })
      }
    }
  }
};
</script>

<style scoped>
.card-container {
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  grid-gap: 10px 30px;
}
</style>