import wrap from '@/components/table-container/warp'
import { SELECT, INPUT, DATE_PICKER } from '~/constant/FORMITEM_TYPE'
import { downloadBlobFile } from '~/utils/file'

export const urls = {
  create: '/hrStaffWaitingEntry/add',
  query: {
    url: '/hrStaffWaitingEntry/list',
    data: { status: 0 }
  },
  update: '/hrStaffWaitingEntry/save',
  delete: '/hrStaffWaitingEntry/delete',
  export: '/hrStaffWaitingEntry/export',
  import: '/hrStaffWaitingEntry/import'
}
export const primaryKey = 'hrStaffWaitingEntryId'

export const tableFields = {
  staffName: {
    label: '姓名',
    'class-name': 'is-blod'
  },
  planEntryDatetime: {
    label: '预计入职日期'
  },
  phone: {
    label: '手机号码'
  },
  email: {
    label: '个人邮箱'
  },
  createUserId: {
    label: '添加人'
  },
  jobWay: {
    label: '招聘渠道',
    options: 'job_way'
  },
  handler: {
    width: 60,
    label: '操作',
    actions: ['EDIT']
  }
}
const commonField = {
  organId: {
    label: '预计入职日期',
    formType: DATE_PICKER
  },
  workNature: {
    label: '手机号码',
    formType: INPUT
  },
  academicRequirements: {
    label: '个人邮箱',
    formType: INPUT
  },
  recruitWorkExperience: {
    label: '添加人',
    formType: SELECT
  },
  workPlaceCity: {
    label: '招聘渠道',
    options: 'job_way',
    formType: SELECT
  }
}
export const editFields = {
  ...commonField
}
export const dialog = {
  create: {
    fields: commonField,
    url: urls.create,
    title: '添加人员',
    refresh: true,
    callback: (done) => {
      console.log(done)
    }
  }
  // stopRecruit: require('./stopRecruit.dialog')
}
export const handler = [{
  color: 'primary',
  icon: 'icon-ico_new-additions',
  action: 'dialog:create',
  label: '添加员工'
}, {
  color: 'default',
  label: '批 量',
  options: [{
    label: '批量确认入职',
    icon: 'icon-ico_choice_sure',
    async action () {
      const rows = await this.openSelectRows()
      await this.$confirm('执行操作后，选中的人员将自动转为在职员工，入职日期为预定的日期', '批量确认入职', {
        confirmButtonText: '确 认',
        cancelButtonText: '取 消',
        type: 'warning'
      })
      await this.$axios.post('/hrStaffWaitingEntry/entrybatch', {
        hrStaffWaitingEntryIds: rows.map(item => item.hrStaffWaitingEntryId).join()
      })
    }
  }, {
    label: '批量放弃入职',
    icon: 'icon-ico_cancel',
    async action () {
      const rows = await this.openSelectRows()
      await this.$axios.post('/hrStaffWaitingEntry/giveup', {
        hrStaffWaitingEntryIds: rows.map(item => item.hrStaffWaitingEntryId).join()
      })
    }
  }, {
    label: '批量删除',
    icon: 'icon-ico_delete',
    async action () {
      const rows = await this.openSelectRows()
      await this.$confirm('删除后不可恢复，确定要删除吗？', '批量删除', {
        confirmButtonText: '确定',
        cancelButtonText: '暂不删除',
        type: 'error'
      })
      await this.$axios.post(urls.delete, {
        hrStaffWaitingEntryIds: rows.map(item => item.hrStaffWaitingEntryId).join()
      })
    }
  }, {
    label: '导出',
    icon: 'icon-ico_export',
    async action () {
      const rows = await this.openSelectRows()
      const { data } = await this.$axios.post(urls.export, {
        hrStaffWaitingEntryIds: rows.map(item => item.hrStaffWaitingEntryId).join()
      })
      downloadBlobFile(data)
    }
  }]
}]

export const editHandler = [{
  color: 'primary',
  icon: 'icon-ico_sure',
  action: 'onStopRecruit',
  label: '确认入职'
}, {
  color: 'default',
  icon: 'icon-ico_cancel is-primary',
  action: 'onStopRecruit',
  label: '放弃入职'
}, {
  color: 'default',
  label: '更多',
  options: [{
    label: '修改入职信息',
    icon: 'icon-ico_edit is-primary',
    action: 'detail:edited'
  }, {
    label: '查看应聘简历',
    icon: 'icon-ico_eye is-primary'
  }, {
    label: '查看 offer',
    icon: 'icon-ico_eye is-primary'
  }, {
    label: '删 除',
    icon: 'icon-ico_delete',
    action: 'detail:edited'
  }]
}]
export default wrap({
  tableFields,
  primaryKey,
  urls,
  dialog,
  handler,
  editFields,
  editHandler
})
