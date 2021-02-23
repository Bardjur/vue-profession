import axios from 'axios'
import router from '../router'
import store from '../store/index'

const productsAxios = axios.create({
  baseURL: process.env.VUE_APP_DB // eslint-disable-line
})

productsAxios.defaults.params = {}

productsAxios.interceptors.request.use(async config => {
  if (!store.getters['auth/isAuthenticated']) {
    return config
  }

  if (store.getters['auth/isExpired']) {
    await store.dispatch('auth/refresh')
  }

  config.params.auth = store.getters['auth/getToken']

  return config
})

productsAxios.interceptors.response.use(null, error => {
  if (error.response.status === 401) {
    store.commit('auth/logout')
    router.push('/auth?message=auth')
  }
  return Promise.reject(error)
})

export default productsAxios
