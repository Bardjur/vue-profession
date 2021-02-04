/* eslint-disable */
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, watch } from 'vue'

export function useLoginForm() {
  const store = useStore()
  const router = useRouter()

  const schema = yup.object({
    email: yup.string()
           .trim()
           .required('Введите email')
           .email('Не корректный email'),
    password: yup.string()
              .required('Введите пароль')
              .min(6, 'Пароль не может быть меньше 6 символов')
  })
  const {handleSubmit, isSubmitting, submitCount, errors} = useForm({validationSchema: schema})

  const {value: email, handleBlur: eBlur} = useField('email')
  const {value: password, handleBlur: pBlur} = useField('password')

  const isTooManyAttempts = computed(() => submitCount.value >=3)
  watch(isTooManyAttempts, val => {
    if (val) {
      setTimeout(() => submitCount.value = 0, 5000)
    }
  })

  const onSubmit = handleSubmit(values => {
    try {
      store.dispatch('auth/login', values)
      router.push('/cart')
    } catch (e) {}
  })


  return {
    email, eBlur,
    password, pBlur,
    errors,
    isSubmitting,
    onSubmit,
    isTooManyAttempts
  }
}