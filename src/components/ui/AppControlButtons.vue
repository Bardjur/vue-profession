<template>
  <button class="btn danger"
    @click="subtract(product.id)">-</button>

  <strong>{{cartData[product.id]}} шт. </strong>

  <button class="btn primary"
    @click="add(product.id)"
    :disabled="cartData[product.id] >= product.count"
  >+</button>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { currency } from '../../utils/currencyProd'

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup () {
    const store = useStore()

    const cartData = computed(() => {
      return store.getters['cart/getCartData']
    })

    const add = (id) => {
      store.commit('cart/add', id)
    }

    const subtract = (id) => {
      store.commit('cart/subtract', id)
    }
    return { add, subtract, currency, cartData }
  }
}
</script>
