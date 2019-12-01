import * as wait from './wait.js'
const mods = {
  wait
}

export default mods

export function getConf (name, m = null) {
  const mod = mods[name]
  if (!mod) { return null }
  if (m) { return mod[m] }
  return mod
}

export function getDefaultConf () {
  return mods[Object.keys(mods)[0]]
}
