
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

export function useAdminCategoryForm (submit) {
  const schema = yup.object({
    title: yup.string()
      .trim()
      .required('Введите название'),
    type: yup.string()
      .trim()
      .required('Введите тип')
  })
  const { handleSubmit, isSubmitting, errors } = useForm({ validationSchema: schema })

  const { value: title, handleBlur: titleBlur } = useField('title')
  const { value: type, handleBlur: typeBlur } = useField('type')

  const onSubmit = handleSubmit(submit)

  return {
    title,
    titleBlur,
    type,
    typeBlur,
    errors,
    isSubmitting,
    onSubmit
  }
}
