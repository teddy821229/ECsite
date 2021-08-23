<template>
  <v-container>
    <v-sheet
      elevation="8"
      class="text-h5 font-weight-bold text-center py-3 indigo white--text my-3 mx-auto"
      max-width="1200"
    >
      會員登入
    </v-sheet>
    <v-sheet elevation="8" class="py-8 mx-auto" max-width="1200">
      <v-sheet max-width="600px" class="mx-auto">
        <v-form class="px-10 py-6" v-model="valid" @submit.prevent.stop="handleLogin">
          <v-text-field
            v-model="account"
            label="帳號"
            placeholder="請輸入帳號"
            :rules="notEmpty"
          >
          </v-text-field>
          <v-text-field
            v-model="password"
            label="密碼"
            placeholder="請輸入密碼"
            hint="密碼應大於8碼"
            :rules="notEmpty"
            :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
            :type="passwordShow ? 'text' : 'password'"
            @click:append="passwordShow = !passwordShow"
          >
          </v-text-field>
          <div class="actions d-flex mt-8">
            <v-spacer></v-spacer>
            <v-btn
              color="indigo"
              text
              to="/register"
              class="mr-6"
            >
              註冊
            </v-btn>
            <v-btn
              color="indigo white--text"
              type="submit"
              :disabled="!valid"
            >登入</v-btn>
          </div>
        </v-form>
      </v-sheet>
    </v-sheet>
  </v-container>
</template>

<script>
import { Toast } from './../utils/helper'

const dummyUser = {
  id: 666,
  name: 'Teddy',
  account: 'teddy0323',
  password: '12345678'
}

export default {
  name: "Login",
  data: () => ({
    valid: false,
    account: "",
    password: "",
    passwordShow: false,
    notEmpty: [(v) => !!v || "請填寫欄位"],
  }),
  methods: {
    handleLogin() {
      if(this.account !== dummyUser.account || this.password !== dummyUser.password) {
        Toast.fire({
          icon: 'error',
          title: '帳號或密碼錯誤。'
        })
        return
      }
      Toast.fire({
        icon: 'success',
        title: '登入成功'
      })

      const userData = {
        id: dummyUser.id,
        name: dummyUser.name,
        account: dummyUser.account
      }

      localStorage.setItem('currentUser', JSON.stringify(userData))
      this.$store.commit('setCurrentUser', userData)
      this.$router.push('/home')
    }
  }
};
</script>

<style scoped>
</style>