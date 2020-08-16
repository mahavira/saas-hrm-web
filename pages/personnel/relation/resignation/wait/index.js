import wrap from '@/components/table-container/warp'
import { SELECT, INPUT, DATE_PICKER } from '~/constant/FORMITEM_TYPE'
import { downloadBlobFile } from '~/utils/file'

export const urls = {
  create: '/hrStaffResignInfo/add',
  query: () => {
    return {
      url: '/hrStaffResignInfo/list',
      data: {
        status: 1
      }
    }
  },
  update: '/hrStaffResignInfo/update',
  delete: '/hrStaffResignInfo/delete',
  export: '/hrStaffResignInfo/export',
  import: '/hrStaffResignInfo/import'
}
export const primaryKey = 'hrStaffResignInfoId'

export const tableFields = {
  staffName: { label: '姓名', 'class-name': 'is-blod' },
  staffNo: { label: '工号' },
  entryDep: { label: '部门' },
  entryJob: { label: '岗位' },
  workNature: { label: '工作性质' },
  planFullMemberDate: { label: '入职日期' },
  probationMonthRange: { label: '司龄' },
  realEntryDatetime: { label: '离职日期' },
  handler: { width: 60, label: '操作', actions: ['EDIT'] }
}
const commonField = {
  organId: {
    label: '预计入职日期',
    formType: DATE_PICKER
  },
  workNature: {
    label: '手机号码',
    formType: INPUT
  },
  academicRequirements: {
    label: '个人邮箱',
    formType: INPUT
  },
  recruitWorkExperience: {
    label: '添加人',
    formType: SELECT
  },
  workPlaceCity: {
    label: '招聘渠道',
    options: 'job_way',
    formType: SELECT
  }

}
export const editFields = {
  ...commonField
}
export const dialog = {
  create: {
    fields: commonField,
    url: urls.create,
    title: '批量确认离职',
    refresh: true,
    callback: (done) => {
      console.log(done)
    }
  }
}

export const handler = [{
  icon: 'icon-ico_quit',
  label: '批量确认离职',
  async action () {
    const rows = await this.openSelectRows()
    await this.$confirm('执行操作后，选中员工将按照预定的转正日期转正：\n( 1 ) 预定转正日期在今天之前，将自动转正。( 2 ) 预定转正日期在今天之后，将到期自动转正。', '批量转正', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await this.$axios.post('/hrStaffResignInfo/modify', {
      hrStaffResignInfoId: rows.map(item => item.hrStaffResignInfoId).join()
    })
  }
}, {
  color: 'default',
  label: '更多',
  options: [{
    color: 'default',
    label: '办理离职',
    icon: 'icon-ico_quit is-primary',
    async action () {
    }
  }, {
    color: 'default',
    label: '批量办理离职',
    icon: 'icon-ico_quit is-primary',
    async action () {
      const rows = await this.openSelectRows()
      await this.$confirm('执行操作后，选中员工将按照预定的转正日期转正：\n( 1 ) 预定转正日期在今天之前，将自动转正。( 2 ) 预定转正日期在今天之后，将到期自动转正。', '批量转正', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await this.$axios.post('/hrStaffResignInfo/fullmember', {
        hrStaffResignInfoId: rows.map(item => item.hrStaffResignInfoId).join()
      })
    }
  }, {
    color: 'default',
    label: '批量编辑',
    icon: 'icon-ico_edit is-primary',
    async action () {
      const rows = await this.openSelectRows()
      await this.$confirm('执行操作后，选中员工将按照预定的转正日期转正：\n( 1 ) 预定转正日期在今天之前，将自动转正。( 2 ) 预定转正日期在今天之后，将到期自动转正。', '批量转正', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await this.$axios.post('/hrStaffResignInfo/fullmember', {
        hrStaffResignInfoId: rows.map(item => item.hrStaffResignInfoId).join()
      })
    }
  }, {
    label: '导出',
    icon: 'icon-ico_export',
    async action () {
      const rows = await this.openSelectRows()
      const { data } = await this.$axios.post(urls.export, {
        hrStaffResignInfoId: rows.map(item => item.hrStaffResignInfoId).join()
      })
      downloadBlobFile(data)
    }
  }]
}]

export const editHandler = [{
  label: '确认离职',
  icon: 'icon-ico_quit'
}, {
  color: 'default',
  label: '放弃离职',
  icon: 'icon-ico_cancel is-primary'
}, {
  color: 'default',
  label: '更多',
  options: [{
    color: 'default',
    label: '调整离职信息',
    icon: 'icon-ico_edit is-primary',
    action: 'detail:edited'
  }, {
    color: 'default',
    label: '查看员工档案',
    icon: 'icon-ico_eye is-primary',
    async action () {
    }
  }]
}]
export default wrap({
  tableFields,
  primaryKey,
  urls,
  dialog,
  handler,
  editFields,
  editHandler
})
