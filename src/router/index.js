import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './../views/Home.vue'
import store from './../store'

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
    path: '/login',
    name: 'login',
    component: () => import('./../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('./../views/Register.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('./../views/Products.vue'),
    beforeEnter: (to, from, next) => {
      // 重新整理後，重置所有已經選擇的篩選器
      if(!from.name && (to.query.filterId !== '1' || to.query.seriesId !== 'all' || to.query.keyword !== '')) {
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
    component: () => import('./../views/Likes.vue')
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
    ]
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
  const itemInCart = JSON.parse(localStorage.getItem('itemInCart'))
  if(currentUser) {
    store.commit('setCurrentUser', currentUser)
  }
  if(itemInCart) {
    store.commit('getCartItem', itemInCart)
  }

  next()
})

export default router
