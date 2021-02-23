<template>
  <admin-navbar></admin-navbar>
  <div class="container with-nav">
    <app-message/>
    <router-view></router-view>
  </div>
</template>

<script>
import AdminNavbar from '../components/admin/AdminNavbar.vue'
import AppMessage from '../components/ui/AppMessage.vue'

export default {
  components: { AppMessage, AdminNavbar }
}
</script>
