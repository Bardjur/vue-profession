<template>
  <component :is="layout + '-layout'" ></component>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from './layout/MainLayout.vue'
import AuthLayout from './layout/AuthLayout.vue'
import AdminLayout from './layout/AdminLayout.vue'

export default {

  setup () {
    const route = useRoute()
    const layout = computed(() => route.meta.layout)
    return { layout }
  },
  components: { MainLayout, AuthLayout, AdminLayout }
}
</script>
