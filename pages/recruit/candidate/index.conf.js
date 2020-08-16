import { SELECT, INPUT, DATE_PICKER } from '~/constant/FORMITEM_TYPE'
import { downloadBlobFile } from '~/utils/file'
export const urls = {
  create: '/hrCandidate/add',
  query: '/hrCandidate/list',
  update: '/hrCandidate/update',
  delete: (rows) => {
    return {
      url: '/hrCandidate/delete',
      formData: {
        candidateIds: rows.map(row => row.candidateId).join()
      }
    }
  }
}
export const primaryKey = ''

const recruitStageOptions = {
  '0': '候选人', '1': '面试', '2': 'offer', '3': '入职'
}

export const tableFields = {
  talentName: {
    label: '姓名',
    'cell-class-name': 'is-blod'
  },
  // isTalent: {
  //   label: '',
  //   hidden: true,
  //   formatter: (row) => {
  //     return row.isTalent ? '<span class="el-tag el-tag--warning el-tag--small">人才</span>' : ''
  //   }
  // },
  recruitPositionId: {
    label: '招聘职位',
    options: 'jobs'
  },
  recruitStage: {
    label: '候选人状态',
    options: recruitStageOptions
  },
  dep: {
    label: '用人部门',
    options: 'dep'
  },
  director: {
    label: '招聘负责人'
  },
  // gender: {
  //   label: '性别',
  //   options: 'sex'
  // },
  // age: {
  //   label: '年龄'
  // },
  // work_age: {
  //   label: '工作年限'
  // },
  handler: {
    width: 60,
    label: '操作',
    actions: ['EDIT']
  }
}

const createFields = {
  name: {
    label: '姓名',
    formType: INPUT
  },
  recruitPositionId: {
    label: '招聘职位',
    formType: SELECT,
    options: 'jobs'
  }
}
export const editFields = {
  name: {
    label: '姓名',
    'cell-class-name': 'is-blod'
  },
  isTalent: {
    label: '',
    hidden: true,
    formType: SELECT,
    formatter: (row) => {
      return row.isTalent ? '<span class="el-tag el-tag--warning el-tag--small">人才</span>' : ''
    }
  },
  job: {
    label: '招聘职位',
    formType: SELECT,
    options: 'jobs'
  },
  recruitStage: {
    label: '候选人状态',
    formType: SELECT,
    options: recruitStageOptions
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
  // gender: {
  //   label: '性别',
  //   formType: SELECT,
  //   options: 'sex'
  // },
  // age: {
  //   label: '年龄',
  //   formType: INPUT_NUMBER
  // },
  // work_age: {
  //   label: '工作年限',
  //   formType: INPUT_NUMBER
  // },
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
    mode: 'single',
    labelWidth: 80,
    refresh: true
  }
}
export const handler = [{
  color: 'primary',
  label: '添加候选人',
  options: [{
    label: '单个添加候选人',
    icon: 'icon-ico_new-additions',
    action: 'dialog:create'
  }, {
    label: '批量导入简历',
    icon: 'icon-ico_import'
    // action: 'showImport'
  }, {
    label: 'Excel导入候选人',
    icon: 'icon-ico_import',
    action: 'showImport'
  }]
}, {
  color: 'default',
  icon: 'icon-ico_calendar is-primary',
  label: '面试安排',
  async action () {
    const rows = await this.openSelectRows()
    console.log(rows)
  }
}, {
  color: 'default',
  label: '更多操作',
  options: [{
    label: '导出',
    icon: 'icon-ico_export',
    async action () {
      const rows = await this.openSelectRows()
      const { data } = await this.$axios.post('/hrCandidate/export', {
        candidateIds: rows.map(item => item.candidateId).join()
      })
      downloadBlobFile(data)
    }
  }, {
    label: '一键清理',
    icon: 'icon-ico_clear',
    action: 'table:selected'
  }]
// }, {
//   color: 'default',
//   icon: 'icon-ico_clear is-primary',
//   action: 'EXPORT',
//   label: '一键清理'
}]

export const editHandler = [{
  color: 'default',
  icon: 'icon-ico_transformation is-primary',
  label: '移动人才',
  options: [{
    label: '移动到初选通过',
    icon: 'icon-ico_revoke',
    action: async (ctx) => {
      console.log(ctx.currentRow)
      const { data } = await ctx.$axios.post('/hrCandidate/updateInterviewRecord', {
        candidateId: ctx.currentRow.candidateId
      })
      if (data.status === 0) {
        ctx.$message.success('已移动到初选通过')
      } else {
        ctx.$message.error('错误')
      }
    }
  }, {
    label: '移动到面试安排',
    icon: 'icon-ico_revoke',
    action: async (ctx) => {
      console.log(ctx.currentRow)
      const { data } = await ctx.$axios.post('/hrCandidate/addToWaitingEntry', {
        candidateId: ctx.currentRow.candidateId
      })
      if (data.status === 0) {
        ctx.$message.success('已移动到待入职')
      } else {
        ctx.$message.error('错误')
      }
    }
  }, {
    label: '移动到面试通过',
    icon: 'icon-ico_revoke',
    action: async (ctx) => {
      console.log(ctx.currentRow)
      const { data } = await ctx.$axios.post('/hrCandidate/updateInterviewDoubleRecord', {
        candidateId: ctx.currentRow.candidateId
      })
      if (data.status === 0) {
        ctx.$message.success('已移动到面试通过')
      } else {
        ctx.$message.error('错误')
      }
    }
  }, {
    label: '移动到待入职',
    icon: 'icon-ico_revoke',
    action: async (ctx) => {
      console.log(ctx.currentRow)
      const { data } = await ctx.$axios.post('/hrCandidate/addToWaitingEntry', {
        candidateId: ctx.currentRow.candidateId
      })
      if (data.status === 0) {
        ctx.$message.success('已移动到待入职')
      } else {
        ctx.$message.error('错误')
      }
    }
  }]
}, {
  color: 'default',
  action: 'detail:edited',
  label: '更多操作',
  options: [{
    label: '快速编辑',
    icon: 'icon-ico_edit',
    action: 'detail:edited'
  }, {
    label: '资料档案',
    icon: 'icon-ico_revoke',
    action: (ctx) => {
      ctx.$router.push(`/recruit/talent/${ctx.currentRow.talentId}`)
    }
  }, {
    label: '导出简历',
    icon: 'icon-ico_revoke',
    action: async (ctx) => {
      try {
        const res = await ctx.$axios.post('/hrTalentArchives/download', {
          hrTalentArchivesIds: ctx.currentRow.talentId
        })
        downloadBlobFile(res.data, `${ctx.currentRow.talentName}简历.doc`, 'application/msword')
      } catch (e) {
        console.error(e)
        ctx.$message.error(e.message || e)
      } finally {
      }
    }
  }]
}]
