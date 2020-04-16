import { SELECT, INPUT, DATE_PICKER, INPUT_NUMBER, SLIDER, SLIDER_AGE, SWITCH_STATE, TEXTAREA } from '~/constant/FORMITEM_TYPE'
export const urls = {
  create: '/hrRecruitmentPosition/add',
  query: {
    url: '/hrRecruitmentPosition/list',
    data: { status: 2 }
  },
  update: '/hrRecruitmentPosition/update',
  delete: '/hrRecruitmentPosition/delete',
  read: '/hrRecruitmentPosition/read'
}
export const primaryKey = ''

export const tableFields = {
  positionName: {
    label: '职位名称',
    'class-name': 'is-blod'
  },
  organId: {
    label: '用人部门',
    options: 'organ'
  },
  workNature: {
    label: '工作性质',
    options: 'work_nature'
  },
  academicRequirements: {
    label: '学历要求'
  },
  recruitWorkExperience: {
    label: '工作经验要求'
  },
  workPlaceCity: {
    label: '工作城市',
    options: 'education'
  },
  lastHiredateTime: {
    label: '最迟到岗日期'
  },
  recruitsTotal: {
    label: '招聘人数',
    options: 'offState'
  },
  handler: {
    width: 60,
    label: '操作',
    actions: ['EDIT']
  }
}
const commonField = {
  positionName: { label: '职位名称', formType: INPUT },
  organId: { label: '用人部门', formType: SELECT, options: 'dep' },
  workNature: { label: '工作性质', formType: SELECT, options: 'work_nature' },
  recruitsTotal: { label: '招聘人数', formType: INPUT_NUMBER },
  recruitAge: { label: '年龄要求', formType: SLIDER_AGE },
  recruitWorkExperience: { label: '工作经验要求', formType: INPUT },
  academicRequirements: { label: '学历要求', formType: SELECT, options: 'education' },
  salaryRange: { label: '薪资区间', formType: SLIDER, props: { min: 1000, max: 30000 } },
  entryTime: { label: '入职日期', formType: DATE_PICKER },
  lastHiredateTime: { label: '最迟到岗时间', formType: DATE_PICKER },
  recruitPosition: { label: '招聘岗位', formType: INPUT },
  recruitReason: { label: '招聘原因', formType: INPUT },
  startRecruitDatetime: { label: '启动时间', formType: DATE_PICKER },
  workPlaceDistrict: { label: '工作地点省', formType: SELECT, options: 'provice' },
  workPlaceProvince: { label: '工作地点市', formType: SELECT, options: 'city' },
  workPlaceCity: { label: '工作地点区', formType: INPUT },
  enabled: { label: '启用状态', formType: SWITCH_STATE },
  status: { label: '发布状态', formType: SELECT, options: { 0: '已发布', 1: '招聘中', 2: '已停止' } },
  positionDescription: { label: '职位描述', formType: TEXTAREA, isFull: true, isTopAlign: true }
}
export const editFields = {
  ...commonField
}
export const dialog = {
  create: {
    fields: commonField,
    url: urls.create,
    title: '添加招聘职位',
    refresh: true,
    callback: (done) => {
      console.log(done)
    }
  }
}
export const searchPlaceholder = '职位名称'

export const handler = [{
  color: 'primary',
  icon: 'icon-ico_new-additions',
  action: 'dialog:create',
  label: '添加职位'
}, {
  color: 'default',
  icon: 'icon-ico_import is-primary',
  action: 'table:selected',
  label: '导 出'
}, {
  color: 'default',
  action: 'DROPDOWN',
  label: '批 量',
  options: [{
    label: '批量重启招聘',
    icon: 'icon-ico_eliminate',
    action: (ctx) => {
      ctx.selected = true
      ctx.selectAfter = async (rows) => {
        try {
          const { data } = await ctx.$axios.post('/hrRecruitmentPosition/restart', {
            hrRecruitPositionIds: rows.map(item => item.recruitPositionId).join()
          })
          console.log(data)
        } catch (e) {
          console.error(e)
          ctx.$message.error(e.message || e)
        } finally {
        }
      }
    }
  }]
}]

export const editHandler = [{
  color: 'primary',
  icon: 'icon-ico_eliminate',
  action: 'onRestartRecruit',
  label: '重启招聘'
}, {
  color: 'default',
  icon: 'icon-ico_edit is-primary',
  action: 'detail:edited',
  label: '快速编辑'
}]
