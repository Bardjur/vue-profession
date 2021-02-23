<template>
  <app-page title="Продукты" v-if="products.length && categories.length">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
    <admin-products-table
      :products="pageProducts"
      :categories="categories"
      :iteration="(page - 1) * size"
    ></admin-products-table>

    <app-pagination :count="products.length" :size="size" v-model="page" />

    <teleport to="body">
      <app-modal title="Создать продукт" v-if="modal" @close="modal = false">
        <admin-form-product @created="modal = false" :categories="categories"></admin-form-product>
      </app-modal>
    </teleport>
  </app-page>
  <app-loader v-else></app-loader>
</template>

<script>
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue'
import { useCategories, useProducts } from '../../use/loadData'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { pageProduct } from '../../utils/pageProduct'

import AppPage from '../../components/ui/AppPage'
import AppLoader from '../../components/ui/AppLoader'
import AppModal from '../../components/ui/AppModal'
import AdminProductsTable from '../../components/admin/AdminProductsTable.vue'
import AdminFormProduct from '../../components/admin/forms/AdminFormProduct.vue'
import AppPagination from '../../components/ui/AppPagination.vue'

export default {
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const modal = ref(false)
    const size = ref(5)
    const page = ref(route.query.page ? +route.query.page : 1)

    onBeforeMount(() => {
      useCategories()
      useProducts()
    })

    const _setPage = () => router.replace({ query: { page: page.value } })

    onMounted(_setPage)
    watch(page, _setPage)

    const products = computed(() => {
      return store.getters['product/getProducts']
    })

    const pageProducts = computed(() => {
      return pageProduct(page.value, size.value, products.value.length, products.value)
    })

    const categories = computed(() => {
      return store.getters['category/getCategories']
    })

    return {
      modal,
      products,
      categories,
      pageProducts,
      page,
      size
    }
  },
  components: { AppPage, AppLoader, AppModal, AdminProductsTable, AdminFormProduct, AppPagination }
}
</script>
