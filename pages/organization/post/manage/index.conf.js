import { SELECT, INPUT, DATE_PICKER } from '~/constant/formItemType'

export const urls = {
  create: '/mock/recruit/offer/all/create',
  query: '/mock/recruit/offer/all/query',
  update: '/mock/recruit/offer/all/update',
  delete: 'mock/recruit/offer/all/delete',
  read: '/mock/recruit/offer/all/read'
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
  offState: {
    label: 'offer 状态',
    formType: SELECT,
    options: 'offState'
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
