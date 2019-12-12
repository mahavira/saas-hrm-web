import { SELECT, DATE_PICKER } from '~/constant/formItemType'

export const urls = {
  create: '/mock/salary/manage/payroll/detail/create',
  query: '/mock/salary/manage/payroll/detail/query',
  update: '/mock/salary/manage/payroll/detail/update',
  delete: '/mock/salary/manage/payroll/detail/delete',
  read: '/mock/salary/manage/payroll/detail/read'
}
export const primaryKey = ''

export const tableFields = {
  name: {
    label: '姓名',
    'class-name': 'is-blod'
  },
  staffNo: {
    label: '工号'
  },
  organName: {
    label: '所属部门'
  },
  postName: {
    label: '岗位'
  },
  workNature: {
    label: '月计薪时长'
  },
  education: {
    label: '试用期基本工资'
  },
  graduatedSchool: {
    label: '基本工资'
  },
  graduationMajor: {
    label: '实发工资'
  },
  handler: {
    label: '操作',
    actions: ['EDIT']
  }
}

export const editFields = {
  name: {
    label: '姓名',
    'class-name': 'is-blod'
  },
  staffNo: {
    label: '工号'
  },
  empty: { divider: true, line: true },
  entryDt: {
    label: '部门',
    formType: DATE_PICKER
  },
  entryDep: {
    label: '岗位',
    formType: SELECT,
    options: 'dep'
  },
  entryJob: {
    label: '月计薪时长',
    formType: SELECT,
    options: 'job'
  }
}
export const dialog = {
  create: {
    title: '添加招聘职位',
    callback: () => {
      console.log(10)
    }
  }
}
export const isCondensed = true

export const handler = [{
  color: 'default',
  icon: 'icon-ico_send-out is-primary',
  action: 'dialog:create',
  label: '发放工资条'
}]

export const editHandler = [{
  color: 'default',
  icon: 'icon-ico_eye is-primary',
  action: '',
  label: '员工档案'
}]
