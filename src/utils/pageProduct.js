export function pageProduct (page, size, count, productArr) {
  const getArr = (first, last) => {
    const arr = []
    for (let i = first; i <= last; i++) {
      arr.push(productArr[i])
    }
    return arr
  }

  const pageProducts = () => {
    if (page === 1) {
      return getArr(0, size - 1)
    } else if (page === (Math.ceil(count / size))) {
      return getArr(((page - 1) * size), count - 1)
    } else {
      return getArr((page - 1) * size, (page * size) - 1)
    }
  }

  return pageProducts(page, size, count)
}
