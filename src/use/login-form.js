import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { computed, watch } from 'vue'

export function useLoginForm (auth) {
  const schema = yup.object({
    email: yup.string()
      .trim()
      .required('Введите email')
      .email('Не корректный email'),
    password: yup.string()
      .required('Введите пароль')
      .min(6, 'Пароль не может быть меньше 6 символов')
  })
  const { handleSubmit, isSubmitting, submitCount, errors } = useForm({ validationSchema: schema })

  const { value: email, handleBlur: eBlur } = useField('email')
  const { value: password, handleBlur: pBlur } = useField('password')

  const isTooManyAttempts = computed(() => submitCount.value >= 3)
  watch(isTooManyAttempts, val => {
    if (val) {
      setTimeout(() => { submitCount.value = 0 }, 5000)
    }
  })

  const onSubmit = handleSubmit(auth)

  return {
    email,
    eBlur,
    password,
    pBlur,
    errors,
    isSubmitting,
    onSubmit,
    isTooManyAttempts,
    handleSubmit
  }
}
