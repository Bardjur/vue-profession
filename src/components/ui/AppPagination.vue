<template>
  <ul class="pagination">
    <li class="pagination-item">
      <button
        class="btn"
        @click="$emit('update:modelValue', modelValue - 1)"
        :disabled="modelValue === 1">&lt;</button>
    </li>
    <li class="pagination-item" v-for="page in pages" :key="page">
      <button :class="['btn', { active: page == modelValue }]" @click="$emit('update:modelValue', page)">{{page}}</button>
    </li>
    <li class="pagination-item">
      <button
        class="btn"
        @click="$emit('update:modelValue', modelValue + 1)"
        :disabled="modelValue === pages">&gt;</button>
    </li>
  </ul>
</template>

<script>
import { computed } from 'vue'

export default {
  props: ['count', 'size', 'modelValue'],
  emits: ['update:modelValue'],
  setup (props) {
    const pages = computed(() => {
      return Math.ceil(props.count / props.size)
    })

    return {
      pages
    }
  }

}
</script>

<style scoped>
  .pagination {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
  }

  .pagination-item > button {
    border: none;
    border-radius: 8px;
    background: #eee;
    transition: all 0.3s;
    color: inherit;
    font-weight: normal;
    padding: 0.5rem 1rem;
  }

  .pagination-item > button.active {
    background: #3eaf7c;
    color: #fff;
    font-weight: bold;
  }
</style>
