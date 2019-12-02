import fields from '~/fields'
import {
  SELECT,
  TEXTAREA,
  INPUT,
  DATE_PICKER
} from '~/utils/formType'

export const urls = {
  list: '/hrEducationInfo/list',
  update: '/hrEducationInfo/edit',
  detail: '/hrEducationInfo/detail',
  add: '/hrEducationInfo/add'
}

export const primaryKey = 'id'

export const tableFields = {
  xingming: {
    label: fields.xingming,
    'class-name': 'is-blod'
  },
  gonghao: {
    label: fields.gonghao
  },
  bumen: {
    label: fields.bumen
  },
  gangwei: {
    label: fields.gangwei
  },
  gongzuoxingzhi: {
    label: fields.gongzuoxingzhi
  },
  phone: {
    label: fields.phone
  },
  credential_type: {
    label: fields.credential_type
  },
  credential_number: {
    label: fields.credential_number,
    width: 100
  }
}

export const addFields = {
  xuanzeyuangong: {
    label: fields.xuanzeyuangong,
    formType: SELECT
  },
  xueli: {
    label: fields.xueli,
    formType: SELECT
  },
  biyeyuanxiao: {
    label: fields.biyeyuanxiao,
    formType: INPUT
  },
  biyezhuanye: {
    label: fields.biyezhuanye,
    formType: INPUT
  },
  jiaoyujieshushijian: {
    label: fields.jiaoyujieshushijian,
    formType: DATE_PICKER
  },
  jiaoyukaishishijian: {
    label: fields.jiaoyukaishishijian,
    formType: DATE_PICKER
  },
  xuexixingshi: {
    label: fields.xuexixingshi,
    formType: SELECT
  },
  biyezhengshubianhao: {
    label: fields.biyezhengshubianhao,
    formType: INPUT
  },
  xueweileixing: {
    label: fields.xueweileixing,
    formType: SELECT
  },
  xueweimingcheng: {
    label: fields.xueweimingcheng,
    formType: INPUT
  },
  xueweizhengshubianhao: {
    label: fields.xueweizhengshubianhao,
    formType: INPUT
  },
  jiaoyubeizhu: {
    label: fields.jiaoyubeizhu,
    formType: TEXTAREA,
    isFull: true,
    isTopAlign: true
  }
}

export const editFields = {
  xingming: {
    label: fields.xingming,
    formType: INPUT
  },
  gonghao: {
    label: fields.gonghao,
    formType: INPUT
  },
  bumen: {
    label: fields.bumen,
    formType: SELECT
  },
  gangwei: {
    label: fields.gangwei,
    formType: SELECT
  },
  gongzuoxingzhi: {
    label: fields.gongzuoxingzhi,
    formType: SELECT
  },
  xueli: {
    label: fields.xueli,
    formType: SELECT
  },
  biyeyuanxiao: {
    label: fields.biyeyuanxiao,
    formType: INPUT
  },
  biyezhuanye: {
    label: fields.biyezhuanye,
    formType: INPUT
  },
  jiaoyujieshushijian: {
    label: fields.jiaoyujieshushijian,
    formType: DATE_PICKER
  },
  jiaoyukaishishijian: {
    label: fields.jiaoyukaishishijian,
    formType: DATE_PICKER
  },
  xuexixingshi: {
    label: fields.xuexixingshi,
    formType: SELECT
  },
  biyezhengshubianhao: {
    label: fields.biyezhengshubianhao,
    formType: INPUT
  },
  xueweileixing: {
    label: fields.xueweileixing,
    formType: SELECT
  },
  xueweimingcheng: {
    label: fields.xueweimingcheng,
    formType: INPUT
  },
  xueweizhengshubianhao: {
    label: fields.xueweizhengshubianhao,
    formType: INPUT
  },
  shifouzuigaoxueli: {
    label: fields.shifouzuigaoxueli,
    formType: SELECT
  },
  jiaoyubeizhu: {
    label: fields.jiaoyubeizhu,
    formType: TEXTAREA,
    isFull: true,
    isTopAlign: true
  }
}

export const  handler = [{
  type: 'button',
  color: 'primary',
  icon: 'el-icon-plus',
  handler: 'ADD',
  label: '添加员工'
}, {
  type: 'button',
  color: 'default',
  icon: 'el-icon-upload2 is-primary',
  handler: 'IMPORT',
  label: '导入名册'
}, {
  type: 'button',
  color: 'default',
  icon: 'el-icon-delete-solid is-primary',
  handler: 'DELETE',
  label: '批量删除'
}]
export const editHandler = [{
  type: 'button',
  color: 'primary',
  icon: 'el-icon-check',
  handler: 'ADD',
  label: '确认入职'
}, {
  type: 'button',
  color: 'default',
  icon: 'el-icon-edit is-primary',
  handler: 'EDIT',
  label: '快速编辑'
}, {
  type: 'button',
  color: 'default',
  icon: 'el-icon-view is-primary',
  handler: 'toInfo',
  label: '员工档案'
}]