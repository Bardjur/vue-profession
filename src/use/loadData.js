import { useStore } from 'vuex'

export async function useProducts () {
  const store = useStore()

  if (store.getters['product/getProducts'].length === 0) {
    await store.dispatch('product/loadProducts')
  }
}

export async function useCategories () {
  const store = useStore()

  if (store.getters['category/getCategories'].length === 0) {
    await store.dispatch('category/loadCategories')
  }
}
