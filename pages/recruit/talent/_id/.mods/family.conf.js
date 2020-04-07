import {
  INPUT,
  SELECT,
  TEXTAREA,
  DATE_PICKER,
} from '~/constant/FORMITEM_TYPE'

export const urls = {
  query: '/hrTaFamilyInfo/list',
  update: '/hrTaFamilyInfo/edit',
  create: '/hrTaFamilyInfo/add',
  delete: 'hrTaFamilyInfo/delete'
}

export const primaryKey = 'hrTaFamilyInfoId'

export const tableFields = {
  memberName: {
    label: '成员姓名',
    'class-name': 'is-blod'
  },
  memberName: { label: '成员姓名' },
  memberTel: { label: '成员电话' },
  relationship: { label: '关系' },
  workUnit: { label: '工作单位' },
  birthday: { label: '出生年月日' },
  memberEducationalLevel: { label: '成员文化程度', options: 'education' },
  position: { label: '任职职位', options: 'jobs' },
  handler: {
    width: 60,
    label: '操作',
    actions: ['EDIT']
  }
}

const createFields = {
  memberName: { label: '成员姓名', formType: INPUT },
  memberTel: { label: '成员电话', formType: INPUT },
  relationship: { label: '关系', formType: INPUT },
  workUnit: { label: '工作单位', formType: INPUT },
  birthday: { label: '出生年月日', formType: DATE_PICKER },
  memberEducationalLevel: { label: '成员文化程度', formType: SELECT, options: 'education' },
  position: { label: '任职职位', formType: SELECT, options: 'jobs' },
  remark: {
    label: '备注',
    formType: TEXTAREA,
    isFull: true,
    isTopAlign: true
  }
}

export const editFields = {
  memberName: { label: '成员姓名', formType: INPUT },
  memberTel: { label: '成员电话', formType: INPUT },
  relationship: { label: '关系', formType: INPUT },
  workUnit: { label: '工作单位', formType: INPUT },
  birthday: { label: '出生年月日', formType: DATE_PICKER },
  memberEducationalLevel: { label: '成员文化程度', formType: SELECT, options: 'education' },
  position: { label: '任职职位', formType: SELECT, options: 'jobs' },
  remark: {
    label: '备注',
    formType: TEXTAREA,
    isFull: true,
    isTopAlign: true
  }
}

export const dialog = {
  create: {
    title: '添加',
    fields: createFields,
    url: urls.create,
    refresh: true,
    mode: 'single',
    labelWidth: 100
  }
}
export const handler = [{
  color: 'primary',
  icon: 'icon-ico_new-additions',
  label: '新增',
  action: 'dialog:create'
}]
export const editHandler = [{
  color: 'primary',
  icon: 'icon-ico_new-additions',
  label: '编辑',
  action: 'detail:edited'
}]