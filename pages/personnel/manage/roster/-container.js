import { createHOC } from 'vue-hoc'
import * as conf from './.conf'
import TableContainer from '~/components/table-container'
const options = {
  props () {
    return {
      ...conf,
      handler: [{
        type: 'button',
        color: 'primary',
        icon: 'el-icon-plus',
        handler: 'ADD',
        label: '添加员工'
      }, {
        type: 'button',
        color: 'default',
        icon: 'el-icon-upload2 is-primary',
        handler: 'IMPORT',
        label: '导入名册'
      }, {
        type: 'button',
        color: 'default',
        icon: 'el-icon-delete-solid is-primary',
        handler: 'DELETE',
        label: '批量删除'
      }],
      editHandler: [{
        type: 'button',
        color: 'primary',
        icon: 'el-icon-check',
        handler: 'ADD',
        label: '确认入职'
      }, {
        type: 'button',
        color: 'default',
        icon: 'el-icon-edit is-primary',
        handler: 'EDIT',
        label: '快速编辑'
      }, {
        type: 'button',
        color: 'default',
        icon: 'el-icon-view is-primary',
        handler: 'toInfo',
        label: '员工档案'
      }]
    }
  }
}

export default createHOC(TableContainer, { functional: true }, options)
