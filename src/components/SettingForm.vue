<template>
  <v-container>
    <v-sheet>
      個人資料：
      <br />
      帳號(disabled)
      <br />
      姓名
      <br />
      性別
      <br />
      生日
      <br />
      電話
      <br />
      電子信箱
      <br />
      常用地址
      <v-form v-model="valid">
        <v-container>
          <v-text-field
            v-model="user.account"
            required
            readonly
            label="帳號："
          ></v-text-field>

          <v-text-field
            v-model="user.name"
            :rules="nameRules"
            label="姓名："
            required
            clearable
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
            :rules="[(v) => !!v || 'Item is required']"
            label="性別："
            required
          ></v-select>

          <v-text-field
            v-model="user.email"
            :rules="valid ? emailRules : []"
            label="電子信箱："
            :required="!valid"
            clearable
            validate-on-blur
          ></v-text-field>
        </v-container>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: "SettingForm",
  data: () => ({
    valid: false,
    user: {
      account: "teddy1993",
      name: "",
      sex: "生理男",
      birthday: "",
      phone: "",
      email: "",
    },
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
  },
};
</script>

<style scoped>
</style>