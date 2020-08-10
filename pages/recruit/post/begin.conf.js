import { SELECT, INPUT, DATE_PICKER, TEXTAREA, SWITCH_STATE } from '~/constant/FORMITEM_TYPE'
import { downloadBlobFile } from '~/utils/file'

export const urls = {
  create: '/hrRecruitmentPosition/add',
  query: {
    url: '/hrRecruitmentPosition/list',
    data: { status: 1 }
  },
  update: '/hrRecruitmentPosition/update',
  delete: '/hrRecruitmentPosition/delete',
  export: '/hrRecruitmentPosition/export',
  import: '/hrRecruitmentPosition/import'
  // read: '/hrRecruitmentPosition/read'
}
export const primaryKey = 'recruitPositionId'

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
    label: '学历要求',
    options: 'education'
  },
  recruitWorkExperience: {
    label: '工作经验要求',
    options: 'work_experience_requirements'
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
  positionName: { label: '职位名称', formType: INPUT, rules: [{ required: true, message: '请输入职位名称', trigger: 'blur' }] },
  organId: { label: '用人部门', formType: SELECT, options: 'organ', rules: [{ required: true, message: '请输入职位名称', trigger: 'blur' }] },
  workNature: { label: '工作性质', formType: SELECT, options: 'work_nature', rules: [{ required: true, message: '请输入职位名称', trigger: 'blur' }] },
  recruitsTotal: { label: '招聘人数', formType: INPUT, rules: [{ required: true, message: '请输入职位名称', trigger: 'blur' }] },
  // recruitAge: { label: '年龄要求', formType: SLIDER_AGE },
  recruitWorkExperience: { label: '工作经验要求', formType: SELECT, options: 'work_experience_requirements', rules: [{ required: true, message: '请输入职位名称', trigger: 'blur' }] },
  academicRequirements: { label: '学历要求', formType: SELECT, options: 'education', rules: [{ required: true, message: '请输入职位名称', trigger: 'blur' }] },
  salaryRange: { label: '薪资区间', formType: SELECT, options: 'salary_range' },
  entryTime: { label: '入职日期', formType: DATE_PICKER },
  // recruitPosition: { label: '招聘岗位', formType: INPUT, rules: [{ required: true, message: '请输入职位名称', trigger: 'blur' }] },
  recruitReason: { label: '招聘原因', formType: SELECT, options: 'salary_range' },
  startRecruitDatetime: { label: '启动时间', formType: DATE_PICKER },
  lastHiredateTime: { label: '最迟到岗时间', formType: DATE_PICKER },
  workPlaceDistrict: { label: '工作地点省', formType: SELECT, options: 'province' },
  workPlaceProvince: { label: '工作地点市', formType: SELECT, options: 'city' },
  workPlaceCity: { label: '工作地点区', formType: INPUT },
  recruitManager: { label: '负责人', formType: SELECT, options: 'recruitManager' },
  recruitAssist: { label: '协作人', formType: SELECT, options: 'recruitAssist' },
  enabled: { label: '启用状态', formType: SWITCH_STATE },
  status: { label: '发布状态', formType: SELECT, defaultValue: '1', options: { 0: '已发布', 1: '招聘中', 2: '已停止' } },
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
  },
  stopRecruit: require('./stopRecruit.dialog')
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
  label: '导 出',
  async action (ctx) {
    const rows = await ctx.openSelectRows()
    const { data } = await ctx.$axios.post(urls.export, {
      hrRecruitPositionIds: rows.map(item => item.recruitPositionId).join()
    })
    downloadBlobFile(data)
  }
}, {
  color: 'default',
  label: '批 量',
  options: [{
    label: '批量停止招聘',
    icon: 'icon-ico_eliminate',
    async action (ctx) {
      const rows = await ctx.openSelectRows()
      await ctx.$axios.post('/hrRecruitmentPosition/stop', {
        hrRecruitPositionIds: rows.map(item => item.recruitPositionId).join()
      })
    }
  }]
}]

export const editHandler = [{
  color: 'primary',
  icon: 'icon-ico_eliminate',
  action: 'onStopRecruit',
  label: '停止招聘'
}, {
  color: 'default',
  icon: 'icon-ico_edit is-primary',
  action: 'detail:edited',
  label: '快速编辑'
}]
