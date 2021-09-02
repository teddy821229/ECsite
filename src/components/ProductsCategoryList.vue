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
        v-for="item in seriesList"
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
          v-for="child in item.Items"
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
    },
    seriesList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data: () => ({
  }),
  methods: {
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