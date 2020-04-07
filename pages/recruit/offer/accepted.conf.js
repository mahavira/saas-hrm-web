import { SELECT, INPUT, DATE_PICKER } from '~/constant/FORMITEM_TYPE'

export const urls = {
  create: '/mock/recruit/offer/accepted/create',
  query: '/mock/recruit/offer/accepted/query',
  update: '/mock/recruit/offer/accepted/update',
  delete: 'mock/recruit/offer/accepted/delete',
  read: '/mock/recruit/offer/accepted/read'
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
    width: 60,
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
  icon: 'icon-ico_delete is-primary',
  action: 'table:selected',
  label: '批量删除'
}]

export const editHandler = [{
  type: 'button',
  color: 'default',
  icon: 'icon-ico_file is-primary',
  action: 'openArchive',
  label: '资料档案'
}, {
  type: 'button',
  color: 'default',
  icon: 'icon-ico_eye is-primary',
  action: 'openOffer',
  label: '查看offer'
}]
