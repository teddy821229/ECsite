<template>
  <v-container>
    <v-sheet
      elevation="8"
      class="
        text-h5
        font-weight-bold
        text-center
        py-3
        indigo
        white--text
        my-3
        mx-auto
      "
      max-width="1200"
    >
      結帳
    </v-sheet>

    <v-sheet max-width="1200" class="mx-auto my-6">
      <v-stepper v-model="nowStep">
        <v-stepper-header>
          <v-stepper-step :complete="nowStep > 1" step="1">
            商品確認
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="nowStep > 2" step="2">
            基本資料
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="nowStep > 3" step="3">
            付款資訊
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-form @submit.prevent.stop="handleSubmit">
            <!-- 商品確認 -->
            <v-stepper-content step="1">
              <v-card elevation="0">
                <div class="text-h6 mb-4" v-show="itemInCart.length >= 1">
                  確認商品
                </div>
                <v-list class="py-0">
                  <!-- v-for -->
                  <v-list-item
                    v-for="item in itemInCart"
                    :key="item.id"
                    class="item-card py-4"
                  >
                    <v-img
                      :src="
                        item.Item.image ||
                        `https://picsum.photos/id/${12 + item.Item.id}/500/300`
                      "
                      class="rounded mr-6"
                    >
                    </v-img>

                    <div class="text-subtitle nowrap">
                      {{ item.Item.name }}
                    </div>

                    <v-list-item-content class="nowrap">{{
                      item.Item.price | moneyFilter
                    }}</v-list-item-content>

                    <v-sheet width="120px">
                      <v-text-field
                        hide-details
                        class="text-subtitle pa-0 ma-0"
                        v-model.number="item.quantity"
                        type="number"
                        @blur="checkQuantity(item.id)"
                        outlined
                        dense
                      >
                        <v-icon
                          slot="append"
                          color="grey"
                          class="button mt-1"
                          @click="addQuantity(item.id)"
                          small
                          >mdi-plus</v-icon
                        >
                        <v-icon
                          slot="prepend-inner"
                          color="grey"
                          class="button mt-1"
                          @click="minusQuantity(item.id)"
                          small
                          >mdi-minus</v-icon
                        >
                      </v-text-field>
                    </v-sheet>

                    <div class="text-h6 font-weight-black text-end">
                      {{ (item.quantity * item.Item.price) | moneyFilter }}
                    </div>
                  </v-list-item>

                  <v-container v-show="itemInCart.length < 1">
                    <v-sheet
                      height="200"
                      class="d-flex flex-column justify-center align-center"
                    >
                      <p class="noLikes text-h6 grey--text">
                        還沒有選購任何商品唷，快去逛逛吧！
                      </p>
                      <v-btn
                        outlined
                        width="140px"
                        class="mt-2 py-5 indigo white--text"
                        :to="{
                          name: 'products',
                          query: {
                            filterId: 1,
                            seriesId: 'all',
                            keyword: '',
                          },
                        }"
                      >
                        前往商品列表
                      </v-btn>
                    </v-sheet>
                  </v-container>
                </v-list>
              </v-card>

              <template v-if="itemInCart.length >= 1">
                <v-divider class="my-8"></v-divider>
                <v-sheet>
                  <div class="text-h6 mb-4">選擇運送方式</div>
                  <v-radio-group v-model="selectDelivery" class="ml-3">
                    <v-container>
                      <v-sheet
                        v-for="delivery in deliveries"
                        :key="delivery.id"
                        class="d-flex align-center"
                      >
                        <v-radio
                          class="mr-5 my-0"
                          :value="delivery.id"
                        ></v-radio>
                        <v-card
                          min-width="450px"
                          class="text-h5 font-weight-bold"
                          elevation="0"
                        >
                          {{ delivery.name }} :
                          {{ delivery.fee | moneyFilter }}
                          <span class="text-h6 grey--text ml-2"
                            >目前僅提供宅配，請見諒！</span
                          >
                        </v-card>
                      </v-sheet>
                    </v-container>
                  </v-radio-group>
                </v-sheet>
              </template>

              <template v-if="itemInCart.length >= 1">
                <v-divider class="my-8"></v-divider>
                <v-sheet>
                  <div class="text-h6 mb-4">選擇折價券</div>
                  <v-radio-group v-model="selectTicket">
                    <v-container class="card-container">
                      <v-sheet
                        v-for="ticket in couponTicket"
                        :key="ticket.id"
                        class="d-flex align-center"
                      >
                        <v-radio
                          class="mr-5"
                          :value="ticket"
                          :disabled="totalAmount < ticket.minimum"
                        ></v-radio>
                        <CouponTicket :ticket="ticket" min-width="450px" />
                      </v-sheet>
                      <v-sheet class="d-flex align-center">
                        <v-radio class="mr-5 pt-5" value="pass"></v-radio>
                        <v-card
                          min-width="450px"
                          class="text-h5 grey--text pt-4"
                          elevation="0"
                        >
                          這次不使用優惠券
                        </v-card>
                      </v-sheet>
                    </v-container>
                  </v-radio-group>
                </v-sheet>
              </template>

              <v-divider class="my-8"></v-divider>
              <div class="actions d-flex align-center mb-3">
                <v-spacer></v-spacer>
                <div class="text-h6">
                  總金額：
                  <span
                    :class="{
                      'text-decoration-line-through': selectTicket !== 'pass',
                    }"
                    >{{ totalAmount | moneyFilter }}</span
                  >
                </div>
                <span
                  v-if="selectTicket !== 'pass'"
                  class="text-h6 ml-4 red--text"
                >
                  {{ fianlPrice | moneyFilter }}
                </span>
                <v-btn
                  color="indigo white--text"
                  @click="nextStep"
                  class="ml-10"
                  :disabled="itemInCart.length < 1"
                >
                  下一步
                </v-btn>
              </div>
            </v-stepper-content>

            <!-- 基本資料確認 -->

            <v-stepper-content step="2">
              <v-sheet class="mb-12">
                <v-text-field
                  label="收件人姓名"
                  required
                  :rules="noEmptyRule"
                  v-model="user.name"
                  validate-on-blur
                ></v-text-field>
                <v-text-field
                  label="收件人地址"
                  required
                  :rules="noEmptyRule"
                  v-model="user.address"
                  validate-on-blur
                ></v-text-field>
                <v-text-field
                  label="電話"
                  type="number"
                  required
                  :rules="noEmptyRule"
                  v-model="user.phone"
                  validate-on-blur
                ></v-text-field>
                <v-text-field
                  label="信箱"
                  type="email"
                  :rules="emailRules"
                  required
                  v-model="user.email"
                  validate-on-blur
                ></v-text-field>
              </v-sheet>

              <div class="actions d-flex mb-3">
                <v-spacer></v-spacer>
                <div class="text-h6">
                  總金額：
                  <span
                    :class="{
                      'text-decoration-line-through': selectTicket !== 'pass',
                    }"
                    >{{ totalAmount | moneyFilter }}</span
                  >
                </div>
                <span
                  v-if="selectTicket !== 'pass'"
                  class="text-h6 ml-4 red--text"
                >
                  {{ fianlPrice | moneyFilter }}
                </span>
                <v-btn color="indigo" text @click="preStep" class="mx-3">
                  上一步
                </v-btn>
                <v-btn
                  color="indigo white--text"
                  @click="nextStep"
                  :disabled="completeData"
                >
                  下一步
                </v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-sheet class="mb-12">
                <v-text-field
                  label="卡號"
                  required
                  :rules="[
                        (v) => !!v || '此欄為必填',
                        (v) => v.length === 16 || '請正確輸入16碼卡號',
                      ]"
                  v-model="user.Card.number"
                  maxlength="16"
                  validate-on-blur
                ></v-text-field>

                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="user.Card.validDate"
                      label="有效期限"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="noEmptyRule"
                      validate-on-blur
                    ></v-text-field>
                  </template>

                  <v-date-picker
                    no-title
                    v-model="user.Card.validDate"
                    
                    type="month"
                    @change="save"
                  ></v-date-picker>
                </v-menu>

                <v-text-field
                  label="cvv"
                  type="password"
                  required
                  :rules="[
                    (v) => !!v || '此欄為必填',
                    (v) => v.length === 3 || 'cvv必為三碼',
                  ]"
                  v-model="user.Card.cvv"
                  maxlength="3"
                  validate-on-blur
                ></v-text-field>
              </v-sheet>

              <div class="actions d-flex mb-3">
                <v-spacer></v-spacer>
                <div class="text-h6">
                  總金額：
                  <span
                    :class="{
                      'text-decoration-line-through': selectTicket !== 'pass',
                    }"
                    >{{ totalAmount | moneyFilter }}</span
                  >
                </div>
                <span
                  v-if="selectTicket !== 'pass'"
                  class="text-h6 ml-4 red--text"
                >
                  {{ fianlPrice | moneyFilter }}
                </span>

                <v-btn color="indigo" text @click="preStep" class="mx-3">
                  上一步
                </v-btn>
                <v-btn
                  color="indigo white--text"
                  type="submit"
                  :disabled="completeData"
                >
                  付款
                </v-btn>
              </div>
            </v-stepper-content>
          </v-form>

          <v-stepper-content step="4">
            <v-card
              class="my-6 d-flex flex-column justify-space-between"
              height="200px"
              elevation="0"
            >
              <v-card-title class="justify-center text-h4 font-weight-black">
                完成購物
              </v-card-title>
              <div class="actions d-flex">
                <v-spacer></v-spacer>
                <v-btn
                  color="indigo"
                  text
                  class="mr-3"
                  :to="{
                    name: 'products',
                    query: {
                      filterId: 1,
                      seriesId: 'all',
                      keyword: '',
                    },
                  }"
                >
                  繼續購物
                </v-btn>
                <v-btn color="indigo white--text" to="/member/history">
                  查看訂單
                </v-btn>
                <v-spacer></v-spacer>
              </div>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-sheet>
  </v-container>
</template>

<script>
import CouponTicket from "./../components/CouponTicket.vue";

// TODO: use mapState to GET cart items
import { moneyFilter } from "./../utils/mixins";
import { mapState } from "vuex";
import Swal from "sweetalert2";
import { Toast } from '../utils/helper';
import {v4 as uuidv4} from 'uuid'

const dummyTickets = [
  {
    id: 1,
    name: "滿1000折100",
    type: "",
    minimum: 1000,
    limitDate: "無限期使用",
    code: "467AABAA",
    function: function (price) {
      if (price >= 1000) {
        return price - 100;
      }
      return;
    },
  },
  {
    id: 2,
    name: "89折，低消須達到2000",
    type: "",
    minimum: 2000,
    limitDate: "2021/09/09",
    code: "89898989",
    function: function (price) {
      if (price >= 2000) {
        return Math.floor(price * 0.89);
      }
      return;
    },
  },
  {
    id: 3,
    name: "免運費，低消須達到1200",
    type: "",
    minimum: 1200,
    code: "467AABAA",
    limitDate: "2021/10/10",
    function: function (price, fee) {
      if (price >= 1200) {
        return price - fee;
      }
      return;
    },
  },
  {
    id: 4,
    name: "無條件100元折價",
    type: "新會員福利",
    minimum: 0,
    code: "467AABAA",
    limitDate: "無限期使用",
    function: function (price) {
      return price - 100;
    },
  },
  {
    id: 5,
    name: "滿1000元享200元折價",
    type: "新會員福利",
    minimum: 1000,
    code: "467AABAA",
    limitDate: "無限期使用",
    function: function (price) {
      return price - 200;
    },
  },
];

export default {
  name: "Checkout",
  mixins: [moneyFilter],
  components: {
    CouponTicket,
  },
  data: () => ({
    nowStep: 1,
    menu: false,

    user: {
      name: "",
      address: "",
      phone: "",
      email: "",
      Card: {
        number: "",
        validDate: "",
        cvv: "",
      },
    },
    deliveries: [
      {
        id: 1,
        name: "宅配",
        fee: 100,
      },
    ],
    selectDelivery: 1,
    noEmptyRule: [(v) => !!v || "此欄為必填"],
    emailRules: [
      (v) => !!v || "信箱不能空白",
      (v) => /.+@.+/.test(v) || "信箱格式不正確",
    ],

    couponTicket: [],
    selectTicket: "pass",
  }),
  created() {
    this.fetchTickets();
  },
  watch: {
    totalAmount(newValue) {
      if(newValue <= this.selectTicket.minimum && this.nowStep === 1) {
        this.selectTicket = 'pass'
        Toast.fire({
          icon: 'warning',
          title: '優惠資格不符，請重新選擇優惠卷。'
        })
      }
    }
  },
  methods: {
    fetchTickets() {
      this.couponTicket = dummyTickets;
    },
    nextStep() {
      if (
        this.nowStep === 1 &&
        this.selectTicket === "pass" &&
        this.avaliableTicket
      ) {
        Swal.fire({
          title: "有可以使用的優惠卷，確定不使用嗎？",
          icon: "warning",
          showCancelButton: true,
          cancelButtonColor: "#aaa",
          confirmButtonText: "確定",
        }).then((result) => {
          if (result.isConfirmed) {
            this.nowStep += 1;
          }
        });
        return;
      }
      this.nowStep += 1;
    },
    preStep() {
      this.nowStep -= 1;
    },
    handleSubmit() {

      const { name, address, phone, email, Card } = this.user;
      const delivery = this.deliveries.find(delivery => delivery.id === this.selectDelivery)
      // after SUCCESS
      this.nowStep += 1;
      const order = {
        id: uuidv4(),
        User: {
          name,
          address,
          phone,
          email,
          Card,
        },
        delivery,
        couponTicket: this.selectTicket,
        Products : []
      }

      this.itemInCart.forEach(item => order.Products.push({
        id: item.Item.id,
        image: item.Item.image,
        name: item.Item.name,
        price: item.Item.price,
        quantity: item.quantity
      }))

      console.log('order', order);
      this.$store.commit('cleanCartItem')
    },
    addQuantity(id) {
      const target = this.itemInCart.find((item) => item.id === id);
      if (target.quantity === target.Item.stock) {
        return;
      }
      target.quantity += 1;
      this.$store.commit("setCartItem", target);
    },
    minusQuantity(id) {
      const target = this.itemInCart.find((item) => item.id === id);
      if (target.quantity === 1) {
        Swal.fire({
          title: "確定要移除商品嗎？",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#D76972",
          cancelButtonColor: "#aaa",
          confirmButtonText: "確定",
          toast: true,
          position: "top-end",
        }).then((result) => {
          if (result.isConfirmed) {
            this.$store.commit("removeCartItem", target);
          }
        });
        return;
      }
      target.quantity -= 1;
      this.$store.commit("setCartItem", target);
    },
    checkQuantity(id) {
      const target = this.itemInCart.find((item) => item.id === id);
      if (target.quantity > target.Item.stock) {
        target.quantity = target.Item.stock;
      }
      if (target.quantity < 0) {
        target.quantity = 1;
      }
      if (target.quantity === 0) {
        Swal.fire({
          title: "確定要移除商品嗎？",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#D76972",
          cancelButtonColor: "#aaa",
          confirmButtonText: "確定",
          toast: true,
          position: "top-end",
        }).then((result) => {
          if (result.isConfirmed) {
            this.$store.commit("removeCartItem", target);
          } else {
            target.quantity = 1;
          }
        });
        return;
      }
      this.$store.commit("setCartItem", target);
    },
    save(date) {
      this.$refs.menu.save(date);
    },
  },
  computed: {
    totalAmount() {
      let price = 0;
      this.itemInCart.forEach(
        (item) => (price += item.Item.price * item.quantity)
      );
      return price;
    },
    fianlPrice() {
      let beforeCoupon = this.totalAmount;
      let fee = 100;

      if (this.selectTicket !== "pass") {
        return this.selectTicket.function(beforeCoupon, fee);
      }
      return beforeCoupon;
    },
    ...mapState(["itemInCart"]),
    avaliableTicket() {
      return this.couponTicket.some(
        (ticket) => ticket.minimum <= this.totalAmount
      );
    },
    completeData() {
      const { name, address, phone, email, Card } = this.user;
      const { number, validDate, cvv } = Card;
      if (this.nowStep === 2) {
        return name.trim() && address.trim() && phone.trim() && email.trim()
          ? false
          : true;
      }
      if (this.nowStep === 3) {
        return number.length === 16 && validDate.trim() && cvv.length === 3 ? false : true;
      }
      return true;
    },
  },
  filters: {
    // cardNumber(number) {
    // }
  },
};
</script>

<style scoped>
.item-card {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
}

.item-card::after {
  display: none;
}

.card-container {
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 10px 30px;
}
</style>