export default [{
  color: 'primary',
  icon: 'icon-ico_new-additions',
  action: 'dialog:create',
  refresh: true,
  label: '新 增'
}, {
  color: 'default',
  label: '批量操作',
  options: [{
    label: '批量删除',
    action: 'table:selected'
  }, {
    label: '批量导入',
    action: 'showImport'
  }]
}]
