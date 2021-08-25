import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './../views/Home.vue'
import store from './../store'
import { Toast } from './../utils/helper'

Vue.use(VueRouter)

const authorizationCheck = (to, from ,next) => {
  const currentUser = store.state.user
  if(currentUser.id !== -1) {
    Toast.fire({
      icon: 'error',
      title: '目前無法前往該頁面，請先登出。'
    })
    next('/home')
  }
  next()
}

const unAuthorization = (to, from ,next) => {
  const currentUser = store.state.user
  if(currentUser.id === -1) {
    Toast.fire({
      icon: 'error',
      title: '請先登入'
    })
    next('/home')
  }
  next()
}

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
    path: '/login',
    name: 'login',
    component: () => import('./../views/Login.vue'),
    beforeEnter: authorizationCheck
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('./../views/Register.vue'),
    beforeEnter: authorizationCheck
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('./../views/Products.vue'),
    beforeEnter: (to, from, next) => {
      // 重新整理後，重置所有已經選擇的篩選器
      if (!from.name && (to.query.filterId !== '1' || to.query.seriesId !== 'all' || to.query.keyword !== '')) {
        next({
          name: 'products',
          query: {
            filterId: '1',
            seriesId: 'all',
            keyword: ''
          }
        })
      }
      next()
    }
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import('./../views/Product.vue')
  },
  {
    path: '/likes',
    name: 'likes',
    component: () => import('./../views/Likes.vue'),
    beforeEnter: unAuthorization
  },
  {
    path: '/member',
    name: 'member',
    component: () => import('./../views/Member.vue'),
    redirect: '/member/setting',
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
        component: () => import('./../components/HistoryPurchase.vue')
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('./../components/Coupon.vue')
      }
    ],
    beforeEnter: unAuthorization
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('./../views/Checkout.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const itemInCart = JSON.parse(localStorage.getItem('cartItems'))
  const likes = JSON.parse(localStorage.getItem('likes'))

  const storeUser = store.state.user

  if(storeUser !== currentUser) {
    if (currentUser) {
      store.commit('setCurrentUser', currentUser)
    }
    if (itemInCart) {
      store.commit('getCartItem', itemInCart)
    }
    if(likes) {
      store.commit('getLikes', likes)
    }
  }
  next()
})

export default router
