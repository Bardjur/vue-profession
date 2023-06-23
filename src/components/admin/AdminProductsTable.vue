<template>
  <table class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Назва</th>
        <th>Картинка</th>
        <th>Ціна</th>
        <th>Категорія</th>
        <th>Кількість</th>
        <th>Дія</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(product, idx) in products" :key="product.id">
        <td>{{iteration + idx + 1}}</td>
        <td>{{product.title}}</td>
        <td><img :src="product.img"></td>
        <td>{{currency(product.price)}}</td>
        <td>{{findCategory(product.category)}}</td>
        <td>{{product.count}}</td>
        <td>
          <router-link v-slot="{navigate}" custom :to="{name: 'AdminProduct', params: {id: product.id}}">
            <button class="btn" @click="navigate">Відкрити</button>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { currency } from '../../utils/currencyProd'

export default {
  props: ['products', 'categories', 'iteration'],
  setup (props) {
    const findCategory = (types) => {
      return props.categories.find(category => category.type === types).title
    }

    return {
      currency,
      findCategory
    }
  }
}
</script>

<style scoped>
  img{
    width: 30px;
  }
</style>
