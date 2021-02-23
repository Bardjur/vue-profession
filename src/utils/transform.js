export function transform (arr) {
  const res = Object.keys(arr).map(key => {
    return { ...arr[key], id: key }
  })
  return arr ? res : []
}
