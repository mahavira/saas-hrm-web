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
