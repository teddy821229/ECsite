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
import TopNavBar from './components/TopNavBar.vue'
import Footer from './components/Footer.vue'
export default {
  name: "App",
  components: {
    TopNavBar,
    Footer
  },
  data: () => ({
    isAuthenticated: false,
  }),
};
</script>

<style scoped>

.main-container {
  margin-top: 64px;
}
</style>
