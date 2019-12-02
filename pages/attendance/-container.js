import { createHOC } from 'vue-hoc'
import { getDefaultConf } from './.conf/index'
import TableContainer from '~/components/table-container'
const options = {
  props () {
    return {
      ...getDefaultConf(),
      handler: [{
        type: 'button',
        color: 'primary',
        icon: 'el-icon-plus',
        handler: 'ADD',
        label: '批量转全职'
      }, {
        type: 'dropdown',
        color: 'default',
        handler: 'IMPORT',
        label: '批量操作',
        options: [{}]
      }],
      editHeader: [{
        label: '集团内人员调动',
        type: 'button',
        color: 'primary',
        icon: 'el-icon-plus',
        handler: 'ADD'
      }]
    }
  },
  created () {}
}

export default createHOC(TableContainer, { functional: true }, options)
