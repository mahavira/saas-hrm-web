import { SELECT, INPUT, DATE_PICKER, INPUT_NUMBER } from '~/constant/formItemType'

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
    label: '职位名称',
    'class-name': 'is-blod'
  },
  job: {
    label: '用人部门',
    formType: INPUT,
    options: 'job'
  },
  gender: {
    label: '工作性质',
    formType: SELECT,
    options: 'gender'
  },
  age: {
    label: '学历要求',
    formType: INPUT_NUMBER
  },
  work_age: {
    label: '工作经验要求',
    formType: INPUT_NUMBER
  },
  education: {
    label: '工作城市',
    formType: SELECT,
    options: 'education'
  },
  graduate_school: {
    label: '最迟到岗日期',
    formType: INPUT
  },
  offState: {
    label: '招聘人数',
    formType: SELECT,
    options: 'offState'
  },
  offerSendDt: {
    label: '已入职人数',
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
export const dialog = {
  create: {
    fields: commonField,
    title: '添加招聘职位',
    callback: () => {
      console.log(10)
    }
  }
}
export const searchPlaceholder = '职位名称'

export const handler = [{
  color: 'default',
  icon: 'el-icon-plus is-primary',
  action: 'dialog:create',
  label: '添加职位'
}, {
  color: 'default',
  icon: 'el-icon-download is-primary',
  action: 'table:selected',
  label: '导出'
}, {
  color: 'default',
  icon: 'el-icon-delete is-primary',
  action: 'table:selected',
  label: '批量'
}]

export const editHandler = [{
  color: 'primary',
  icon: 'el-icon-circle-close',
  action: '',
  label: '停止招聘'
}, {
  color: 'default',
  icon: 'el-icon-edit is-primary',
  action: 'detail:edited',
  label: '快速编辑'
}]
