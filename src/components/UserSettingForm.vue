<template>
  <v-container>
    <v-sheet>
      <div v-if="status.isLoading" class="loading-box">
        <half-circle-spinner
          :animation-duration="1200"
          :size="80"
          color="#1A237E"
        />
      </div>
      <template v-else>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="userData.account"
            required
            readonly
            label="帳號："
          ></v-text-field>

          <v-text-field
            v-model="userData.username"
            label="姓名："
            :rules="nameRules"
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
                v-model="userData.birthday"
                label="生日："
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>

            <v-date-picker
              no-title
              v-model="userData.birthday"
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
            v-model="userData.sex"
            :items="sexChoices"
            :rules="[(v) => !!v || '需選擇性別']"
            label="性別："
          ></v-select>

          <v-text-field
            v-model="userData.phone"
            label="手機號碼"
            :rules="[(v) => !!v || '手機號碼不能為空白']"
            clearable
          ></v-text-field>

          <v-text-field
            v-model="userData.email"
            label="電子信箱："
            :rules="emailRules"
            clearable
            required
          ></v-text-field>

          <v-row class="my-3">
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              class="mr-4"
              outlined
              @click="cancelEdit"
              :disabled="same"
            >
              取消修改
            </v-btn>
            <v-btn :disabled="same || !valid" color="primary" class="mr-4">
              儲存修改
            </v-btn>
          </v-row>
        </v-form>
      </template>
    </v-sheet>
  </v-container>
</template>

<script>
import Papa from "papaparse";
import { HalfCircleSpinner } from "epic-spinners";
import { mapState } from 'vuex'

const UserURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT54r-aPFDVkBm3KfUCm3C1N6kwcAN7fVqFzsUc2IKShjEpO3TQjKPKY2zUbkeQkQD6OaQ56CyR0ECC/pub?gid=1020618966&single=true&output=csv";

export default {
  name: "UserSettingForm",
  components: {
    HalfCircleSpinner,
  },
  data: () => ({
    userData: {
      account: "",
      username: "",
      sex: "",
      birthday: "",
      phone: "",
      email: "",
    },
    userCached: {
      account: "",
      username: "",
      sex: "",
      birthday: "",
      phone: "",
      email: "",
    },
    valid: true,
    menu: false,
    nameRules: [(v) => !!v || "姓名不能空白"],
    emailRules: [
      (v) => !!v || "信箱不能空白",
      (v) => /.+@.+/.test(v) || "信箱格式不正確",
    ],
    sexChoices: ["生理男", "生理女", "不透露"],
    status: {
      isLoading: true,
    },
  }),
  created() {
    const userId = this.user.id
    this.fetchUser(userId);
  },
  methods: {
    fetchUser(id) {
      Papa.parse(UserURL, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const user = results.data.find((user) => user.id == id);
          this.userData = {
            ...this.userData,
            ...user,
            phone: "0" + user.phone
          };
          this.userCached = {
            ...this.userCached,
            ...user,
            phone: "0" + user.phone
          };
          this.status.isLoading = false
        },
      });
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    cancelEdit() {
      this.userData = {
        ...this.userData,
        ...this.userCached,
      };
    },
  },
  computed: {
    same() {
      let lists = ["username", "sex", "birthday", "phone", "email"];
      return lists.every((list) => this.userData[list] === this.userCached[list]);
    },
    ...mapState(['user'])
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