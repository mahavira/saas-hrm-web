import { SELECT, INPUT, INPUT_NUMBER, DATE_PICKER, CHECKBOX, RADIO } from '~/config/formItemType'

export const urls = {
  create: '/mock/recruit/candidate/create',
  query: '/mock/recruit/candidate/query',
  update: '/mock/recruit/candidate/update',
  delete: 'mock/recruit/candidate/delete',
  read: '/mock/recruit/candidate/read'
}
export const primaryKey = ''
const commonField = {
  name: {
    label: '姓名',
    'cell-class-name': 'is-blod'
  },
  isTalent: {
    label: '',
    hidden: true,
    'cell-class-name': 'el-tag el-tag--warning el-tag--small',
    formatter: (row, column, cellValue, index) => {
      return index % 2 === 0 ? '人才' : ''
    }
  },
  job: {
    label: '招聘职位',
    formType: SELECT,
    options: 'job'
  },
  candidateStatus: {
    label: '候选人状态',
    formType: CHECKBOX,
    options: 'candidateStatus'
  },
  dep: {
    label: '用人部门',
    formType: SELECT,
    options: 'dep'
  },
  director: {
    label: '招聘负责人',
    formType: INPUT
  },
  gender: {
    label: '性别',
    formType: RADIO,
    options: 'gender'
  },
  age: {
    label: '年龄',
    formType: INPUT_NUMBER
  },
  work_age: {
    label: '工作年限',
    formType: INPUT_NUMBER
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
export const editFields = {
  name: {
    label: '姓名',
    'class-name': 'is-blod'
  },
  empty: { divider: true, line: true },
  dep: {
    label: '部门',
    'class-name': 'is-blod',
    formType: SELECT,
    options: 'dep'
  },
  job: {
    label: '岗位',
    'class-name': 'is-blod',
    formType: SELECT,
    options: 'dep'
  },
  s_dt: {
    label: '入职时间',
    formType: DATE_PICKER
  },
  t_dt: {
    label: '转正日期',
    formType: DATE_PICKER
  },
  work: {
    label: '工作性质',
    formType: SELECT,
    options: 'work'
  },
  a: {
    label: '员工状态',
    formType: SELECT,
    options: 'work'
  },
  b: {
    label: '岗位类别',
    formType: SELECT,
    options: 'work'
  },
  c: {
    label: '岗位职级',
    formType: SELECT,
    options: 'work'
  },
  idcardtype: {
    label: '证件类型',
    formType: SELECT,
    options: 'idcardtype'
  },
  idcardnumber: {
    label: '证件号码',
    formType: INPUT
  },
  phone: {
    label: '手机号码',
    formType: INPUT
  },
  empty2: { divider: true },
  contractCompany: {
    label: '合同公司',
    formType: INPUT
  },
  fdsd: {
    label: '司龄',
    formType: INPUT_NUMBER
  },
  workage: {
    label: '工龄',
    formType: INPUT_NUMBER
  },
  edu: {
    label: '最高学历',
    formType: SELECT
  },
  edu_school: {
    label: '毕业院校',
    formType: INPUT
  },
  edu_major: {
    label: '毕业专业',
    formType: SELECT
  }
}
export const dialog = {
  create: {
    title: '添加候选人',
    fields: createFields,
    url: urls.create,
    refresh: true
  }
}
export const handler = [{
  color: 'primary',
  label: '添加员工',
  options: [{
    label: '单个添加候选人',
    icon: 'el-icon-plus',
    action: 'dialog:create'
  }, {
    label: '批量导入简历',
    icon: 'el-icon-plus',
    action: 'showImport'
  }, {
    label: 'Excel导入候选人',
    icon: 'el-icon-plus',
    action: 'showImport'
  }]
}, {
  color: 'default',
  icon: 'el-icon-finished is-primary',
  action: 'EXPORT',
  label: '导 出'
}, {
  color: 'default',
  icon: 'el-icon-brush is-primary',
  action: 'EXPORT',
  label: '一键清理'
}]

export const editHandler = [{
  color: 'primary',
  icon: 'el-icon-check',
  action: '',
  label: '确认入职'
}, {
  color: 'default',
  icon: 'el-icon-edit is-primary',
  action: 'detail:edited',
  label: '快速编辑'
}, {
  color: 'default',
  action: 'showDetail',
  label: '员工档案'
}]
