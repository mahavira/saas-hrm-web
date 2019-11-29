const txt = `入职时间
工作性质
手机号码
证件类型/证件号码`
const pinyin = require('node-pinyin')
const txtArr = txt.split(/\n/)
txtArr.forEach((item) => {
  const tt = pinyin(item, {
    style: 'normal'
  })
  const cc = tt.map(c => c[0]).join('')
  console.log(`${cc}: ${item}`)
})
