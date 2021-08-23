import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: -1,
      name: '',
      account: '',
    },
    isAuthenticated: false,
    itemInCart: []
  },
  mutations: {
    // user control
    setCurrentUser(state, user) {
      state.user = {
        ...state.user,
        ...user
      }
      state.isAuthenticated = true
    },
    revokeAuthentication(state) {
      state.user = {}
      state.isAuthenticated = false
      localStorage.removeItem('currentUser')
    },
    // cart control
    getCartItem(state, items) {
      state.itemInCart = items
    },
    setCartItem(state, item) {
      // TODO: 確認是否存在，決定是要推進去還是加數量
      state.itemInCart.push(item)
      localStorage.setItem('cartItems', JSON.stringify(state.itemInCart))
    },
    removeCartItem(state, targetId) {
      // TODO: 確認是否存在，決定是要刪除還是減少數量
      state.itemInCart = state.itemInCart.filter(item => item.id !== targetId)
      localStorage.setItem('cartItems', JSON.stringify(state.itemInCart))
    }
  },
  actions: {
  },
  modules: {
  }
})
