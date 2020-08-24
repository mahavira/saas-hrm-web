import { createHOC } from 'vue-hoc'
import TableContainer from './index.vue'
export default (e) => {
  return createHOC(TableContainer, null, {
    props: e
  })
}
