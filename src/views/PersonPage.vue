<template>
  <div class="card"
    v-for="order in orders"
    :key="order.id"
  >
    <p>Накладная № <strong>{{ order.id }}</strong> от {{new Date(order.date).toISOString()}}</p>
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Название</th>
          <th>Цена</th>
          <th>Количество</th>
          <th>Сумма</th>
        </tr>
      </thead>
     <tbody>
        <tr v-for="(product, idx) in order.list" :key="product.id">
          <td>{{ idx + 1 }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.count }}</td>
          <td>{{ product.count * product.price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
  setup () {
    const store = useStore()

    onMounted(async () => {
      await store.dispatch('order/loadOrders')
      store.commit('order/setPersonOrders', user.value.id)
    })

    const user = computed(() => {
      return store.getters['auth/getUser']
    })

    const orders = computed(() => {
      return store.getters['order/getPersonOrders']
    })

    return {
      orders,
      user
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
