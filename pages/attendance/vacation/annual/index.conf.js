import { SELECT, DATE_PICKER } from '~/constant/formItemType'

export const urls = {
  create: '/mock/recruit/candidate/create',
  query: '/mock/recruit/candidate/query',
  update: '/mock/recruit/candidate/update',
  delete: 'mock/recruit/candidate/delete',
  read: '/mock/recruit/candidate/read'
}
export const primaryKey = ''
const commonFields = {
  name: {
    label: '姓名',
    'class-name': 'is-blod'
  },
  staffNo: {
    label: '工号'
  },
  organName: {
    label: '部门'
  },
  postName: {
    label: '岗位'
  },
  cage: {
    label: '司龄'
  },
  wage: {
    label: '工龄'
  },
  senH: {
    label: '累计发放年假（小时）',
    minWidth: 160
  },
  useH: {
    label: '累计使用年假（小时）',
    minWidth: 160
  },
  zeroH: {
    label: '累计清零年假（小时）',
    minWidth: 160
  }
}

export const tableFields = {
  ...commonFields,
  handler: {
    label: '操作',
    actions: ['EDIT']
  }
}

export const editFields = {
  ...commonFields,
  senH: {
    label: '累计发放年假',
    minWidth: 160
  },
  useH: {
    label: '累计使用年假',
    minWidth: 160
  },
  zeroH: {
    label: '累计清零年假',
    minWidth: 160
  },
  handler: {
    label: '剩余年假'
  }
}

const createFields = {
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
    title: '添加候选人',
    fields: createFields,
    url: urls.create,
    refresh: true
  }
}
export const handler = [{
  color: 'default',
  label: '批量',
  options: [{
    label: '批量发放',
    icon: 'el-icon-plus',
    action: 'dialog:create'
  }, {
    label: '批量清零',
    icon: 'el-icon-s-open',
    action: 'showImport'
  }, {
    label: '批量修改',
    icon: 'el-icon-edit',
    action: 'showImport'
  }]
}, {
  color: 'default',
  label: '导 出',
  options: [{
    label: '导出年假明细',
    icon: 'el-icon-plus',
    action: 'dialog:create'
  }, {
    label: '导出发放记录',
    icon: 'el-icon-s-open',
    action: 'showImport'
  }, {
    label: '操作记录',
    icon: 'el-icon-edit',
    action: 'showImport'
  }]
}]

export const editHandler = [{
  color: 'default',
  icon: 'el-icon-check',
  action: '',
  label: '员工档案'
}, {
  color: 'default',
  icon: 'el-icon-edit is-primary',
  label: '发放年假'
}, {
  color: 'default',
  icon: 'el-icon-s-open is-primary',
  label: '清零年假'
}, {
  color: 'default',
  icon: 'el-icon-edit is-primary',
  label: '查看记录'
}]
