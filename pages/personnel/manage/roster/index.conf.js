import fields from '~/fields'
import {
  SELECT,
  TEXTAREA,
  INPUT,
  DATE_PICKER
} from '~/constant/FORMITEM_TYPE'

export const urls = {
  query: 'mock/personnel/roster/query',
  update: 'mock/personnel/roster/update',
  read: 'mock/personnel/roster/read',
  create: 'mock/personnel/roster/create',
  delete: 'mock/personnel/roster/delete'
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
  },
  handler: {
    label: '操作',
    actions: ['EDIT']
  }
}

const createFields = {
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
export const dialog = {
  create: {
    title: '添加人才',
    fields: createFields,
    url: urls.create,
    refresh: true
  }
}
export const handler = [{
  type: 'button',
  color: 'primary',
  icon: 'icon-ico_new-additions',
  action: 'dialog:create',
  label: '添加员工'
}, {
  type: 'button',
  color: 'default',
  icon: 'el-icon-upload2 is-primary',
  action: 'dialog:import',
  label: '导入名册'
}, {
  type: 'button',
  color: 'default',
  icon: 'icon-ico_delete is-primary',
  action: 'table:selected',
  label: '批量删除'
}]
export const editHandler = [{
  type: 'button',
  color: 'primary',
  icon: 'el-icon-check',
  action: '',
  label: '确认入职'
}, {
  type: 'button',
  color: 'default',
  icon: 'icon-ico_edit is-primary',
  action: 'detail:edited',
  label: '快速编辑'
}, {
  type: 'button',
  color: 'default',
  icon: 'el-icon-view is-primary',
  action: 'toInfo',
  label: '员工档案'
}]
