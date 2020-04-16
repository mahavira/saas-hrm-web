import { SELECT, INPUT, DATE_PICKER, SWITCH } from '~/constant/FORMITEM_TYPE'
import { toBooble } from '~/utils'
import { downloadBlobFile } from '~/utils/file'

export const urls = {
  create: '/hrTalentArchives/add',
  query: '/hrTalentArchives/list',
  update: '/hrTalentArchives/update',
  delete: '/hrTalentArchives/remove',
  moveCandidate: ''
}
export const primaryKey = 'talentId'

export const tableFields = {
  name: {
    label: '姓名',
    'class-name': 'is-blod'
  },
  sex: {
    label: '性别',
    options: 'sex'
  },
  age: {
    label: '年龄'
  },
  homeTown: {
    label: '籍贯'
  },
  mobile: {
    label: '手机号'
  },
  personalEmail: {
    label: '个人邮箱'
  },
  workNature: {
    label: '工作性质',
    options: 'workNature'
  },
  handler: {
    label: '操作',
    width: 80,
    actions: ['EDIT']
  }
}

const createFields = {
  name: {
    label: '姓名',
    formType: INPUT,
    'class-name': 'is-blod',
    rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
  },
  sex: {
    label: '性别',
    formType: SELECT,
    options: 'sex',
    rules: [{ required: true, message: '请选择性别', trigger: 'blur' }]
  },
  birthday: {
    label: '生日',
    formType: DATE_PICKER,
    rules: [{ required: true, message: '请选择生日', trigger: 'blur' }]
  },
  address: {
    label: '现居住地',
    formType: INPUT,
    rules: [{
      required: true,
      message: '请输入现居住地'
    }]
  },
  homeTown: {
    label: '籍贯',
    formType: INPUT
  },
  paperworkType: {
    label: '证件类型',
    formType: SELECT,
    options: 'certificate_type'
  },
  idNumber: {
    label: '证件号码',
    formType: INPUT
  },
  mobile: {
    label: '手机号',
    formType: INPUT,
    rules: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
  },
  personalEmail: {
    label: '个人邮箱',
    formType: INPUT
  },
  politicalFeatures: {
    label: '政治面貌',
    formType: INPUT
  },
  residenceAddress: {
    label: '户籍地址',
    formType: INPUT
  },
  workNature: {
    label: '工作性质',
    formType: SELECT,
    options: 'workNature'
  },
  enabled: {
    label: '启用状态',
    formType: SWITCH,
    props: {
      class: 'inner-txt',
      activeText: '启动',
      inactiveText: '禁用',
      width: 56
    },
    handler: (row) => {
      return toBooble(row.enabled) ? 1 : 0
    }
  },
  status: {
    label: '状态',
    formType: SWITCH,
    props: {
      class: 'inner-txt',
      activeText: '是',
      inactiveText: '否',
      width: 56
    },
    handler: (row) => {
      return toBooble(row.status) ? 1 : 0
    }
  }
}

const moveCandidateFormItems = {
  recruitPositionId: {
    label: '应聘职位',
    formType: SELECT,
    options: 'jobs',
    rules: [{ required: true, message: '请选择应聘职位' }]
  },
  jobWay: {
    label: '应聘渠道',
    formType: SELECT,
    options: ''
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
  name: {
    label: '姓名',
    formType: INPUT,
    'class-name': 'is-blod',
    rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
  },
  sex: {
    label: '性别',
    formType: SELECT,
    options: 'sex',
    rules: [{ required: true, message: '请选择性别', trigger: 'blur' }]
  },
  birthday: {
    label: '生日',
    formType: DATE_PICKER,
    rules: [{ required: true, message: '请选择生日', trigger: 'blur' }]
  },
  address: {
    label: '现居住地',
    formType: INPUT,
    rules: [{
      required: true,
      message: '请输入现居住地'
    }]
  },
  homeTown: {
    label: '籍贯',
    formType: INPUT
  },
  paperworkType: {
    label: '证件类型',
    formType: SELECT,
    options: 'certificate_type'
  },
  idNumber: {
    label: '证件号码',
    formType: INPUT
  },
  mobile: {
    label: '手机号',
    formType: INPUT,
    rules: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
  },
  personalEmail: {
    label: '个人邮箱',
    formType: INPUT
  },
  politicalFeatures: {
    label: '政治面貌',
    formType: INPUT
  },
  residenceAddress: {
    label: '户籍地址',
    formType: INPUT
  },
  workNature: {
    label: '工作性质',
    formType: SELECT,
    options: 'workNature'
  },
  enabled: {
    label: '启用状态',
    formType: SWITCH,
    props: {
      class: 'inner-txt',
      activeText: '启动',
      inactiveText: '禁用',
      width: 56
    },
    formatter: (row) => {
      return toBooble(row.enabled) ? '已启用' : '已禁用'
    },
    handler: (row) => {
      return toBooble(row.enabled) ? 1 : 0
    }
  },
  status: {
    label: '状态',
    formType: SWITCH,
    props: {
      class: 'inner-txt',
      activeText: '是',
      inactiveText: '否',
      width: 56
    },
    formatter: (row) => {
      return toBooble(row.status) ? '是' : '否'
    },
    handler: (row) => {
      return toBooble(row.status) ? 1 : 0
    }
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
    url: '/hrTalentArchives/tocandidate',
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
    action: (ctx) => {
      ctx.selected = true
      ctx.selectAfter = async (rows) => {
        try {
          const { data } = await ctx.$axios.post('/hrTalentArchives/export', {
            searchText: ctx.keyword,
            hrTalentArchivesIds: rows.map(item => item.talentId).join()
          })
          downloadBlobFile(data)
        } catch (e) {
          console.error(e)
          ctx.$message.error(e.message || e)
        } finally {
        }
      }
    }
  }, {
    label: '批量导入人才',
    icon: 'icon-ico_export',
    action: 'onImportTalent'
  }]
}, {
  color: 'default',
  action: 'DROPDOWN',
  label: '批量',
  options: [{
    label: '批量更改应聘',
    icon: 'icon-ico_edit'
  }, {
    label: '批量下载简历',
    icon: 'icon-ico_download',
    action: (ctx) => {
      ctx.selected = true
      ctx.selectAfter = async (rows) => {
        try {
          const { data } = await ctx.$axios.post('/hrTalentArchives/downloadlist', {
            hrTalentArchivesIds: rows.map(item => item.talentId).join()
          })
          downloadBlobFile(data)
        } catch (e) {
          console.error(e)
          ctx.$message.error(e.message || e)
        } finally {
        }
      }
    }
  }, {
    label: '更改应聘职位',
    icon: 'icon-ico_edit',
    action: 'table:selected'
  }]
}]

export const editHandler = [{
  color: 'default',
  icon: 'icon-ico_file is-primary',
  action: context => context.$router.push(`/recruit/talent/${context.currentRow.talentId}`),
  label: '人员档案'
}, {
  color: 'default',
  icon: 'icon-ico_transformation is-primary',
  label: '移动人才',
  options: [{
    label: '移动到候选人',
    icon: 'icon-ico_revoke',
    action: 'onMoveToCandidate'
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
    action: 'onImportResume'
  }, {
    label: '发送offer',
    icon: 'icon-ico_send-out',
    action: ''
  }]
}]
