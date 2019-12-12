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
export const dialog = {
  create: {
    fields: commonField,
    title: '添加招聘职位',
    callback: () => {
      console.log(10)
    }
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

export const searchPlaceholder = '职位名称'

export const handler = [{
  color: 'primary',
  icon: 'icon-ico_new-additions',
  action: 'dialog:create',
  label: '添加职位'
}, {
  color: 'default',
  icon: 'icon-ico_import is-primary',
  action: 'table:selected',
  label: '导 出'
}, {
  color: 'default',
  icon: 'is-primary icon-ico_batch',
  action: 'table:selected',
  label: '批 量'
}]

export const editHandler = [{
  color: 'primary',
  icon: 'icon-ico_withdraw-account',
  action: '',
  label: '重启招聘'
}, {
  color: 'default',
  icon: 'icon-ico_edit is-primary',
  action: 'detail:edited',
  label: '快速编辑'
}]
