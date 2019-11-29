import fields from '~/fields'
import {
  SELECT,
  TEXTAREA,
  INPUT,
  DATE_SELECT
} from '~/utils/formType'

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
    label: fields.xueli
  },
  graduatedSchool: {
    label: fields.biyeyuanxiao
  },
  graduationMajor: {
    label: fields.biyezhuanye
  },
  educationEndTime: {
    label: fields.jiaoyujieshushijian
  }
}

export const addFields = {
  staffId: {
    label: '选择员工',
    formType: SELECT,
    formDict: ''
  },
  education: {
    label: '学历',
    formType: SELECT,
    formDict: 'education'
  },
  graduatedSchool: {
    label: '毕业院校',
    formType: INPUT
  },
  graduationMajor: {
    label: '毕业专业',
    formType: INPUT
  },
  educationEndTime: {
    label: '教育结束时间',
    formType: DATE_SELECT
  },
  educationStartTime: {
    label: '教育开始时间',
    formType: DATE_SELECT
  },
  learningWay: {
    label: '学习形式',
    formType: SELECT,
    formDict: 'learning_way'
  },
  diplomaNumber: {
    label: '毕业证书编号',
    formType: INPUT
  },
  degreeType: {
    label: '学位类型',
    formType: SELECT,
    formDict: 'degree_type'
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
    formDict: 'education'
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
    formType: DATE_SELECT
  },
  educationEndTime: {
    label: fields.jiaoyukaishishijian,
    formType: DATE_SELECT
  },
  learningWay: {
    label: fields.xuexixingshi,
    formType: SELECT,
    formDict: 'learning_way'
  },
  diplomaNumber: {
    label: fields.biyezhengshubianhao,
    formType: INPUT
  },
  degreeType: {
    label: fields.xueweileixing,
    formType: SELECT,
    formDict: 'degree_type'
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
export default {
  tableFields,
  addFields,
  editFields
}
