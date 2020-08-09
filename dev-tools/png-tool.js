const svgs = []
const requireContextsvg = require.context('../assets/icon', true, /\.png$/)
requireContextsvg.keys().forEach((key) => {
  console.log(key)
  const name = key.replace(/^\.\//, '').replace(/\.png$/, '')
  svgs.push(name)
})
const stt = svgs.map((item) => {
  return `&.${item}{
  background-image: url(./icon/${item}.png);
}`
}).join('\n')
console.log(stt)
