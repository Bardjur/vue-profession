<template>
    <app-page title="Категории" v-if="categories.length">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
    <admin-categories-table
      :categories="categories"
      @remove="remove"
    ></admin-categories-table>

    <teleport to="body">
      <app-modal title="Создать продукт" v-if="modal" @close="modal = false">
        <admin-form-category @created="modal = false"></admin-form-category>
      </app-modal>
    </teleport>
  </app-page>
  <app-loader v-else></app-loader>
</template>

<script>
import { computed, onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import { useCategories, useProducts } from '../../use/loadData'
import AppPage from '../../components/ui/AppPage'
import AppLoader from '../../components/ui/AppLoader'
import AdminCategoriesTable from '../../components/admin/AdminCategoriesTable.vue'
import AdminFormCategory from '../../components/admin/forms/AdminFormCategory.vue'
import AppModal from '../../components/ui/AppModal.vue'

export default {
  setup () {
    const store = useStore()
    const modal = ref(false)

    onBeforeMount(async () => {
      useCategories()
      useProducts()
    })

    const categories = computed(() => {
      return store.getters['category/getCategories']
    })

    const products = computed(() => {
      return store.getters['product/getProducts']
    })

    const remove = ({ id, type }) => {
      products.value.findIndex(item => item.category === type) >= 0
        ? store.dispatch('changeMessage', {
          value: 'Нельзя удалять категорию в которой есть продукты ',
          type: 'danger'
        })
        : store.dispatch('category/deleteCategory', id)
    }

    return {
      modal,
      categories,
      remove
    }
  },
  components: { AppPage, AppLoader, AdminCategoriesTable, AppModal, AdminFormCategory }
}
</script>

<style lang="scss" scoped>

</style>
