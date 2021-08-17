<template>
  <v-container>
    <v-sheet evelation="8">
      <v-form ref="form" v-model="valid" @submit.prevent.stop="handleSubmit">
        <v-text-field
          v-model="presentPasswordCheck"
          required
          :rules="presentPasswordRule"
          label="舊密碼："
          :append-icon="show.present ? 'mdi-eye-off' : 'mdi-eye'"
          :type="show.present  ? 'text' : 'password'"
          @click:append="show.present = !show.present "
        ></v-text-field>

        <v-text-field
          v-model="newPassword"
          label="新密碼："
          :rules="newPasswordRule"
          clearable
          required
          :append-icon="show.new ? 'mdi-eye-off' : 'mdi-eye'"
          :type="show.new  ? 'text' : 'password'"
          @click:append="show.new = !show.new "
          hint="最少8個字，大小寫數字不限制"
        ></v-text-field>

        <v-text-field
          v-model="newPasswordCheck"
          label="確認新密碼："
          :rules="newPasswordRule"
          clearable
          required
          :append-icon="show.newCheck ? 'mdi-eye-off' : 'mdi-eye'"
          :type="show.newCheck  ? 'text' : 'password'"
          @click:append="show.newCheck = !show.newCheck "
        ></v-text-field>

        <v-row class="my-3">
          <v-spacer></v-spacer>
          <v-btn :disabled="!valid" color="primary" class="mr-4" type="submit">
            修改密碼
          </v-btn>
        </v-row>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script>
// import { Toast } from './../utils/helper'

export default {
  name: "ChangePasswordForm",
  data: () => ({
    valid: true,
    check: false,
    presentPassword: "12345678",
    presentPasswordCheck: "",
    newPassword: "",
    newPasswordCheck: "",
    show: {
      present: false,
      new: false,
      newCheck: false,
    },
  }),
  watch: {
    presentPasswordCheck() {
      this.check = false;
    },
  },
  methods: {
    toggleCheck() {
      this.check = true;
    },
    handleSubmit() {
      this.toggleCheck();
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
  },
};
</script>

<style scoped>
</style>