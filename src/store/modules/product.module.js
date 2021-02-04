/* eslint-disable */
import axios from '../../axios/product'

export default {
  namespaced: true,
  state () {
    return {
      products: []
    }
  },
  mutations: {
    setProducts (state, data) {
      state.products = data
    },
    addProduct (state, product) {
      state.products.push(product)
    }
  },
  actions: {
    async loadProducts ({ commit, dispatch }) {
      try {
        const { data } = await axios.get('/products')
        commit('setProducts', data)
      } catch (e) {
        dispatch('changeMessage', {
          value: e.message,
          type: 'danger'
        }, { root: true })
      }
    }
  },
  getters: {
    getProducts (state) {
      return state.products
    }
  }
}
