<template>
  <app-page title="Корзина">
    <h3 class="text-center" v-if="!cartProducts.length">В корзине пока ничего нет</h3>
    <table class="table" v-else>
      <thead>
      <tr>
        <th>Наименование</th>
        <th>Количество</th>
        <th>Цена (шт)</th>
      </tr>
      </thead>
      <tbody>
        <cart-table-row
          :products="cartProducts"
        ></cart-table-row>
      </tbody>
    </table>
    <hr>
    <p class="text-right"><strong>Всего: {{currency(sum)}} </strong></p>
    <p class="text-right" v-if="user.id && cartProducts.length">
      <button class="btn" @click="buy">Оплатить</button>
    </p>
    <form @submit.prevent v-if="cartProducts.length && !user.id">
    <h3>Авторизуйтесь или зарегистрируйтесь </h3>
    <div class="form-control">
      <input type="text" name="email" placeholder="Введите имя" v-model="email" @blur="eBlur">
      <small v-if="errors['email']">{{errors['email']}}</small>
    </div>
    <div class="form-control">
      <input type="password" name="password" placeholder="Введите пароль" v-model="password" @blur="eBlur">
      <small v-if="errors['password']">{{errors['password']}}</small>
    </div>
    <button class="btn primary" :disabled="isSubmitting || isTooManyAttempts" @click="login">Войти</button>
    <button class="btn" :disabled="isSubmitting" @click="signUp">Создать акаунт</button>
    <div class="text-danger" v-if="isTooManyAttempts">Cлишком много попыток вохода в систему. Попробуйте позже</div>
  </form>
  </app-page>
</template>

<script>

import { useProducts } from '../use/loadData'
import { currency } from '../utils/currencyProd'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
import { useLoginForm } from '../use/login-form'

import CartTableRow from '../components/cart/CartTableRow.vue'
import AppPage from '../components/ui/AppPage.vue'

export default {
  components: { CartTableRow, AppPage },
  setup () {
    const store = useStore()
    const formFields = { ...useLoginForm() }

    onMounted(async () => {
      await useProducts()
    })

    const user = computed(() => {
      return store.getters['auth/getUser']
    })

    const cartData = computed(() => {
      return store.getters['cart/getCartData']
    })

    const cartProducts = computed(() => store.getters['product/getProducts']
      .filter(prod => Object.keys(cartData.value).indexOf(prod.id) >= 0))

    const sum = computed(() => {
      return cartProducts.value.reduce((previousValue, currentItem) => {
        return previousValue + currentItem.count * currentItem.price
      }, 0)
    })

    const login = formFields.handleSubmit(async data => {
      await store.dispatch('auth/login', data)
    })

    const signUp = formFields.handleSubmit(async data => {
      await store.dispatch('auth/register', data)
    })

    const buy = () => {
      const list = []
      const countToDB = {}
      cartProducts.value.forEach(item => {
        list.push({
          count: cartData.value[item.id],
          name: item.title,
          price: item.price
        })
        countToDB[`${item.id}/count`] = item.count - cartData.value[item.id]
      })
      const data = {
        userId: user.value.id,
        date: Date.now(),
        list: list
      }
      store.dispatch('order/createOrder', data)
      store.dispatch('product/minusCount', [cartData.value, countToDB])
      store.commit('cart/clear', data)
    }

    return {
      currency,
      cartData,
      cartProducts,
      sum,
      user,
      login,
      signUp,
      buy,
      ...formFields
    }
  }
}
</script>
