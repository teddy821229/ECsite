<template>
  <v-container class="mt-2">
    <v-sheet>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="user.account"
          required
          readonly
          label="帳號："
        ></v-text-field>

        <v-text-field
          v-model="user.username"
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
              v-model="user.birthday"
              label="生日："
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>

          <v-date-picker
            no-title
            v-model="user.birthday"
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
          v-model="user.sex"
          :items="sexChoices"
          :rules="[(v) => !!v || '需選擇性別']"
          label="性別："
        ></v-select>

        <v-text-field
          v-model="user.phone"
          label="手機號碼"
          :rules="[(v) => !!v || '手機號碼不能為空白']"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="user.email"
          label="電子信箱："
          :rules="emailRules"
          clearable
          required
        ></v-text-field>

        <v-row class="my-3">
          <v-spacer></v-spacer>
          <v-btn color="primary" class="mr-4" outlined @click="cancelEdit"> 取消修改 </v-btn>
          <v-btn :disabled="!valid" color="primary" class="mr-4">
            儲存修改
          </v-btn>
        </v-row>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: "UserSettingForm",
  data: () => ({
    user: {
      account: "teddy1993",
      username: "李奕德",
      sex: "生理男",
      birthday: "1993-12-29",
      phone: "0952971229",
      email: "a21506qoo@gmail.com",
    },
    userCached: {
      account: "teddy1993",
      username: "李奕德",
      sex: "生理男",
      birthday: "1993-12-29",
      phone: "0952971229",
      email: "a21506qoo@gmail.com",
    },
    valid: true,
    menu: false,
    nameRules: [(v) => !!v || "姓名不能空白"],
    emailRules: [
      (v) => !!v || "信箱不能空白",
      (v) => /.+@.+/.test(v) || "信箱格式不正確",
    ],
    sexChoices: ["生理男", "生理女", "不透露"],
  }),
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    cancelEdit() {
      this.user = {
        ...this.user,
        ...this.userCached
      }
    }
  },
};
</script>

<style scoped>
</style>