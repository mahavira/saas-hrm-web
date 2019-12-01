import * as education from './.conf/education.js'
import * as work from './.conf/work.js'
const mods = {
  education,
  work
}

export default mods

export function getConf (name, m = null) {
  const mod = mods[name]
  if (!mod) { return null }
  if (m) { return mod[m] }
  return mod
}
