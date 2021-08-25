<template>
  <v-col cols="3">
    <v-toolbar color="indigo" dark>
      <v-toolbar-title>商品分類</v-toolbar-title>
    </v-toolbar>

    <v-list>
      <v-list-item
        link
        exact-active-class="indigo white--text"
        exact
        @click="handleChange('all')"
        :to="{
          name: 'products',
          query: {
            filterId: filterId,
            seriesId: 'all',
            keyword: searchInput
          },
        }"
      >
        <v-list-item-title>全部商品</v-list-item-title>
      </v-list-item>
      <v-list-group
        v-for="item in items"
        :key="item.id"
        :value="querySeriesMatch(item.id)"
        active-class="indigo lighten-4"
      >
        <template v-slot:activator>
          <v-list-item>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item>
        </template>

        <v-list-item
          class="pl-10"
          exact-active-class="indigo white--text"
          exact
          @click="handleChange(item.id)"
          :to="{
            name: 'products',
            query: {
              filterId: filterId,
              seriesId: item.id,
              keyword: ''
            },
          }"
        >
          <v-list-item-content>
            <v-list-item-title> 全部</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!-- TODO: 所有的 category sort 都使用prop進來的！！！ -->
        <v-list-item
          v-for="child in item.items"
          :key="child.id"
          class="pl-10"
          exact-active-class="indigo white--text"
          active-class=""
          exact
          @click="handleChange(child.id)"
          :to="{
            name: 'products',
            query: {
              filterId: filterId,
              seriesId: child.id,
              keyword: ''
            },
          }"
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
const dummyCategories = [
  {
    id: "unicorn",
    title: "尋找獨角獸",
    items: [
      {
        id: "unicorn1",
        title: "Bob男友",
      },
      {
        id: "unicorn2",
        title: "卓大王",
      },
      {
        id: "unicorn3",
        title: "Rico",
      },
      {
        id: 'unicorn4',
        title: '幽靈熊'
      },
    ],
  },
  {
    id: "popmart",
    title: "泡泡瑪特",
    items: [
      {
        id: "popmart1",
        title: "Dimoo",
      },
      {
        id: "popmart2",
        title: "Labubu",
      },
      {
        id: "popmart3",
        title: "小甜豆",
      },
      {
        id: "popmart4",
        title: "YUKI",
      },
    ],
  },
  {
    id: "52toys",
    title: "52TOYS",
    items: [
      {
        id: "52toys1",
        title: "迪士尼公主系列",
      },
      {
        id: "52toys2",
        title: "lulu豬",
      },
    ],
  },
  {
    id: "case",
    title: "陳列小幫手",
  },
];

export default {
  name: "ProductsCategoryList",
  props: {
    filterId: {
      type: Number,
      required: true
    },
    searchInput: {
      type: String,
      default: ''
    }
  },
  created() {
    this.fetchCategories();
  },
  data: () => ({
    items: [],
  }),
  methods: {
    fetchCategories() {
      this.items = dummyCategories;
    },
    handleChange(id) {
      this.$emit("after-change-category", id);
    },
  },
  computed: {
    querySeriesMatch() {
      return function (id) {
        const seriesId = this.$route.query.seriesId;
        return seriesId.includes(id);
      };
    },
  },
};
</script>