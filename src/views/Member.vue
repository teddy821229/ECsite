<template>
  <v-container>
    <v-sheet max-width="1200px" class="mx-auto">
      <v-row>
        <v-col cols="3">
          <v-sheet elevation="8" class="my-3">
            <v-list class="pt-0">
              <v-toolbar-title
                class="indigo white--text text-h6 px-5 py-3 elevation-4"
                >會員中心</v-toolbar-title
              >
              <v-list-item-group
                v-model="selectedTag"
                color="indigo"
                class="mt-3"
                mandatory
              >
                <v-list-item
                  v-for="tag in tags"
                  :key="tag.id"
                  class="align-center px-5"
                  two-line
                  :to="{ name: tag.routeName }"
                >
                  <v-list-item-icon class="mr-5 my-auto">
                    <v-icon>{{ tag.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="tag.name"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-sheet>
        </v-col>
        <v-col cols="9">
          <v-sheet class="py-3 mx-auto" max-width="1440">
            <div class="title text-center indigo white--text py-3 elevation-6">
              {{sectionName}}
            </div>
          </v-sheet>
          <v-sheet elevation="8" class="mb-4"> 
            <router-view />
          </v-sheet>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>

export default {
  name: "Member",
  data: () => ({
    tags: [
      {
        id: 1,
        icon: "mdi-account",
        name: "個人資料設定",
        routeName: 'setting'
      },
      {
        id: 2,
        icon: 'mdi-lock',
        name: '修改密碼',
        routeName: 'password'
      },
      {
        id: 3,
        icon: "mdi-history",
        name: "歷史訂單",
        routeName: 'history'
      },
      {
        id: 4,
        icon: "mdi-ticket-percent-outline",
        name: "優惠卷",
        routeName: 'coupon'
      },
    ],
    selectedTag: 0,
  }),
  computed: {
    sectionName() {
      return this.tags.find(tag => tag.id === this.selectedTag + 1).name
    },
    
  }
};
</script>

<style scoped>
</style>