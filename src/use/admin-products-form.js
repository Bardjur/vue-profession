
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

export function useAdminProductsForm (submit) {
  const schema = yup.object({
    title: yup.string()
      .trim()
      .required('Введите название'),
    img: yup.string()
      .trim()
      .required('Введите путь изображения'),
    price: yup.number('Цена должна быть числом')
      .required('Введите цену')
      .min(0, 'цена не может быть меньше 0'),
    category: yup.string().required('Выберите категорию'),
    count: yup.number('Количество должно быть числом')
      .required('Введите количество')
      .min(0, 'количество не может быть меньше 0')
  })
  const { handleSubmit, isSubmitting, errors } = useForm({ validationSchema: schema })

  const { value: title, handleBlur: tBlur } = useField('title')
  const { value: img, handleBlur: imgBlur } = useField('img')
  const { value: price, handleBlur: pBlur } = useField('price')
  const { value: category } = useField('category')
  const { value: count, handleBlur: cBlur } = useField('count')

  const onSubmit = handleSubmit(submit)

  return {
    title,
    tBlur,
    img,
    imgBlur,
    price,
    pBlur,
    category,
    count,
    cBlur,
    errors,
    isSubmitting,
    onSubmit
  }
}
