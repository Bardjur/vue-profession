<template>
      <tr
        v-for="product in products"
        :key="product.id">
        <td>{{product.title}}</td>
        <td>
          <app-control-buttons :product="product" />
        </td>
        <td>{{currency(product.price)}}</td>
      </tr>
</template>

<script>
import { currency } from '../../utils/currencyProd'
import AppControlButtons from '../ui/AppControlButtons.vue'

export default {
  props: {
    products: {
      type: Object,
      required: true
    }
  },
  setup () {
    return { currency }
  },
  components: { AppControlButtons }
}
</script>
