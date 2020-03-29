export default {
  title: 'HRM平台',
  name: 'hrm',
  themeName: 'blue',
  base: '',
  pageDir: 'pages-hrm',
  applicationKey: 'cd1c0b60b5df4910a6c64104a4600493HRMYYGLXT',
  proxy: {
    '/api/ltLogin/login': { target: 'http://172.16.24.121:39400/', pathRewrite: { '^/api': '' } },
    '/api': { target: 'http://172.16.17.106:9590/', pathRewrite: { '^/api': '' } }
  }
}
