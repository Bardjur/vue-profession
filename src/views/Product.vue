<template>
  <app-loader v-if="!loaded"></app-loader>
  <app-page back center :title="product.title" v-if="product">
    <img :src="product.img" />
    <p>Категория: <strong v-if="category">{{category.title}}</strong></p>
    <button class="btn" v-if="product.count && !cartData[product.id]" @click="add(product.id)">
      {{currency(product.price)}}
    </button>
    <p v-else-if="!product.count">Нет в наличии</p>
    <div class="product-controls in-card" v-else>
      <app-control-buttons :product="product" />
    </div>
  </app-page>
  <h3 class="text-center text-white" v-else>
    Товар не найден.
  </h3>
</template>

<script>
import { currency } from '../utils/currencyProd'
import { ref, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useCategories } from '../use/loadData'

import AppPage from '../components/ui/AppPage'
import AppLoader from '../components/ui/AppLoader'
import AppControlButtons from '../components/ui/AppControlButtons.vue'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const loaded = ref(false)

    onMounted(async () => {
      useCategories()
      await store.dispatch('product/loadProduct', props.id)
      loaded.value = true
    })

    const product = computed(() => {
      return store.getters['product/getProduct']
    })

    const category = computed(() => {
      return store.getters['category/getCategories'].filter(item => item.type === product.value.category)[0]
    })

    const cartData = computed(() => {
      return store.getters['cart/getCartData']
    })

    const add = (id) => {
      store.commit('cart/add', id)
    }

    return {
      product,
      category,
      currency,
      loaded,
      cartData,
      add
    }
  },
  components: { AppPage, AppLoader, AppControlButtons }
}
</script>
