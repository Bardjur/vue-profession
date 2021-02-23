<template>
  <form class="card" @submit.prevent>
    <p>email:a@aaa.aa / pass:123456</p>
    <h1 class="text-center">Вход в магазин</h1>
    <div class="form-control">
      <input type="text" name="email" placeholder="Введите имя" v-model="email" @blur="eBlur">
      <small v-if="errors['email']">{{errors['email']}}</small>
    </div>
    <div class="form-control">
      <input type="password" name="password" placeholder="Введите пароль" v-model="password" @blur="eBlur">
      <small v-if="errors['password']">{{errors['password']}}</small>
    </div>
    <button class="btn primary" :disabled="isSubmitting || isTooManyAttempts" @click="onSubmit">Войти</button>
    <div class="text-danger" v-if="isTooManyAttempts">Cлишком много попыток вохода в систему. Попробуйте позже</div>
  </form>
</template>

<script>
import { computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useLoginForm } from '../use/login-form'

export default {
  setup () {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const errMess = computed(() => {
      return !!route.query.message
    })

    watch(errMess, () => {
      if (errMess.value) {
        store.dispatch('changeMessage', {
          value: 'Войдите в систему',
          type: 'warning'
        })
      }
    })

    if (errMess.value) {
      store.dispatch('changeMessage', {
        value: 'Войдите в систему',
        type: 'warning'
      })
    }

    const auth = async values => {
      try {
        await store.dispatch('auth/login', values)
        router.push('/admin/products')
      } catch (e) { throw new Error(e) }
    }
    return { ...useLoginForm(auth) }
  }
}
</script>
