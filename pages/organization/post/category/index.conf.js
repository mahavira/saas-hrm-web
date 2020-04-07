import { SELECT, INPUT, TEXTAREA } from '~/constant/FORMITEM_TYPE'

export const tableData = [{
  id: 1,
  date: '2016-05-02',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄'
}, {
  id: 2,
  date: '2016-05-04',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1517 弄'
}, {
  id: 3,
  date: '2016-05-01',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1519 弄',
  children: [{
    id: 31,
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  }, {
    id: 32,
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  }]
}, {
  id: 4,
  date: '2016-05-03',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1516 弄'
}]
export const tableFields = {
  name: {
    label: '岗位名称',
    'class-name': 'is-blod'
  },
  staffNo: {
    label: '岗位类别编码'
  },
  organName: {
    label: '岗位数'
  },
  postName: {
    label: '在职员工数'
  },
  cage: {
    label: '职级范围'
  },
  wage: {
    label: '职等范围'
  },
  wage2: {
    label: '描述'
  }
}
export const dialog = {
  create: {
    title: '新增岗位类别',
    mode: 'single',
    confirmButtonText: '确认',
    labelWidth: 80,
    fields: {
      level: {
        label: '上级分组',
        formType: SELECT
      },
      level2: {
        label: '岗位类别',
        formType: INPUT,
        rules: [
          { required: true }
        ]
      }
    }
  },
  update: {
    title: '编辑岗位类别',
    mode: 'single',
    confirmButtonText: '确认',
    labelWidth: 100,
    fields: {
      name: {
        label: '名称',
        formType: INPUT,
        rules: [
          { required: true }
        ]
      },
      categoryNo: {
        label: '岗位类别编码',
        formType: INPUT
      },
      level: {
        label: '上级分组',
        formType: SELECT
      },
      desc: {
        label: '描述',
        formType: TEXTAREA
      }
    }
  }
}
