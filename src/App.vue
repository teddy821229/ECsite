<template>
  <v-app>
    <TopNavBar 
      :is-authenticated="isAuthenticated"
    />
    <v-main class="main-container">
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

import TopNavBar from './components/TopNavBar.vue'
import Footer from './components/Footer.vue'
export default {
  name: "App",
  components: {
    TopNavBar,
    Footer
  },
  computed: {
    ...mapState(['user', 'isAuthenticated'])
  }
};
</script>

<style scoped>

.main-container {
  margin-top: 64px;
}
</style>
