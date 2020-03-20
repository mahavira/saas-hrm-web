export function isUndef (v) {
  return v === undefined || v === null
}
export function isDef (v) {
  return v !== undefined && v !== null
}
export function isTrue (v) {
  return v === true
}
export function isFalse (v) {
  return v === false
}
const isType = type => target => `[object ${type}]` === Object.prototype.toString.call(target)
export const isRegExp = isType('RegExp')
export const isArray = isType('Array')
export const isString = isType('String')
export const isObject = isType('Object')
export const isFunction = isType('Function')
export const isNumber = isType('Number')

export function isPromise (obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}
export function toBooble (val) {
  return (val === true || val === 1 || val === '1' || val === 'true')
}
/**
 *
 * @param {*} data
 * @param {*} parentId
 * @param {*} map 只读取该映射值
 */
export function translateDataToTree (data, parentId = '') {
  const tree = []
  let temp
  data.forEach((item, index) => {
    if (data[index].parentId === parentId) {
      const obj = data[index]
      temp = translateDataToTree(data, data[index].id)
      if (temp.length > 0) {
        obj.children = temp
      }
      tree.push(obj)
    }
  })
  return tree
}

export function toTree (data, idKey = 'id', parentKey = 'parentId') {
  const result = []
  if (!Array.isArray(data)) {
    return result
  }
  const map = {}
  data.forEach((item) => {
    map[item[idKey]] = item
  })
  data.forEach((item) => {
    const parent = map[item[parentKey]]
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}
/**
 *
 * @param {*} data
 * @param {*} map 只读取该映射值
 */
export function treeToEmap (data, map = {}) {
  const tree = []
  let temp
  data.forEach((item, index) => {
    temp = {}
    Object.keys(map).forEach((n) => {
      temp[map[n]] = item[n]
    })
    if (item.children && item.children.length) {
      temp.children = treeToEmap(item.children, map)
    }
    tree.push(temp)
  })
  return tree
}
