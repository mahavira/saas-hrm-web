import wrap from '@/components/table-container/warp'
import { SELECT, INPUT, DATE_PICKER } from '~/constant/FORMITEM_TYPE'

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
  number: {
    label: '工号'
  },
  organ: {
    label: '部门'
  },
  unknown: {
    label: '岗位'
  },
  status: {
    label: '员工状态'
  },
  planEntryDatetime: {
    label: '入职日期'
  },
  phone: {
    label: '手机号码'
  },
  email: {
    label: '个人邮箱'
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
}

export const handler = [{
  icon: 'icon-ico_new-additions',
  action: 'dialog:create',
  label: '添加员工'
}, {
  color: 'default',
  label: '批量删除',
  icon: 'icon-ico_delete is-primary',
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
}]

export const editHandler = [{
  color: 'default',
  label: '查看应聘简历',
  icon: 'icon-ico_eye is-primary'
}, {
  color: 'default',
  label: '查看 offer',
  icon: 'icon-ico_eye is-primary'
}, {
  color: 'default',
  label: '删 除',
  icon: 'icon-ico_delete is-primary'
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
