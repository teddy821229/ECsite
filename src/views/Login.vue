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
import Papa from 'papaparse'

const UserURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT54r-aPFDVkBm3KfUCm3C1N6kwcAN7fVqFzsUc2IKShjEpO3TQjKPKY2zUbkeQkQD6OaQ56CyR0ECC/pub?gid=1020618966&single=true&output=csv";


export default {
  name: "Login",
  data: () => ({
    valid: false,
    account: "",
    password: "",
    passwordShow: false,
    notEmpty: [(v) => !!v || "請填寫欄位"],
    userList: []
  }),
  created() {
    this.fetchDummyUser()
  },
  methods: {
    fetchDummyUser() {
      Papa.parse(UserURL, {
        download: true,
        header: true,
        complete: (results) => {
          results.data.forEach(user => {
            this.userList.push({
              id: user.id,
              account: user.account,
              password: user.password,
              name: user.username
            })
          })
        }
      })
    },
    handleLogin() {
      const findUser = this.userList.some(user => user.account === this.account)
      if(!findUser) {
        Toast.fire({
          icon: 'error',
          title: '帳號不存在'
        })
        return
      }
      const targetuser = this.userList.find(user => user.account === this.account)
      if(findUser && targetuser.password !== this.password) {
        Toast.fire({
          icon: 'error',
          title: '密碼錯誤，請再確認一次！'
        })
        return
      }

      Toast.fire({
        icon: 'success',
        title: '登入成功'
      })

      const userData = {
        id: targetuser.id,
        name: targetuser.username,
        account: targetuser.account
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