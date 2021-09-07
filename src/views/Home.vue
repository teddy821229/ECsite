<template>
  <v-container class="content-container">
    <div v-if="status.isLoading" class="loading-box">
      <half-circle-spinner
        :animation-duration="1200"
        :size="80"
        color="#1A237E"
      />
    </div>
    <template v-else>
      <MainCarousel class="mt-10" />
      <v-container>
        <div class="subtitle">最新商品</div>

        <v-divider></v-divider>
        <!-- TODO: decide to use overflow or slide-group -->
        <v-sheet elevation="12" class="mt-10 mx-auto py-8" max-width="1200px">
          <v-slide-group show-arrows>
            <NewestItems
              v-for="item in newestItems"
              :key="item.id"
              :initial-item="item"
            />
          </v-slide-group>
        </v-sheet>

        <!-- TODO: new item card -->
      </v-container>

      <v-container>
        <div class="subtitle">熱銷商品</div>
        <v-divider></v-divider>

        <v-sheet elevation="12" class="mt-10 mx-auto" max-width="1200px">
          <v-tabs fixed-tabs color="indigo" class="py-2 px-8">
            <v-tab
              v-for="tab in series"
              :key="tab.id"
              @click="selectCategory = tab.id"
            >
              {{ tab.name }}
            </v-tab>
          </v-tabs>
          <v-container class="products-container px-3 py-10">
            <NewestItems
              v-for="item in filteredTopFive"
              :key="item.id"
              :initial-item="item"
            />
            <v-card class="more-card" max-width="296" elevation="0">
              <v-hover v-slot="{ hover }">
                <v-sheet
                  class="
                    circle-container
                    d-flex
                    align-center
                    justify-center
                    flex-column
                    rounded-circle
                  "
                  :color="hover ? 'indigo' : 'white'"
                  :elevation="hover ? 8 : 4"
                  @click.prevent.stop="toPage"
                >
                  <v-icon :color="hover ? 'white' : 'indigo'">
                    mdi-plus-circle-outline
                  </v-icon>
                  <span
                    class="text-h6"
                    :class="hover ? 'white--text' : 'indigo--text'"
                    >看更多</span
                  >
                </v-sheet>
              </v-hover>
            </v-card>
          </v-container>
        </v-sheet>
      </v-container>
    </template>
  </v-container>
</template>

<script>
import MainCarousel from "./../components/MainCarousel";
import NewestItems from "./../components/NewestItems.vue";
import { mapState } from "vuex";
import Papa from "papaparse";
import swal from "sweetalert2";

import { HalfCircleSpinner } from "epic-spinners";

const ProductsURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT54r-aPFDVkBm3KfUCm3C1N6kwcAN7fVqFzsUc2IKShjEpO3TQjKPKY2zUbkeQkQD6OaQ56CyR0ECC/pub?gid=0&single=true&output=csv";

const SeriesURL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT54r-aPFDVkBm3KfUCm3C1N6kwcAN7fVqFzsUc2IKShjEpO3TQjKPKY2zUbkeQkQD6OaQ56CyR0ECC/pub?gid=11022087&single=true&output=csv";

export default {
  name: "Home",
  components: {
    MainCarousel,
    NewestItems,
    HalfCircleSpinner,
  },
  created() {
    this.fetchProducts();
    this.fetchSeries();
    this.couponTicketAlert()
  },
  data: () => ({
    newestItems: [],
    topFiveItems: [],
    series: [],
    selectCategory: "unicorn",
    status: {
      isLoading: true,
    },
  }),
  methods: {
    fetchProducts() {
      Papa.parse(ProductsURL, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const res = [];
          results.data.forEach((product) => {
            res.push({
              ...product,
              releaseDate: new Date(product.releaseDate),
            });
          });
          res.sort((a, b) => b.releaseDate - a.releaseDate);
          this.newestItems = res.slice(0, 8);

          const popmart = res
            .filter((item) => item.series.includes("popmart"))
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 5);
          const unicorn = res
            .filter((item) => item.series.includes("unicorn"))
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 5);
          const toys = res
            .filter((item) => item.series.includes("52toys"))
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 5);
          const mountain = res
            .filter((item) => item.series.includes("mountain"))
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 5);

          popmart.forEach((res) => this.topFiveItems.push(res));
          unicorn.forEach((res) => this.topFiveItems.push(res));
          toys.forEach((res) => this.topFiveItems.push(res));
          mountain.forEach((res) => this.topFiveItems.push(res));
        },
      });
    },
    fetchSeries() {
      Papa.parse(SeriesURL, {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          results.data.forEach((res) => {
            if (this.series.some((series) => series.id === res.seriesId)) {
              return;
            } else {
              this.series.push({
                id: res.seriesId,
                name: res.seriesName,
              });
            }
          });
          this.status.isLoading = false;
        },
      });
    },
    async couponTicketAlert() {
      const stop = localStorage.getItem('stopAlert')
      if(stop || this.user.id === -1) {
        return
      }
      const { isConfirmed, isDenied } = await swal.fire({
        title: "<h2>夏日優惠卷</h2>",
        html: '<div style="line-height:50px;">歡迎來到2/144盲盒店</div><b style="line-height:50px;">輸入優惠碼"1500NFEE"</b> <div style="line-height:50px;">可獲得滿1500免運費優惠卷一張</div>',
        confirmButtonText: "前往輸入",
        showDenyButton: true,
        denyButtonText: "我知道了，不再顯示",
        showCancelButton: true,
        cancelButtonText: "關閉",
      });
      
      if(isConfirmed) {
        this.$router.push('/member/coupon')
      } else if(isDenied) {
        localStorage.setItem('stopAlert', true)
      }
    },
    toPage() {
      document.documentElement.scrollTop = 0;
      this.$router.push({
        name: "products",
        query: {
          filterId: 1,
          seriesId: this.selectCategory,
          keyword: "",
        },
      });
    },
  },
  computed: {
    filteredTopFive() {
      return this.topFiveItems.filter((item) =>
        item.series.includes(this.selectCategory)
      );
    },
    ...mapState(["user"]),
  },
};
</script>

<style scoped>
.content-container {
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  max-width: 1600px;
}

.subtitle {
  height: 100px;

  font-size: 36px;
  font-weight: 700;
  text-align: center;
  line-height: 100px;
}

.products-container {
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px 10px;
}

.more-card {
  position: relative;
}

.circle-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  width: 100px;
  height: 100px;
  cursor: pointer;
}

.loading-box {
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
