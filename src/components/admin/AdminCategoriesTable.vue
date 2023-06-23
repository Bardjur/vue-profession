<template>
  <table class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Назва</th>
        <th>Тип</th>
        <th>Дія</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(category, idx) in categories" :key="category.id">
        <td>{{idx + 1}}</td>
        <td>{{category.title}}</td>
        <td>{{category.type}}</td>
        <td>
          <button class="btn danger" @click="data={id: category.id, type: category.type}, confirm = true">Видалити</button>
        </td>
      </tr>
    </tbody>
  </table>

  <teleport to="body">
    <app-confirm
      title="Ви бажаєте видалити?"
      v-if="confirm"
      @reject="confirm = false"
      @confirm="del"
    >

    </app-confirm>
  </teleport>
</template>

<script>
import { ref } from 'vue'
import AppConfirm from '../ui/AppConfirm.vue'
export default {
  props: ['categories'],
  emits: ['remove'],
  setup (_, { emit }) {
    const confirm = ref(false)
    const data = ref({})

    const del = () => {
      confirm.value = false
      emit('remove', data.value)
    }
    return {
      confirm,
      del,
      data
    }
  },
  components: { AppConfirm }
}
</script>

<style scoped>
  img{
    width: 30px;
  }
</style>
