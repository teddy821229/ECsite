<template>
  <v-container>
    <v-sheet
      elevation="8"
      class="text-h5 font-weight-bold text-center py-3 indigo white--text my-3"
    >
      結帳
    </v-sheet>

    <v-sheet>
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
                <v-list class="py-0">
                  <!-- v-for -->
                  <v-list-item
                    v-for="item in items"
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

                    <v-list-item-content class="nowrap"
                      >$ {{ item.Item.price }}</v-list-item-content
                    >

                    <v-sheet width="120px">
                      <v-text-field
                        hide-details
                        class="text-subtitle pa-0 ma-0"
                        v-model="item.quantity"
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
                      $ {{ item.quantity * item.Item.price }}
                    </div>
                  </v-list-item>
                </v-list>
              </v-card>

              <v-divider class="my-8"></v-divider>

              <div class="actions d-flex align-center">
                <v-spacer></v-spacer>
                <div class="totalAmount text-h6 mr-10">
                  總金額： {{ totalAmount }}
                </div>
                <v-btn color="indigo white--text" @click="nextStep">
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
                ></v-text-field>
                <v-text-field
                  label="收件人地址"
                  required
                  :rules="noEmptyRule"
                  v-model="user.address"
                ></v-text-field>
                <v-text-field
                  label="電話"
                  type="number"
                  required
                  :rules="noEmptyRule"
                  v-model="user.phone"
                ></v-text-field>
                <v-text-field
                  label="信箱"
                  type="email"
                  :rules="emailRules"
                  required
                  v-model="user.email"
                ></v-text-field>
              </v-sheet>

              <div class="actions d-flex">
                <v-spacer></v-spacer>
                <v-btn color="indigo" text @click="preStep" class="mr-3">
                  上一步
                </v-btn>
                <v-btn color="indigo white--text" @click="nextStep">
                  下一步
                </v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content step="3">
              <v-sheet class="mb-12">
                <v-text-field
                  label="卡號"
                  required
                  :rules="noEmptyRule"
                  v-model="user.Card.number"
                  maxlength="16"
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
                      :rules="noEmptyRule"
                      v-bind="attrs"
                      v-on="on"
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
                  :rules="noEmptyRule"
                  v-model="user.Card.cvv"
                  maxlength="3"
                ></v-text-field>
              </v-sheet>

              <div class="actions d-flex">
                <div class="totalAmount text-h6 mr-10">
                  總金額： {{ totalAmount }}
                </div>
                <v-spacer></v-spacer>

                <v-btn color="indigo" text @click="preStep" class="mr-3">
                  上一步
                </v-btn>
                <v-btn color="indigo white--text" type="submit"> 付款 </v-btn>
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
                <v-btn color="indigo" text class="mr-3" to="/products">
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
// TODO: use mapState to GET cart items

export default {
  name: "Checkout",
  data: () => ({
    nowStep: 1,
    menu: false,
    items: [
      {
        id: 1,
        Item: {
          id: 3,
          name: "Dimmo",
          image: "",
          price: 350,
          stock: 23,
        },
        quantity: 4,
      },
      {
        id: 2,
        Item: {
          id: 6,
          name: "LULU豬",
          image: "",
          price: 375,
          stock: 56,
        },
        quantity: 2,
      },
    ],
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
    noEmptyRule: [(v) => !!v || "此欄為必填"],
    emailRules: [
      (v) => !!v || "信箱不能空白",
      (v) => /.+@.+/.test(v) || "信箱格式不正確",
    ],
  }),
  methods: {
    nextStep() {
      this.nowStep += 1;
    },
    preStep() {
      this.nowStep -= 1;
    },
    handleSubmit() {
      // after SUCCESS
      this.nowStep += 1;
      console.log(this.nowStep);
    },
    addQuantity(id) {
      let target = this.items.find((item) => item.id === id);
      if (target.quantity === target.Item.stock) {
        return;
      }
      target.quantity += 1;
    },
    minusQuantity(id) {
      let target = this.items.find((item) => item.id === id);
      if (target.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        return;
      }
      target.quantity -= 1;
    },
    checkQuantity(id) {
      let target = this.items.find((item) => item.id === id);
      if (target.quantity > target.Item.stock) {
        target.quantity = target.Item.stock;
      }
    },
    save(date) {
      this.$refs.menu.save(date);
    },
  },
  computed: {
    totalAmount() {
      let price = 0;
      this.items.forEach((item) => (price += item.Item.price * item.quantity));
      return price;
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
</style>