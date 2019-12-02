import fields from '~/fields'
import {
  SELECT,
  TEXTAREA,
  INPUT,
  DATE_PICKER
} from '~/utils/formType'

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
  xueli: {
    label: fields.xueli
  },
  biyeyuanxiao: {
    label: fields.biyeyuanxiao
  },
  biyezhuanye: {
    label: fields.biyezhuanye
  },
  jiaoyujieshushijian: {
    label: fields.jiaoyujieshushijian
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

export const handler = [{
  type: 'button',
  icon: 'el-icon-document',
  handler: 'ADD',
  label: '批量续签合同'
}, {
  type: 'button',
  color:'default',
  icon: 'el-icon-download',
  handler: 'EXPORT',
  label: '导出'
}]
