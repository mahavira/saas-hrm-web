import { SELECT, INPUT, INPUT_NUMBER, DATE_PICKER, CHECKBOX } from '~/constant/formItemType'

export const urls = {
  create: '/mock/recruit/offer/all/create',
  query: '/mock/recruit/offer/all/query',
  update: '/mock/recruit/offer/all/update',
  delete: 'mock/recruit/offer/all/delete',
  read: '/mock/recruit/offer/all/read',
  moveCandidate: ''
}
export const primaryKey = ''
const commonField = {
  name: {
    label: '姓名',
    'class-name': 'is-blod'
  },
  job: {
    label: '招聘职位',
    formType: SELECT,
    options: 'job'
  },
  gender: {
    label: '性别',
    formType: CHECKBOX,
    options: 'gender'
  },
  age: {
    label: '年龄',
    formType: INPUT_NUMBER
  },
  work_age: {
    label: '工作年限',
    formType: INPUT_NUMBER
  },
  education: {
    label: '学历',
    formType: SELECT,
    options: 'education'
  },
  graduate_school: {
    label: '毕业院校',
    formType: INPUT
  },
  offState: {
    label: '毕业专业',
    formType: SELECT,
    options: 'offState'
  },
  offerSendDt: {
    label: '最近工作单位',
    formType: INPUT
  },
  phone: {
    label: '手机号',
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

const createFields = {
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

const moveCandidateFormItems = {
  entryDt: {
    label: '应聘职位',
    formType: SELECT,
    options: 'entryDt',
    rules: [{ required: true, message: '请选择应聘职位' }]
  },
  entryDep: {
    label: '应聘渠道',
    formType: INPUT,
    options: 'dep'
  }
}

const changeJobFormItems = {
  entryDt: {
    label: '应聘职位',
    formType: SELECT,
    options: 'entryDt',
    rules: [{ required: true, message: '请选择应聘职位' }]
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
export const dialog = {
  create: {
    title: '添加人才',
    fields: createFields,
    url: urls.create,
    refresh: true
  },
  moveCandidate: {
    title: '添加到候选人',
    fields: moveCandidateFormItems,
    url: urls.create,
    refresh: true,
    labelWidth: 80,
    confirmButtonText: '确 认',
    mode: 'single'
  },
  changeJobFormItems: {
    title: '更改应聘职位',
    fields: changeJobFormItems,
    url: urls.create,
    mode: 'single',
    confirmButtonText: '确 认',
    labelWidth: 80,
    callback: (data, context) => {
    }
  }
}
export const handler = [{
  color: 'primary',
  icon: 'icon-ico_new-additions',
  label: '添加人才',
  options: [{
    label: '单个添加人才',
    icon: 'icon-ico_new-additions',
    action: 'dialog:create'
  }, {
    label: '批量导入简历',
    icon: 'icon-ico_import',
    action: 'dialog:import'
  }]
}, {
  color: 'default',
  icon: 'icon-ico_export-and-import is-primary',
  label: '导出/导入',
  options: [{
    label: '批量导出人才',
    icon: 'icon-ico_import',
    action: ''
  }, {
    label: '批量导入人才',
    icon: 'icon-ico_export',
    action: ''
  }]
}, {
  color: 'default',
  action: 'DROPDOWN',
  label: '批量',
  options: [{
    label: '批量更改应聘',
    icon: 'icon-ico_import',
    action: ''
  }, {
    label: '批量下载简历',
    icon: 'icon-ico_export',
    action: ''
  }, {
    label: '更改应聘职位',
    icon: 'icon-ico_edit',
    action: 'dialog:changeJobFormItems'
  }]
}]

export const editHandler = [{
  color: 'default',
  icon: 'icon-ico_file is-primary',
  action: context => context.$router.push(`/recruit/talent/${context.currentRow.id}`),
  label: '人员档案'
}, {
  color: 'default',
  icon: 'icon-ico_transformation is-primary',
  label: '移动人才',
  options: [{
    label: '移动到候选人',
    icon: 'icon-ico_revoke',
    action: 'dialog:moveCandidate'
  }, {
    label: '移出人才库',
    icon: 'icon-ico_revoke',
    action: 'onRemove'
  }]
}, {
  color: 'default',
  icon: 'icon-ico_edit is-primary',
  action: 'detail:edited',
  label: '快速编辑'
}, {
  color: 'default',
  label: '更多功能',
  options: [{
    label: '导出人才简历',
    icon: 'icon-ico_export',
    action: ''
  }, {
    label: '发送offer',
    icon: 'icon-ico_send-out',
    action: ''
  }]
}]
