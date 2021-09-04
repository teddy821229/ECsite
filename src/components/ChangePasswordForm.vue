<template>
  <v-container>
    <v-sheet evelation="8">
      <div v-if="status.isLoading" class="loading-box">
        <half-circle-spinner
          :animation-duration="1200"
          :size="80"
          color="#1A237E"
        />
      </div>
      <template v-else>
        <v-form ref="form" @submit.prevent.stop="handleSubmit" v-model="valid">
          <v-text-field
            v-model="presentPasswordCheck"
            required
            :rules="presentPasswordRule"
            label="舊密碼："
            :append-icon="show.present ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show.present ? 'text' : 'password'"
            @click:append="show.present = !show.present"
          ></v-text-field>

          <v-text-field
            v-model="newPassword"
            label="新密碼："
            :rules="newPasswordRule"
            clearable
            required
            :append-icon="show.new ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show.new ? 'text' : 'password'"
            @click:append="show.new = !show.new"
            hint="最少8個字，大小寫數字不限制"
          ></v-text-field>

          <v-text-field
            v-model="newPasswordCheck"
            label="確認新密碼："
            :rules="newPasswordRule"
            clearable
            required
            :append-icon="show.newCheck ? 'mdi-eye-off' : 'mdi-eye-off'"
            :type="show.newCheck ? 'text' : 'password'"
            @click:append="show.newCheck = !show.newCheck"
          ></v-text-field>

          <v-row class="my-3">
            <v-spacer></v-spacer>
            <v-btn
              :disabled="notEmpty"
              color="primary"
              class="mr-4"
              type="submit"
            >
              修改密碼
            </v-btn>
          </v-row>
        </v-form>
      </template>
    </v-sheet>
  </v-container>
</template>

<script>
import { Toast } from "./../utils/helper";
import { HalfCircleSpinner } from "epic-spinners";
import Papa from 'papaparse'

const UserURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT54r-aPFDVkBm3KfUCm3C1N6kwcAN7fVqFzsUc2IKShjEpO3TQjKPKY2zUbkeQkQD6OaQ56CyR0ECC/pub?gid=1020618966&single=true&output=csv";


export default {
  name: "ChangePasswordForm",
  components: {
    HalfCircleSpinner,
  },
  data: () => ({
    valid: false,
    check: false,
    presentPassword: "",
    presentPasswordCheck: "",
    newPassword: "",
    newPasswordCheck: "",
    show: {
      present: false,
      new: false,
      newCheck: false,
    },
    status: {
      isLoading: true,
    },
  }),
  watch: {
    presentPasswordCheck() {
      this.check = false;
    },
  },
  created() {
    this.fetchUser(666)
  },
  methods: {
    fetchUser(id) {
      Papa.parse(UserURL, {
        download: true,
        header: true,
        complete: (results) => {
          const user = results.data.find((user) => user.id == id);
          this.presentPassword = user.password
          this.status.isLoading = false
        },
      });
    },
    toggleCheck() {
      this.check = true;
    },
    handleSubmit() {
      this.toggleCheck();
      if (!this.valid) {
        Toast.fire({
          icon: "error",
          title: "資料有誤，修改失敗",
        });
        return;
      }
      Toast.fire({
        icon: 'success',
        title: '修改成功'
      })
      this.presentPasswordCheck = ''
      this.newPassword = ''
      this.newPasswordCheck = ''
    },
  },
  computed: {
    presentPasswordRule() {
      if (!this.check) {
        return [];
      }
      return [
        () => this.presentPasswordCheck === this.presentPassword || "密碼錯誤",
      ];
    },
    newPasswordRule() {
      if (!this.check) {
        return [];
      }

      return [
        () => this.newPassword.length >= 8 || "密碼需大於8位",
        () => this.newPassword === this.newPasswordCheck || "新密碼不相同",
      ];
    },
    notEmpty() {
      if (
        this.presentPasswordCheck.trim() &&
        this.newPassword.trim() &&
        this.newPasswordCheck.trim()
      ) {
        return false;
      }
      return true;
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