<template>
  <div class="card">
    <div class="products-filter">
      <shop-filter v-model="filterData"></shop-filter>
    </div>
    <div class="products-table">
      <shop-card
        v-for="product in products"
        :key="product.id"
        :product="product"
      ></shop-card>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useProducts } from '../use/loadData'
import ShopCard from '../components/shop/ShopCard.vue'
import ShopFilter from '../components/shop/ShopFilter.vue'

export default {
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const filterData = ref({})
    const dataForCart = ref({})

    onMounted(async () => {
      await useProducts()
      filterData.value = route.query
    })

    const products = computed(() => {
      return store.getters['product/getProducts']
        .filter((item) => {
          if (filterData.value.input) {
            return item.title.toLowerCase()
              .includes(filterData.value.input.toLowerCase())
          }
          return item
        })
        .filter((item) => {
          if (filterData.value.category) {
            return item.category === filterData.value.category
          }
          return item
        })
    })

    const addToCart = (data) => {
      dataForCart.value[data.id] = data.count
      if (data.count <= 0) {
        delete dataForCart.value[data.id]
      }
    }

    watch(filterData, (filterFields) => {
      router.replace({ path: '/', query: filterFields })
    })

    return {
      products,
      filterData,
      addToCart,
      dataForCart
    }
  },
  components: { ShopCard, ShopFilter }
}
</script>

<style scoped>
  .card {
    border-radius: 4px;
    padding: 0;
    display: flex;
  }
</style>
