<template>
  <div class="card">
    <h1>Корзина</h1>

    <h3 class="text-center">В корзине пока ничего нет</h3>
    <table class="table">
      <thead>
      <tr>
        <th>Наименование</th>
        <th>Количество</th>
        <th>Цена (шт)</th>
      </tr>
      </thead>
      <tbody>
        <cart-table
          :products="cartProd"
          @add="add"
          @subtract="subtract"
        ></cart-table>
      </tbody>
    </table>
    <hr>
    <p class="text-right"><strong>Всего: {{currency(sum)}} </strong></p>
    <p class="text-right">
      <button class="btn">Оплатить</button>
    </p>
  </div>
</template>

<script>
/* eslint-disable */
import { useCartProducts } from "../use/cartProducts";
import { currency } from "../utils/currencyProd"
import CartTable from '../components/cart/CartTable.vue'
const CART_MODEL = {
  '2': 3,
  '5': 1,
  '10': 8,
  '15': 5
}

export default {
  components: { CartTable },
  setup () {
    return{
      ...useCartProducts(CART_MODEL),
      currency
    }
  }
}
</script>

<style scoped>

</style>