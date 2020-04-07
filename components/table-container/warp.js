import { createHOC } from 'vue-hoc'
import TableContainer from './index.vue'
export default (e) => {
  console.log(createHOC(TableContainer, null, {
    props: e
  }))
  return createHOC(TableContainer, null, {
    props: e
  })
}
