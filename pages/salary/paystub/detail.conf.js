import { SELECT } from '~/constant/FORMITEM_TYPE'

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
  hasPhone: {
    label: '手机',
    formType: SELECT,
    formatter: (row) => {
      return `<i class="el-icon-mobile-phone ${row.hasPhone ? 'is-primary' : ''}"></i>`
    }
  },
  hasMail: {
    label: '邮箱',
    formatter: (row) => {
      return `<i class="el-icon-message ${row.hasPhone ? 'is-primary' : ''}"></i>`
    }
  },
  handler: {
    label: '操作',
    actions: ['EDIT']
  }
}

export const isCondensed = true
export const hideHeader = true
