<template>
  <div>
    <form class="" @submit.prevent="onSubmit">
      <div :class="['form-control', { invalid: errors['title'] }]">
        <label for="title">Название</label>
        <input type="text" id="title" v-model="title" @blur="tBlur">
        <small v-if="errors['title']">{{ errors['title'] }}</small>
      </div>
      <div :class="['form-control', { invalid: errors['img'] }]">
        <label for="img">Изображение</label>
        <input type="text" id="img" v-model="img" @blur="imgBlur">
        <small v-if="errors['img']">{{ errors['img'] }}</small>
      </div>
      <div :class="['form-control', { invalid: errors['price'] }]">
        <label for="price">Цена</label>
        <input type="text" id="price" v-model="price" @blur="pBlur">
        <small v-if="errors['price']">{{ errors['price'] }}</small>
      </div>
      <div :class="['form-control', { invalid: errors['category'] }]">
        <label for="category">Категория</label>
        <select id="category" v-model="category">
          <option
            v-for="item in categories"
            :key="item.id"
            :value="item.type"
          >{{item.title}}</option>
        </select>
        <small v-if="errors['category']">{{ errors['category'] }}</small>
      </div>
      <div :class="['form-control', { invalid: errors['count'] }]">
        <label for="count">Количество</label>
        <input type="text" id="count" v-model="count" @blur="cBlur">
        <small v-if="errors['count']">{{ errors['count'] }}</small>
      </div>
      <button class="btn primary" :disabled="isSubmitting">Создать</button>
    </form>
  </div>
</template>

<script>
import { useStore } from 'vuex'
// import { computed } from 'vue'
import { useAdminProductsForm } from '../../../use/admin-products-form'
export default {
  props: ['categories'],
  emits: ['created'],
  setup (_, { emit }) {
    const store = useStore()
    const submit = async values => {
      await store.dispatch('product/createProduct', values)
      emit('created')
    }

    return {
      ...useAdminProductsForm(submit)
    }
  }
}
</script>
