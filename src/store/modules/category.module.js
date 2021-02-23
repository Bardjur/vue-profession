import axios from '../../axios/product'
import { transform } from '../../utils/transform'

export default {
  namespaced: true,
  state () {
    return {
      categories: []
    }
  },
  mutations: {
    setCategories: (state, obj) => {
      state.categories = obj
    },
    addCategory: (state, data) => {
      state.categories.push(data)
    },
    removeCategory: (state, id) => {
      const idx = state.categories.findIndex(item => item.id === id)
      if (idx !== -1) {
        state.categories.splice(idx, 1)
      }
    }
  },
  actions: {
    async loadCategories ({ commit, dispatch }) {
      try {
        const { data } = await axios.get('/categories.json')
        commit('setCategories', transform(data))
      } catch (e) {
        dispatch('changeMessage', {
          value: e.response.data.error.message,
          type: 'danger'
        }, { root: true })
        throw new Error(e)
      }
    },
    async createCategory ({ commit, dispatch }, payload) {
      try {
        const { data } = await axios.post('/categories.json', payload)
        commit('addCategory', { ...payload, id: data.name })
        dispatch('changeMessage', {
          value: 'Категорию успешно добавлено',
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
    async deleteCategory ({ commit, dispatch }, id) {
      try {
        await axios.delete(`categories/${id}.json`)
        commit('removeCategory', id)
        dispatch('changeMessage', {
          value: 'Категорию успешно удалено',
          type: 'primary'
        }, { root: true })
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
    getCategories (state) {
      return state.categories
    }
  }
}
