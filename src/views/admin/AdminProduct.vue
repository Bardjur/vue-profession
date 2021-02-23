<template>
  <app-loader v-if="!loaded"></app-loader>
  <app-page :title="product.title" v-else-if="Object.keys(product).length !== 0">
    <div class="text-center">
      <img :src="product.img">
    </div>

    <admin-form-product v-if="product && categories"
      :product="product"
      :categories="categories"
    ></admin-form-product>
  </app-page>
  <h3 class="text-center text-white" v-else>
    Товар не найден.
  </h3>
  <pre style="color: red">{{}}</pre>
</template>

<script>
import AppPage from '../../components/ui/AppPage'
import { onMounted, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useCategories } from '../../use/loadData'
import AdminFormProduct from '../../components/admin/forms/AdminFormProduct.vue'
import AppLoader from '../../components/ui/AppLoader'

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
      await useCategories()
      await store.dispatch('product/loadProduct', props.id)
      loaded.value = true
    })

    const categories = computed(() => {
      return store.getters['category/getCategories']
    })
    const product = computed(() => {
      return store.getters['product/getProduct']
    })
    return {
      product,
      categories,
      loaded
    }
  },
  components: { AppPage, AdminFormProduct, AppLoader }
}
</script>
