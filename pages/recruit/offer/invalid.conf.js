import { SELECT, INPUT, DATE_PICKER } from '~/constant/formItemType'

export const urls = {
  create: '/mock/recruit/offer/invalid/create',
  query: '/mock/recruit/offer/invalid/query',
  update: '/mock/recruit/offer/invalid/update',
  delete: 'mock/recruit/offer/invalid/delete',
  read: '/mock/recruit/offer/invalid/read'
}
export const primaryKey = ''
const commonField = {
  name: {
    label: '姓名',
    'class-name': 'is-blod'
  },
  job: {
    label: '应聘职位',
    formType: SELECT,
    options: 'job'
  },
  candidateState: {
    label: '候选人状态',
    formType: SELECT,
    options: 'candidateState'
  },
  offerSendDt: {
    label: 'Offer发送时间',
    formType: DATE_PICKER
  },
  invalidDt: {
    label: '失效时间',
    formType: INPUT
  },
  invalidReason: {
    label: '失效原因',
    formType: INPUT
  },
  sendfrom: {
    label: '发送人',
    formType: INPUT
  },
  phone: {
    label: '手机号',
    formType: INPUT
  },
  email: {
    label: '邮箱',
    formType: INPUT
  }
}
export const tableFields = {
  ...commonField,
  handler: {
    label: '操作',
    actions: ['EDIT']
  }
}

export const editFields = {
  ...commonField,
  entryDt: {
    label: '入职日期',
    formType: DATE_PICKER
  },
  entryDep: {
    label: '入职部门',
    formType: SELECT,
    options: 'dep'
  },
  entryJob: {
    label: '入职岗位',
    formType: SELECT,
    options: 'job'
  }
}

export const searchPlaceholder = '姓名/手机号/邮箱'

export const handler = [{
  type: 'button',
  color: 'default',
  icon: 'el-icon-delete is-primary',
  action: 'table:selected',
  label: '批量删除'
}]

export const editHandler = [{
  type: 'button',
  color: 'default',
  icon: 'el-icon-document is-primary',
  action: '',
  label: '资料档案'
}, {
  type: 'button',
  color: 'default',
  icon: 'el-icon-view is-primary',
  action: 'openOffer',
  label: '查看offer'
}]
