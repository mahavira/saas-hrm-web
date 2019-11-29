export const mods = {}
const requireContext = require.context('./conf/', false, /\.js$/)
requireContext.keys().forEach((key) => {
  const context = requireContext(key)
  const name = key.replace(/^\.\//, '').replace(/\.\w+$/, '')
  const data = context.default || context
  mods[name] = data
})

export default mods

export function getConf (name, m = null) {
  const mod = mods[name]
  if (!mod) { return null }
  if (m) { return mod[m] }
  return mod
}
