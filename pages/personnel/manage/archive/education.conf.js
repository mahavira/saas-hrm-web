import fields from '~/fields'
import {
  SELECT,
  TEXTAREA,
  INPUT,
  DATE_PICKER
} from '~/constant/FORMITEM_TYPE'

export const urls = {
  query: '/hrEducationInfo/list',
  update: '/hrEducationInfo/edit',
  read: '/hrEducationInfo/detail',
  create: '/hrEducationInfo/add',
  delete: 'hrEducationInfo/delete'
}

export const primaryKey = 'educationInfoId'

export const tableFields = {
  name: {
    label: fields.xingming,
    'class-name': 'is-blod'
  },
  staffNo: {
    label: fields.gonghao
  },
  organName: {
    label: fields.bumen
  },
  postName: {
    label: fields.gangwei
  },
  workNature: {
    label: fields.gongzuoxingzhi
  },
  education: {
    label: fields.xueli,
    options: 'education'
  },
  graduatedSchool: {
    label: fields.biyeyuanxiao
  },
  graduationMajor: {
    label: fields.biyezhuanye
  },
  educationEndTime: {
    label: fields.jiaoyujieshushijian
  },
  handler: {
    label: '操作',
    actions: ['EDIT']
  }
}

const createFields = {
  staffId: {
    label: '选择员工',
    alias: 'name',
    formType: SELECT,
    options: '',
    rules: [{ required: true, message: '请选择员工', trigger: 'blur' }]
  },
  education: {
    label: '学历',
    formType: SELECT,
    options: 'education',
    rules: [{ required: true, message: '请选择学历', trigger: 'blur' }]
  },
  graduatedSchool: {
    label: '毕业院校',
    formType: INPUT,
    rules: [{ required: true, message: '请输入毕业学校', trigger: 'blur' }]
  },
  graduationMajor: {
    label: '毕业专业',
    formType: INPUT,
    rules: [{ required: true, message: '请输入毕业专业', trigger: 'blur' }]
  },
  educationEndTime: {
    label: '教育结束时间',
    formType: DATE_PICKER
  },
  educationStartTime: {
    label: '教育开始时间',
    formType: DATE_PICKER
  },
  learningWay: {
    label: '学习形式',
    formType: SELECT,
    options: 'learning_way'
  },
  diplomaNumber: {
    label: '毕业证书编号',
    formType: INPUT
  },
  degreeType: {
    label: '学位类型',
    formType: SELECT,
    options: 'degree_type'
  },
  degreeName: {
    label: '学位名称',
    formType: INPUT
  },
  degreeCertificateNumber: {
    label: '学位证书编号',
    formType: INPUT
  },
  remark: {
    label: '教育备注',
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
    title: '添加教育经历',
    fields: createFields,
    url: urls.create,
    refresh: true
  }
}
