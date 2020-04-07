import fields from '~/fields'
import { SELECT, TEXTAREA, INPUT, DATE_PICKER } from '~/constant/FORMITEM_TYPE'

export const urls = {
  query: 'mock/organization/duty/manage/query',
  update: '/hrEducationInfo/edit',
  read: '/hrEducationInfo/detail',
  create: '/hrEducationInfo/add',
  delete: 'hrEducationInfo/delete'
}

export const primaryKey = 'educationInfoId'

export const tableFields = {
  name: {
    label: '序号',
    'class-name': 'is-blod'
  },
  staffNo: {
    label: '职级名称'
  },
  organName: {
    label: '在职人数'
  },
  postName: {
    label: '所属职等'
  },
  workNature: {
    label: '描述'
  }
}

const createFields = {
  staffId: {
    label: '职级',
    alias: 'name',
    formType: INPUT,
    rules: [{ required: true, message: '请选择员工', trigger: 'blur' }]
  },
  education: {
    label: '所属职等',
    formType: SELECT,
    options: 'education'
  },
  remark: {
    label: '描述',
    formType: TEXTAREA,
    isFull: true,
    isTopAlign: true
  }
}

export const editFields = {
  name: {
    label: fields.xingming,
    formType: INPUT
  },
  staffNo: {
    label: fields.gonghao,
    formType: INPUT
  },
  organName: {
    label: fields.bumen,
    formType: SELECT
  },
  postName: {
    label: fields.gangwei,
    formType: SELECT
  },
  workNature: {
    label: fields.gongzuoxingzhi,
    formType: SELECT
  },
  education: {
    label: fields.xueli,
    formType: SELECT,
    options: 'education'
  },
  graduatedSchool: {
    label: fields.biyeyuanxiao,
    formType: INPUT
  },
  graduationMajor: {
    label: fields.biyezhuanye,
    formType: INPUT
  },
  educationStartTime: {
    label: fields.jiaoyujieshushijian,
    formType: DATE_PICKER
  },
  educationEndTime: {
    label: fields.jiaoyukaishishijian,
    formType: DATE_PICKER
  },
  learningWay: {
    label: fields.xuexixingshi,
    formType: SELECT,
    options: 'learning_way'
  },
  diplomaNumber: {
    label: fields.biyezhengshubianhao,
    formType: INPUT
  },
  degreeType: {
    label: fields.xueweileixing,
    formType: SELECT,
    options: 'degree_type'
  },
  degreeName: {
    label: fields.xueweimingcheng,
    formType: INPUT
  },
  degreeCertificateNumber: {
    label: fields.xueweizhengshubianhao,
    formType: INPUT
  },
  isHighestDegree: {
    label: fields.shifouzuigaoxueli,
    formType: SELECT
  },
  remark: {
    label: fields.jiaoyubeizhu,
    formType: TEXTAREA,
    isFull: true,
    isTopAlign: true
  }
}

export const dialog = {
  create: {
    title: '新增职级',
    mode: 'single',
    fields: createFields,
    url: urls.create,
    refresh: true
  }
}
export const handler = [{
  color: 'primary',
  icon: 'icon-ico_new-additions',
  label: '新增职级',
  action: 'dialog:create'
}, {
  color: 'default',
  icon: 'icon-ico_delete is-primary',
  action: 'table:selected',
  label: '批量删除'
}]
