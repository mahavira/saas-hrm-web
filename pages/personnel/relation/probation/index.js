import wrap from '@/components/table-container/warp'
import { SELECT, INPUT, DATE_PICKER } from '~/constant/FORMITEM_TYPE'
import { downloadBlobFile } from '~/utils/file'

export const urls = {
  create: '/hrStaffProbationInfo/add',
  query: '/hrStaffProbationInfo/list',
  update: '/hrStaffProbationInfo/update',
  delete: '/hrStaffProbationInfo/delete',
  export: '/hrStaffProbationInfo/export',
  import: '/hrStaffProbationInfo/import'
}
export const primaryKey = 'hrStaffProbationInfoId'

export const tableFields = {
  staffName: { label: '姓名', 'class-name': 'is-blod' },
  year: { label: '年龄' },
  staffNo: { label: '工号' },
  entryDep: { label: '部门' },
  entryJob: { label: '岗位' },
  workNature: { label: '工作性质' },
  planFullMemberDate: { label: '入职日期' },
  probationMonthRange: { label: '试用期' },
  realEntryDatetime: { label: '转正日期' },
  handler: {
    width: 60,
    label: '操作',
    actions: ['EDIT']
  }
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
    title: '批量调整转正日期',
    refresh: true,
    callback: (done) => {
      console.log(done)
    }
  }
}

export const handler = [{
  icon: 'icon-ico_calendar',
  label: '批量调整转正日期',
  async action () {
    const rows = await this.openSelectRows()
    await this.$confirm('执行操作后，选中员工将按照预定的转正日期转正：\n( 1 ) 预定转正日期在今天之前，将自动转正。( 2 ) 预定转正日期在今天之后，将到期自动转正。', '批量转正', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
    await this.$axios.post('/hrStaffProbationInfo/modify', {
      hrStaffProbationInfoId: rows.map(item => item.hrStaffProbationInfoId).join()
    })
  }
}, {
  color: 'default',
  label: '更多',
  options: [{
    color: 'default',
    label: '批量办理转正',
    icon: 'icon-ico_choice_sure is-primary',
    async action () {
      const rows = await this.openSelectRows()
      await this.$confirm('执行操作后，选中员工将按照预定的转正日期转正：\n( 1 ) 预定转正日期在今天之前，将自动转正。( 2 ) 预定转正日期在今天之后，将到期自动转正。', '批量转正', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
      await this.$axios.post('/hrStaffProbationInfo/fullmember', {
        hrStaffProbationInfoId: rows.map(item => item.hrStaffProbationInfoId).join()
      })
    }
  }, {
    label: '导入转正员工',
    icon: 'icon-ico_import',
    async action () {

    }
  }, {
    label: '导出',
    icon: 'icon-ico_export',
    async action () {
      const rows = await this.openSelectRows()
      const { data } = await this.$axios.post(urls.export, {
        hrStaffProbationInfoId: rows.map(item => item.hrStaffProbationInfoId).join()
      })
      downloadBlobFile(data)
    }
  }]
}]

export const editHandler = [{
  label: '办理转正',
  icon: 'icon-ico_choice_sure'
}, {
  color: 'default',
  label: '快速编辑',
  icon: 'icon-ico_edit is-primary'
}, {
  color: 'default',
  label: '查看简历',
  icon: 'icon-ico_eye is-primary'
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
