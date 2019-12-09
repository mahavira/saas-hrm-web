export const mods = {}
const requireContext = require.context('../pages', true, /\.conf\.js$/)
requireContext.keys().forEach((key) => {
  const context = requireContext(key)
  const name = key.replace(/^\./, '').replace(/\.conf\.\w+$/, '').replace(/\/index$/, '')
  const data = context.default || context
  mods[name] = data
})
console.table(mods, 'index')
export default function get (key, name = null) {
  const mod = mods[key]
  if (!mod) {
    console.warn('未提供配置文件')
    return null
  }
  if (!name) {
    return mod
  } else if (mod[name]) {
    return mod[name]
  }
  return null
}
