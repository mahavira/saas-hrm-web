const fs = require('fs')
const { resolve } = require('path')
export default function () {
  // Add hook for modules
  this.nuxt.hook('build:extendRoutes', (routes, r) => {
    const conf = []
    const names = []
    for (let i = routes.length - 1; i >= 0; i -= 1) {
      const route = routes[i]
      if (/\.conf$/.test(route.path)) {
        routes.splice(i, 1)
        const name = route.path.replace(/\/index\.conf$/, '').replace(/\.conf$/, '')
        const n = name.replace('-', '').replace('.', '').replace(/\//ig, '')
        names.push(`  '${name}': ${n}`)
        conf.push(`import * as ${n} from '../pages${route.path}' /* webpackChunkName: "${route.chunkName}" */`)
      }
    }
    let str = conf.join('\n')
    str += '\nexport default {\n'
    str += names.join(',\n')
    str += '\n}\n'
    console.log('module', str)

    // This will be called when all modules finished loading
    fs.writeFile(resolve('./config/mods-conf.js'), str, 'utf8', function (err) {
      // 如果err=null，表示文件使用成功，否则，表示希尔文件失败
      if (err) { console.log('写文件出错了! ' + err) } else { console.log('ok') }
    })
  })

  // Add hook for renderer
  this.nuxt.hook('renderer', (renderer) => {
    console.log('renderer')

    // This will be called when renderer was created
  })
}
