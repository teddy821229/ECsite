<template>
  <v-container class="pb-8">
    <v-sheet
      elevation="8"
      class="text-h5 font-weight-bold text-center py-3 indigo white--text my-3 mx-auto"
      max-width="1200"
    >
      會員註冊
    </v-sheet>

    <v-sheet elevation="8" class="py-8 mx-auto" max-width="1200">
      <v-sheet max-width="600px" class="mx-auto">
        <v-form
          class="px-10 py-6"
          v-model="valid"
          @submit.prevent.stop="handleSubmit"
        >
          <div class="text-h6">帳號資料</div>
          <v-divider class="mt-4 mb-6"></v-divider>
          <v-text-field
            v-model="account"
            label="帳號"
            placeholder="請輸入帳號"
            :rules="emptyRules"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="password"
            label="密碼"
            :rules="passwordRules"
            placeholder="請輸入密碼"
            hint="密碼應大於8碼"
            :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
            :type="passwordShow ? 'text' : 'password'"
            @click:append="passwordShow = !passwordShow"
            required
          >
          </v-text-field>

          <v-text-field
            v-model="passwordCheck"
            label="密碼確認"
            :rules="passwordCheckRules"
            :append-icon="passwordCheckShow ? 'mdi-eye' : 'mdi-eye-off'"
            :type="passwordCheckShow ? 'text' : 'password'"
            @click:append="passwordCheckShow = !passwordCheckShow"
            required
          >
          </v-text-field>

          <div class="text-h6 mt-10">基本資料</div>
           <v-divider class="mt-4 mb-6"></v-divider>
          <v-text-field
            v-model="name"
            label="姓名："
            :rules="emptyRules"
            clearable
            required
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
                v-model="birthday"
                label="生日："
                readonly
                :rules="emptyRules"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>

            <v-date-picker
              no-title
              v-model="birthday"
              active-picker="YEAR"
              :max="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              min="1950-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>

          <v-select
            v-model="sex"
            :items="sexChoices"
            :rules="emptyRules"
            label="性別："
          ></v-select>

          <v-text-field
            v-model="phone"
            label="手機號碼"
            :rules="emptyRules"
            clearable
          ></v-text-field>

          <v-text-field
            v-model="email"
            label="電子信箱："
            :rules="emailRules"
            clearable
            required
          ></v-text-field>

          <div class="actions d-flex mt-8">
            <v-spacer></v-spacer>
            <v-btn color="indigo white--text" type="submit" :disabled="!valid"
              >註冊</v-btn
            >
          </div>
        </v-form>
      </v-sheet>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: "Register",
  data: () => ({
    valid: false,
    check: false,
    menu: "",
    // user Data
    account: "",
    password: "",
    passwordCheck: "",
    name: "",
    sex: "",
    birthday: "",
    phone: "",
    address: "",
    email: "",
    // status Data
    passwordShow: false,
    passwordCheckShow: false,

    Rules: {
      notEmpty: (v) => !!v || "請填寫欄位",
      email: (v) => /.+@.+/.test(v) || "信箱格式不正確",
      passwordLength: (v) => v.length >= 8 || '密碼需大於8碼'
    },
    sexChoices: ["生理男", "生理女", "不透露"],
  }),
  methods: {
    handleSubmit() {
      this.check = true;
      if(!this.valid) {
        console.log('資料錯誤，請重新檢查');
        return
      }
      const user = {
        account: this.account,
        password: this.password,
        name: this.name,
        sex: this.sex,
        birthday: this.birthday,
        phone: this.phone,
        address: this.address,
        email: this.email
      }

      console.log("user", user);
    },
    save(date) {
      this.$refs.menu.save(date);
    },
  },
  computed: {
    passwordRules() {
      if (!this.check) {
        return [];
      }
      return [
        this.Rules.notEmpty,
        this.Rules.passwordLength,
      ];
    },
    passwordCheckRules() {
      if (!this.check) {
        return [];
      }
      return [
        this.Rules.notEmpty,
        this.Rules.passwordLength,
        () => this.password === this.passwordCheck || "密碼不相同",
      ];
    },
    emailRules() {
      if (!this.check) {
        return [];
      }
      return [this.Rules.notEmpty, this.Rules.email];
    },
    emptyRules() {
      if (!this.check) {
        return [];
      }
      return [this.Rules.notEmpty];
    },
  },
};
</script>

<style scoped>
</style>