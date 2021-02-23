<template>
  <div class="breadcrumbs" v-if="back">
    <router-link to="/" class="text-white">Вернуться к товарам</router-link>
  </div>
  <div :class="['card', {center}]">
    <h1 v-if="title" class="card-title">
      {{title}}
      <slot name="header"/>
    </h1>
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    back: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean
    }
  }
}
</script>

<style scoped>
  .text-white:hover{
    opacity: .85;
  }
</style>
