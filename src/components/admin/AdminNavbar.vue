<template>
  <nav class="navbar">
    <h3>Адмінка</h3>
    <ul class="navbar-menu">
      <li>
        <router-link to="/admin/products">Продукти</router-link>
      </li>
      <li>
        <router-link to="/admin/categories">Категорії</router-link>
      </li>
      <li>
        <router-link to="/admin/orders">Закази</router-link>
      </li>
      <li>
        <a href="#" @click.prevent="logout">Вийти</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  setup () {
    const router = useRouter()
    const store = useStore()

    return {
      logout: () => {
        store.commit('auth/logout')
        router.push('/')
      }
    }
  }
}
</script>
