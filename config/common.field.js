import {
  SELECT
} from '~/config/formItemType'
export const staffId = {
  label: '选择员工',
  alias: 'name',
  formType: SELECT,
  options: '',
  rules: [{ required: true, message: '请选择员工', trigger: 'blur' }]
}
