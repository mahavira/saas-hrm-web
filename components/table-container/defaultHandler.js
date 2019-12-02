export default [{
  type: 'button',
  color: 'primary',
  icon: 'el-icon-plus',
  handler: 'ADD',
  label: '新 增'
}, {
  type: 'dropdown',
  color: 'default',
  handler: 'DROPDOWN',
  label: '批量操作',
  options: [{
    label: '批量删除',
    value: 'DELETE'
  }, {
    label: '批量导入',
    value: 'showImport'
  }]
}]
