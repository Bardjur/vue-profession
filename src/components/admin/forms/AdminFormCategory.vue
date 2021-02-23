<template>
  <div>
    <form class="" @submit.prevent="onSubmit">
      <div :class="['form-control', { invalid: errors['title'] }]">
        <label for="title">Название</label>
        <input type="text" id="title" v-model="title" @blur="titleBlur">
        <small v-if="errors['title']">{{ errors['title'] }}</small>
      </div>
      <div :class="['form-control', { invalid: errors['type'] }]">
        <label for="type">Тип</label>
        <input type="text" id="type" v-model="type" @blur="typeBlur">
        <small v-if="errors['type']">{{ errors['type'] }}</small>
      </div>
      <button class="btn primary" :disabled="isSubmitting">Создать</button>
    </form>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useAdminCategoryForm } from '@/use/admin-category-form'
export default {
  emits: ['created'],
  setup (_, { emit }) {
    const store = useStore()
    const submit = async values => {
      await store.dispatch('category/createCategory', values)
      emit('created')
    }

    return {
      ...useAdminCategoryForm(submit)
    }
  }
}
</script>
