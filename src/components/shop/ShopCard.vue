<template>
  <div class="product-card" @click="details">
    <div class="product-img">
      <img :src="product.img">
    </div>
    <h4 class="product-title">{{product.title}}</h4>
    <div class="text-center">
      <button class="btn" v-if="product.count && !cartData[product.id]" @click="add(product.id)">{{product.count}}</button>
      <p v-if="!product.count">Нет в наличии</p>
     <div class="product-controls" v-if="cartData[product.id]">
         <app-control-buttons :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

import AppControlButtons from '../ui/AppControlButtons.vue'

export default {
  props: ['product'],
  setup (props) {
    const router = useRouter()
    const store = useStore()

    const cartData = computed(() => {
      return store.getters['cart/getCartData']
    })

    const details = (e) => {
      if (e.target.tagName !== 'BUTTON') {
        router.push(`/product/${props.product.id}`)
      }
    }

    const add = (id) => {
      store.commit('cart/add', id)
    }

    return {
      details,
      cartData,
      add
    }
  },
  components: { AppControlButtons }
}
</script>
