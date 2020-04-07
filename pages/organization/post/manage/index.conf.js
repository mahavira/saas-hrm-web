import { SELECT, INPUT, DATE_PICKER, SWITCH } from '~/constant/FORMITEM_TYPE'

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
export const dialog = {
  create: {
    title: '新增岗位',
    mode: 'single',
    labelWidth: 80,
    confirmButtonText: '确认',
    fields: {
      post: {
        label: '岗位名称',
        formType: INPUT,
        rules: [{
          required: true,
          message: '请输入岗位名称'
        }]
      },
      postNo: {
        label: '岗位编码',
        formType: INPUT
      },
      postCate: {
        label: '岗位类别',
        formType: SELECT
      },
      org: {
        label: '所属组织',
        formType: SELECT
      }
    }
  },
  update: {
    title: '批量修改',
    mode: 'single',
    beforeText: '可批量修改岗位类别、所属组织、职级范围、默认职级等字段信息；请至少选择一个字段作为修改项',
    labelWidth: 100,
    confirmButtonText: '确认',
    fields: {
      postCate: {
        label: '岗位类别',
        formType: SELECT
      },
      org: {
        label: '所属组织',
        formType: SELECT
      },
      postNo: {
        label: '职级范围',
        formType: SELECT
      },
      postNo2: {
        label: '默认职级',
        formType: SELECT
      },
      postNo3: {
        label: '是否管理岗位',
        formType: SWITCH
      }
    }
  }
}
