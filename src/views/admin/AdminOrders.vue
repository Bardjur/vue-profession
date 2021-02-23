<template>
  <div class="card"
    v-for="order in orders"
    :key="order.id"
  >
  <h4>ID пользователя: <span class="text-danger">{{order.userId}}</span></h4>
    <p>Накладная № <strong>{{ order.id }}</strong> от {{new Date(order.date).toISOString()}}</p>
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Название</th>
          <th>Цена</th>
          <th>Коли&shy;чество</th>
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
    })

    const orders = computed(() => {
      return store.getters['order/getOrders']
    })

    return {
      orders
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
