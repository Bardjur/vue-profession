<template>
  <form class="card" @submit.prevent="onSubmit">
    <h1 class="text-center">Вход в магазин</h1>
    <div class="form-control">
      <input type="text" name="email" placeholder="Введите имя" v-model="email" @blur="eBlur">
      <small v-if="errors['email']">{{errors['email']}}</small>
    </div>
    <div class="form-control">
      <input type="password" name="password" placeholder="Введите пароль" v-model="password" @blur="eBlur">
      <small v-if="errors['password']">{{errors['password']}}</small>
    </div>
    <button class="btn primary" :disabled="isSubmitting || isTooManyAttempts">Войти</button>
    <div class="text-danger" v-if="isTooManyAttempts">Cлишком много попыток вохода в систему. Попробуйте позже</div>
  </form>
</template>

<script>
import { useLoginForm } from '../use/login-form'

export default {
  setup () {
    return { ...useLoginForm() }
  }
}
</script>
