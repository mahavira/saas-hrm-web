import { createHOC } from 'vue-hoc'
import { getDefaultConf } from './.conf/index'
import TableContainer from '~/components/table-container'

const options = {
  props () {
    return {
      ...getDefaultConf(this.$route.params.index)
    }
  },
  listeners: {
    someEvent (arg) {
    }
  }
}

export default createHOC(TableContainer, {}, options)
