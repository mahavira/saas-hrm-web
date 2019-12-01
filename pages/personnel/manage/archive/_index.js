import { createHOC } from 'vue-hoc'
import { getConf } from './.conf'
import TableContainer from '~/components/table-container'

const options = {
  props () {
    return {
      ...getConf(this.$route.params.index)
    }
  },
  listeners: {
    someEvent (arg) {
    }
  }
}

export default createHOC(TableContainer, {}, options)
