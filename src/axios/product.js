import axios from 'axios'

const productsAxios = axios.create({
  baseURL: process.env.VUE_APP_DB
})

export default productsAxios