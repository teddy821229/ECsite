import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('./../views/Products.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
