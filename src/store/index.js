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
    itemInCart: [],
    likes: []
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
      state.user = {
        id: -1,
        name: '',
        account: '',
      }
      state.isAuthenticated = false
      localStorage.removeItem('currentUser')

      state.itemInCart = []
      localStorage.removeItem('cartItems')

      state.likes = []
      localStorage.removeItem('likes')
    },
    // cart control
    getCartItem(state, items) {
      state.itemInCart = items
    },
    setCartItem(state, item) {
      // TODO: use some or find ?

      if (!state.itemInCart.find(cartItem => cartItem.Item.id === item.Item.id)) {
        state.itemInCart.push(item)
      } else {
        const target = state.itemInCart.find(cartItem => cartItem.Item.id === item.Item.id)
        target.quantity = item.quantity
      }

      localStorage.setItem('cartItems', JSON.stringify(state.itemInCart))
    },
    removeCartItem(state, targetItem) {
      state.itemInCart = state.itemInCart.filter(item => item.Item.id !== targetItem.Item.id)
      localStorage.setItem('cartItems', JSON.stringify(state.itemInCart))
    },
    cleanCartItem(state) {
      state.itemInCart = []
      localStorage.removeItem('cartItems')
    },
    // likes control 
    // TODO: likes should be saved in DB, need to adjust
    getLikes(state, data) {
      state.likes = data
    },
    setLike(state, target) {
      state.likes.push(target)
      localStorage.setItem('likes', JSON.stringify(state.likes))
    },
    removeLike(state, target) {
      state.likes = state.likes.filter(like => like.id !== target.id)
      localStorage.setItem('likes', JSON.stringify(state.likes))
    }
  },
  actions: {
  },
  modules: {
  }
})
