export const modFields = {}
const fields = {}
const requireContext = require.context('./', false, /\.yml$/)
requireContext.keys().forEach((key) => {
  const context = requireContext(key)
  const name = key.replace(/^\.\//, '').replace(/\.\w+$/, '')
  const data = context.default || context
  Object.assign(fields, data)
  modFields[name] = data
})
export function getFields (name) {
  return fields[name] || {}
}

export default fields
