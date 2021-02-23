import axios from 'axios'
const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'

export default {
  namespaced: true,
  state () {
    return {
      token: localStorage.getItem(TOKEN_KEY),
      refreshToken: localStorage.getItem(REFRESH_KEY),
      expiresDate: new Date(localStorage.getItem(EXPIRES_KEY)),
      user: JSON.parse(localStorage.getItem('user')) ?? {}
    }
  },
  mutations: {
    setToken (state, { refreshToken, idToken, expiresIn = '3600' }) {
      const expiresDate = new Date(new Date().getTime() + Number(expiresIn) * 1000)
      state.token = idToken
      state.refreshToken = refreshToken
      state.expiresDate = expiresDate
      localStorage.setItem(TOKEN_KEY, idToken)
      localStorage.setItem(REFRESH_KEY, refreshToken)
      localStorage.setItem(EXPIRES_KEY, expiresDate.toString())
    },

    logout (state) {
      state.token = null
      state.refreshToken = null
      state.expiresDate = null
      state.user = {}
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(REFRESH_KEY)
      localStorage.removeItem(EXPIRES_KEY)
      localStorage.removeItem('user')
    },

    setUserData (state, payload) {
      state.user = { ...payload }
      localStorage.setItem('user', JSON.stringify({ ...payload }))
    }
  },
  actions: {
    async login ({ commit, dispatch }, payload) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}` // eslint-disable-line
        const { data } = await axios.post(url, { ...payload, returnSecureToken: true })
        commit('setToken', data)
        await dispatch('loadUserDB', data.localId)
        commit('clearMessage', null, { root: true })
      } catch (e) {
        dispatch('changeMessage', {
          value: e.response.data.error.message,
          type: 'danger'
        }, { root: true })
        throw new Error(e)
      }
    },

    async register ({ commit, dispatch }, payload) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}` // eslint-disable-line
        const { data } = await axios.post(url, { ...payload, returnSecureToken: true })
        commit('setToken', data)
        await dispatch('setUserDB', data)
        commit('clearMessage', null, { root: true })
      } catch (e) {
        dispatch('changeMessage', {
          value: e.response.data.error.message,
          type: 'danger'
        }, { root: true })
        throw new Error(e)
      }
    },

    async loadUserDB ({ commit }, id) {
      try {
        const { data } = await axios.get(`https://shop-vue3-default-rtdb.firebaseio.com/users/${id}.json`)
        commit('setUserData', { id: id, ...data })
      } catch (e) {
        throw new Error(e)
      }
    },

    async setUserDB ({ getters, commit }, payload) {
      const data = {
        role: 'user',
        email: payload.email
      }
      try {
        await axios.put(`https://shop-vue3-default-rtdb.firebaseio.com/users/${payload.localId}.json?auth=${getters.getToken}`, JSON.stringify({
          ...data
        }))
        commit('setUserData', { id: payload.localId, ...data })
      } catch (e) {
        throw new Error(e)
      }
    },

    async refresh ({ state, commit }) {
      try {
        const { data } = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${process.env.VUE_APP_FB_KEY}`, { // eslint-disable-line
          grant_type: 'refresh_token',
          refresh_token: state.refreshToken
        })
        commit('setToken', {
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          expiresIn: data.expires_in
        })
      } catch (e) {
        throw new Error(e)
      }
    }

  },
  getters: {
    getToken (state) {
      return state.token
    },
    isAuthenticated (_, getters) {
      return !!getters.getToken
    },
    isExpired (state) {
      return new Date() >= state.expiresDate
    },
    getUser (state) {
      return state.user
    },
    isAdmin (state) {
      return state.user.role === 'admin'
    }
  }
}
