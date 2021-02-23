<template>
  <nav class="navbar">
    <h3>My shop</h3>
    <ul class="navbar-menu">
      <li>
        <router-link to="/">Магазин</router-link>
      </li>
      <li>
        <router-link to="/cart">Корзина</router-link>
        <span v-if="count">{{count}}</span>
      </li>
      <li v-if="user.email">
        <router-link to="/person" >{{ user.email }}</router-link>
      </li>
      <li v-if="user.id">
        <a href="#" @click.prevent="logout">Выйти</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const router = useRouter()
    const store = useStore()
    const count = computed(() => {
      return store.getters['cart/getCountCart']
    })

    const user = computed(() => {
      return store.getters['auth/getUser']
    })

    const logout = () => {
      store.commit('auth/logout')
      router.push('/')
    }

    return {
      count,
      user,
      logout
    }
  }
}
</script>

<style scoped>
   .navbar span {
      background: #42b983;
      color: #fff;
      width: 25px;
      height: 25px;
      line-height: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
   }
</style>
