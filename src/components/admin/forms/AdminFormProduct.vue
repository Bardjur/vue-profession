<template>
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
      <input type="number" id="price" v-model="price" @blur="pBlur">
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
      <input type="number" id="count" v-model="count" @blur="cBlur">
      <small v-if="errors['count']">{{ errors['count'] }}</small>
    </div>

    <button class="btn primary" :disabled="isSubmitting" v-if="!productData || hasChange">{{productData ? 'Сохранить' : 'Создать'}}</button>
    <button class="btn danger" v-if="productData" @click.prevent="confirm = true">Удалить</button>
  </form>

    <teleport to="body">
    <app-confirm
      title="Дейстивтельно удалить?"
      v-if="confirm"
      @reject="confirm = false"
      @confirm="del"
    >
    </app-confirm>
  </teleport>
  <teleport to="body">
    <app-confirm
      title="Есть несохраненные изменения. Покинуть страницу?"
      v-if="leave"
      @reject="leave = false"
      @confirm="navigate"
    >
    </app-confirm>
  </teleport>
</template>

<script>
import { computed, ref } from 'vue'
import { useAdminProductsForm } from '../../../use/admin-products-form'
import { useLeaveGuard } from '../../../use/leave-guard'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import AppConfirm from '../../ui/AppConfirm.vue'

export default {
  props: {
    categories: {
      type: Object,
      required: true
    },
    product: {
      type: Object
    }
  },
  emits: ['created'],
  setup (props, { emit }) {
    const store = useStore()
    const router = useRouter()
    const confirm = ref(false)
    const productData = ref(props.product ? props.product : undefined)

    const submit = values => {
      props.product
        ? store.dispatch('product/saveProduct', { id: productData.value.id, data: values })
        : store.dispatch('product/createProduct', values)
      emit('created')
      router.push('/admin/products')
    }
    const formFields = { ...useAdminProductsForm(submit) }

    if (props.product) {
      Object.keys(productData.value).map(item => {
        if (item !== 'id') {
          formFields[item].value = productData.value[item]
        }
      })
    }

    const hasChange = computed(() => {
      if (props.product) {
        return Object.keys(productData.value).reduce((acc, key) => {
          return key === 'id' ? acc : (productData.value[key] !== formFields[key].value || acc)
        }, false)
      } else {
        return false
      }
    })

    const del = () => {
      confirm.value = false
      store.dispatch('product/deleteProduct', productData.value.id)
      router.replace('/admin/products')
    }

    return {
      ...formFields,
      productData,
      hasChange,
      confirm,
      del,
      ...useLeaveGuard(hasChange)
    }
  },
  components: { AppConfirm }
}
</script>

<style lang="scss" scoped>

</style>
