import Mock from 'better-mock'
import getConf from '~/config/mods'
import { SELECT, INPUT, DATE_PICKER, INPUT_NUMBER } from '~/config/formItemType'

function setTemplate (fields, template = {}) {
  Object.keys(fields).forEach((name) => {
    const { formType } = fields[name]
    if (formType === SELECT) {
      template[`${name}`] = '@integer(1,1)'
    } else if (formType === INPUT) {
      template[`${name}`] = '@cname'
    } else if (formType === DATE_PICKER) {
      template[`${name}`] = '@datetime'
    } else if (formType === INPUT_NUMBER) {
      template[`${name}`] = '@integer(1,1)'
    } else {
      template[`${name}`] = '@cname'
    }
  })
  return template
}

function rCreate () {
  return {
    data: null,
    status: 0,
    message: '成功'
  }
}
function rDelete () {
  return {
    data: null,
    status: 0,
    message: '成功'
  }
}
function rUpdate () {
  return {
    data: null,
    status: 0,
    message: '成功'
  }
}

function rQuery (res, { tableFields }) {
  const {
    page = 1,
    limit = 10
  } = JSON.parse(res.body)
  const template = {
    'id|+1': 1
  }
  setTemplate(tableFields, template)
  const rows = Mock.mock({
    [`rows|${limit}`]: [template]
  })
  return {
    data: {
      ...rows,
      total: 98,
      page
    },
    status: 0,
    message: '成功'
  }
}
function rRead (res, { editFields }) {
  const template = {
    'id|+1': 1
  }
  setTemplate(editFields, template)
  const rows = Mock.mock(template)
  return {
    data: rows,
    status: 0,
    message: '成功'
  }
}

export default function ({ app }) {
  Mock.mock(/\/api\/mock\/.*/, (res) => {
    const conf = getConf(app.router.currentRoute.path)
    const url = res.url.replace('/api/mock/', '')
    const curd = url.split('/')[url.split('/').length - 1]
    if (curd === 'create') {
      return rCreate()
    } else if (curd === 'query') {
      return rQuery(res, conf)
    } else if (curd === 'delete') {
      return rDelete()
    } else if (curd === 'read') {
      return rRead(res, conf)
    } else if (curd === 'update') {
      return rUpdate()
    }
  })
}
