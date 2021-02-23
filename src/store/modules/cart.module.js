export default {
  namespaced: true,
  state () {
    return {
      cartData: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {}
    }
  },
  mutations: {
    add (state, id) {
      if (state.cartData[id]) {
        state.cartData[id]++
      } else {
        state.cartData[id] = 1
      }
      localStorage.setItem('cart', JSON.stringify(state.cartData))
    },
    subtract (state, id) {
      if (state.cartData[id]) {
        state.cartData[id]--
        if (!state.cartData[id]) {
          delete state.cartData[id]
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.cartData))
    },
    clear (state) {
      state.cartData = {}
      localStorage.removeItem('cart')
    }
  },
  actions: {

  },
  getters: {
    getCartData (state) {
      return state.cartData
    },
    getCountCart (state) {
      return Object.keys(state.cartData).length
    }
  }
}
