import axios from '../../axios/product'
import { transform } from '../../utils/transform'

export default {
  namespaced: true,
  state () {
    return {
      orders: [],
      personOrders: []
    }
  },
  mutations: {
    setOrders (state, orders) {
      state.orders = orders
    },
    setPersonOrders (state, id) {
      state.personOrders = state.orders.filter(item => item.userId === id)
    }
  },
  actions: {
    async loadOrders ({ commit }) {
      try {
        const { data } = await axios.get('/orders.json')
        commit('setOrders', transform(data))
      } catch (e) {}
    },
    async createOrder (_, payload) {
      try {
        const id = Date.now()
        await axios.put(`https://shop-vue3-default-rtdb.firebaseio.com/orders/${id}.json`, JSON.stringify({ ...payload }))
      } catch (e) {}
    }
  },
  getters: {
    getOrders (state) {
      return state.orders
    },
    getPersonOrders (state) {
      return state.personOrders
    }
  }
}
