import { computed, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'

export function useCartProducts (cartData) {
  const cartModel = reactive(cartData)
  const store = useStore()

  onMounted(async () => {
    await store.dispatch('product/loadProducts')
  })

  const cartProd = computed(() => store.getters['product/getProducts']
    .filter(prod => Object.keys(cartModel).indexOf(prod.id) >= 0)
    .map((item) => {
      item.count = cartModel[item.id]
      return item
    }))

  const sum = computed(() => {
    return cartProd.value.reduce((previousValue, currentItem) => {
      return previousValue + currentItem.count * currentItem.price
    }, 0)
  })

  function add (id) {
    cartModel[id]++
  }

  function subtract (id) {
    cartModel[id]--
    if (cartModel[id] <= 0) {
      delete cartModel[id]
    }
  }

  return {
    cartProd,
    add,
    subtract,
    cartModel,
    sum
  }
}
