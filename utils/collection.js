/**
 * 将集合转换为对象集合
 * [name: 1, children: [{ name: 1 }]] => { name: { name: 1, children: { name: 1 } } }
 * @param {*} arr
 * @param {*} key
 * @param {*} childrenKey
 */
export function arr2Obj (arr = [], key = 'name', childrenKey = 'children') {
  const obj = {}
  arr.forEach((item) => {
    if (item[childrenKey]) {
      item[childrenKey] = arr2Obj(item[childrenKey], key, childrenKey)
    }
    obj[item[key]] = item
  })
  return obj
}
/**
 * 查询集合中的子项
 */
export function findChildren (arr = [], paths = [], key = 'name', childrenKey = 'children') {
  let children = []
  const value = paths.shift()
  if (!value) { return arr }
  arr.some((item, i) => {
    if (item[key] === value) {
      children = paths.length ? findChildren(item[childrenKey], paths, key, childrenKey) : item[childrenKey]
      return true
    }
    return false
  })
  return children
}
/**
 * 查询集合中的子项
 */
export function findItem (arr = [], paths = [], key = 'name', childrenKey = 'children') {
  let itemed = []
  const value = paths.shift()
  arr.some((item, i) => {
    if (item[key] === value) {
      itemed = paths.length ? findItem(item[childrenKey], paths, key, childrenKey) : item
      return true
    }
    return false
  })
  return itemed
}
