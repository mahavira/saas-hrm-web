const svgs = []
const requireContextsvg = require.context('../assets/svg', true, /\.svg$/)
requireContextsvg.keys().forEach((key) => {
  const name = key.replace(/^\./, './svg')
  svgs.push(name)
})
const stt = svgs.map((svg) => {
  return `&.form_btn_add_icon{
    background-image: url(${svg});
  }`
}).join('\n')
console.log(stt)
