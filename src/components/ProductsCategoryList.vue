<template>
  <v-col cols="3">
    <v-toolbar color="indigo" dark >
      <v-toolbar-title>商品分類</v-toolbar-title>
    </v-toolbar>

    <v-list>
      <v-list-item link exact-active-class="indigo white--text" exact>
        <v-list-item-title>全部商品</v-list-item-title>
      </v-list-item>
      <v-list-group v-for="item in items" :key="item.title">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>
<!-- TODO: 所有的 category sort 都使用prop進來的！！！ -->
        <v-list-item
          v-for="child in item.items"
          :key="child.title"
          class="pl-10"
          exact-active-class="indigo white--text"
          active-class=""
          exact
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-col>
</template>

<script>
export default {
  name: "ProductsCategoryList",
  data: () => ({
    items: [
      {
        title: "尋找獨角獸",
        items: [{ title: "Bob男友" }, { title: "卓大王" }, { title: "Rico" }],
      },
      {
        title: "泡泡瑪特",
        items: [
          { title: "Breakfast & brunch" },
          { title: "New American" },
          { title: "Sushi" },
        ],
      },
      {
        title: "52TOYS",
        items: [{ title: "List Item" }],
      },
      {
        title: "陳列小幫手",
        items: [{ title: "List Item" }],
      },
    ],
  }),
};
</script>