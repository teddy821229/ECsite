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
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import('./../views/Product.vue')
  },
  {
    path: '/likes',
    name: 'likes',
    component: () => import('./../views/Likes.vue')
  },
  {
    path: '/member',
    name: 'member',
    component: () => import('./../views/Member.vue') ,
    children: [
      {
        path: 'setting',
        name: 'setting',
        component: () => import('./../components/UserSettingForm.vue')
      },
      {
        path: 'password',
        name: 'password',
        component: () => import('./../components/ChangePasswordForm.vue')
      },
      {
        path: 'history',
        name: 'history',
        component: () => import('./../components/ChangePasswordForm.vue')
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('./../components/ChangePasswordForm.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
