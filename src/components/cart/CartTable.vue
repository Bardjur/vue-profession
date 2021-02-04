<template>
      <tr
        v-for="product in products"
        :key="product.id">
        <td>{{product.title}}</td>
        <td>
          <button class="btn primary" @click="add(product.id)">+</button>
          {{product.count}} шт.
          <button class="btn danger" @click="subtract(product.id)">-</button>
        </td>
        <td>{{currency(product.price)}}</td>
      </tr>
</template>

<script>
import { currency } from '../../utils/currencyProd'
export default {
  props: ['products'],
  emits: ['add', 'subtract'],
  setup (_, { emit }) {
    const add = (id) => emit('add', id)
    const subtract = (id) => emit('subtract', id)
    return { add, subtract, currency }
  }
}
</script>
