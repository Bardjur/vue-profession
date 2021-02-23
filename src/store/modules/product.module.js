import axios from '../../axios/product'
import { transform } from '../../utils/transform'

export default {
  namespaced: true,
  state () {
    return {
      products: [],
      product: {}
    }
  },
  mutations: {
    setProducts (state, data) {
      state.products = data
    },
    setProduct (state, data) {
      state.product = data
    },
    addProduct (state, product) {
      state.products.push(product)
    },

    removeProduct: (state, id) => {
      const idx = state.products.findIndex(item => item.id === id)
      if (idx !== -1) {
        state.products.splice(idx, 1)
      }
    },
    editProduct: (state, payload) => {
      const idx = state.products.findIndex(item => item.id === payload.id)
      if (idx !== -1) {
        state.products[idx] = { ...payload.data, id: payload.id }
      }
    }
  },
  actions: {
    async loadProducts ({ commit, dispatch }) {
      try {
        const { data } = await axios.get('/products.json')
        commit('setProducts', transform(data))
      } catch (e) {
        dispatch('changeMessage', {
          value: e.response.data.error.message,
          type: 'danger'
        }, { root: true })
        throw new Error(e)
      }
    },
    async minusCount ({ state }, payload) {
      await axios.patch('/products.json', payload[1])
      state.products.forEach((item) => {
        Object.keys(payload[0]).forEach(key => {
          if (key === item.id) {
            item.count -= payload[0][key]
          }
        })
      })
    },
    async loadProduct ({ commit, dispatch }, id) {
      try {
        const { data } = await axios.get(`/products/${id}.json`)
        data.id = id
        commit('setProduct', data)
      } catch (e) {
        dispatch('changeMessage', {
          value: e,
          type: 'danger'
        }, { root: true })
        throw new Error(e)
      }
    },
    async createProduct ({ commit, dispatch }, payload) {
      try {
        const { data } = await axios.post('products.json', payload)
        commit('addProduct', { ...payload, id: data.name })
        dispatch('changeMessage', {
          value: 'Продукт успешно добавлен',
          type: 'primary'
        }, { root: true })
      } catch (e) {
        dispatch('changeMessage', {
          value: e.response.data.error.message,
          type: 'danger'
        }, { root: true })
        throw new Error(e)
      }
    },
    async deleteProduct ({ commit, dispatch }, id) {
      try {
        await axios.delete(`products/${id}.json`)
        commit('removeProduct', id)
        dispatch('changeMessage', {
          value: 'Продукт успешно удален',
          type: 'primary'
        }, { root: true })
      } catch (e) {
        dispatch('changeMessage', {
          value: e.response.data.error.message,
          type: 'danger'
        }, { root: true })
        throw new Error(e)
      }
    },
    async saveProduct ({ commit, dispatch }, payload) {
      try {
        await axios.patch(`products/${payload.id}.json`, payload.data)
        commit('editProduct', payload)
      } catch (e) {
        dispatch('changeMessage', {
          value: e.response.data.error.message,
          type: 'danger'
        }, { root: true })
        throw new Error(e)
      }
    }
  },
  getters: {
    getProducts (state) {
      return state.products.sort((a) => a.count === 0 ? 1 : -1)
    },
    getProduct (state) {
      return state.product
    }
  }
}
