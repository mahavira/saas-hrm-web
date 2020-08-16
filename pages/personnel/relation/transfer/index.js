
import wrap from '@/components/table-container/warp'
import { SELECT, INPUT, DATE_PICKER } from '~/constant/FORMITEM_TYPE'
import { downloadBlobFile } from '~/utils/file'

export const urls = {
  create: '/hrStaffActionInfo/add',
  query: '/hrStaffActionInfo/list',
  update: '/hrStaffActionInfo/update',
  delete: '/hrStaffActionInfo/delete',
  export: '/hrStaffActionInfo/export',
  import: '/hrStaffActionInfo/import'
}
export const primaryKey = 'hrStaffActionInfoId'

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
    title: '批量编辑',
    refresh: true,
    callback: (done) => {
      console.log(done)
    }
  }
}

export const handler = [{
  color: 'default',
  icon: 'icon-ico_edit is-primary',
  label: '批量转全职',
  async action () {
    const rows = await this.openSelectRows()
    await this.$axios.post('/hrStaffActionInfo/modify', {
      hrStaffActionInfoId: rows.map(item => item.hrStaffActionInfoId).join()
    })
  }
}, {
  color: 'default',
  label: '更多',
  options: [{
    color: 'default',
    icon: 'icon-ico_edit is-primary',
    label: '集团内人员调动',
    async action () {
      const rows = await this.openSelectRows()
      await this.$axios.post('/hrStaffActionInfo/modify', {
        hrStaffActionInfoId: rows.map(item => item.hrStaffActionInfoId).join()
      })
    }
  }, {
    color: 'default',
    label: '批量删除',
    icon: 'icon-ico_delete is-primary',
    async action () {
      const rows = await this.openSelectRows()
      await this.$confirm('删除后不可恢复，确定要删除吗？', '批量删除', {
        confirmButtonText: '确定',
        cancelButtonText: '暂不删除',
        type: 'error'
      })
      await this.$axios.post(urls.delete, {
        hrStaffWaitingEntryIds: rows.map(item => item.hrStaffWaitingEntryId).join()
      })
    }
  }, {
    label: '导入',
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
  label: '重新入职',
  color: 'default',
  icon: 'icon-ico_quit is-primary'
}, {
  color: 'default',
  label: '撤消离职',
  icon: 'icon-ico_cancel is-primary'
}, {
  color: 'default',
  label: '员工档案',
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
