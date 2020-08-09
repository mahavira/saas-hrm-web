const fs = require('fs')
const path = '/../assets/webfont/'
const style = fs.readFileSync(__dirname + path + 'style.css')
const icons = []
style.toString().replace(/\.(.*):before/ig, function (a, b, c) {
  icons.push(b)
})
const html = `<link rel="stylesheet" href="style.css"></head>
<div class="items">
${
  icons.map((icon) => {
    return `<div class="item"><span class="${icon}"></span><input value="${icon}"></input></div>`
  }).join('')
}
</div>
<style>
.items{
  display:flex;
  flex-wrap: wrap;
  font-size: 16px;
}
.item{
  flex: 0 0 200px;
  margin: 10px;
}
.item input{
  margin-left: 10px;
  border: none;
  outline: none;
}
</style>
<script>
document.body.addEventListener('click', function (e) {
  const target = e.target
  if (target.tagName === 'INPUT') {
    target.select()
    document.execCommand('Copy')
  }
});
</script>
`
fs.writeFileSync(__dirname + path + 'index.html', html)
