import { ref } from 'vue'

export function addToCart (product, emit) {
  const dataForCart = ref({})

  const addToCart = () => {
    dataForCart.value.id = product.id
    dataForCart.value.count = 1
    emit('addToCart', dataForCart.value)
  }

  function add () {
    dataForCart.value.count++
    emit('addToCart', dataForCart.value)
  }

  function subtract () {
    dataForCart.value.count--
    emit('addToCart', dataForCart.value)
    if (dataForCart.value.count <= 0) {
      delete dataForCart.value.count
    }
  }
  return {
    dataForCart,
    addToCart,
    add,
    subtract
  }
}
