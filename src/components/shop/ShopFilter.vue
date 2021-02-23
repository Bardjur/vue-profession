<template>
  <div class="form-control">
    <input
      :value="modelValue.input"
      @input="changeValue('input', $event.target.value)"
      type="text" placeholder="Найти товар...">
    <span class="form-control-clear" @click="changeValue('input', '')">&times;</span>
  </div>
  <ul class="list">
    <li :class="['list-item', { active: !modelValue.category }]" @click="changeValue('category','')">Все</li>
    <li
      :class="['list-item', { active: modelValue.category === category.type }]"
      @click="changeValue('category', category.type)"
      v-for="category in categories"
      :key="category.id"
    >
      {{category.title}}
    </li>
  </ul>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useCategories } from '../../use/loadData'

export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const store = useStore()

    onMounted(async () => {
      await useCategories()
    })

    const categories = computed(() => {
      return store.getters['category/getCategories']
    })

    const changeValue = (type, value) => {
      const data = {
        input: props.modelValue.input,
        category: props.modelValue.category
      }
      data[type] = value
      for (const key in data) {
        if (!data[key]) { delete data[key] }
      }
      emit('update:modelValue', data)
    }

    return {
      changeValue,
      categories
    }
  }

}
</script>

<style scoped>
  .list a{ color: #2c3e50;}
</style>
