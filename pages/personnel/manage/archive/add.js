import { createHOC } from 'vue-hoc'
import add from './add-hoc.vue'
const a = {
  data () {
    return {
      formData: {},
      formRules: {
        xueli: [
          { required: true, message: '请选择学历', trigger: 'blur' }
        ],
        xuanzeyuangong: [
          { required: true, message: '请选择员工', trigger: 'blur' }
        ],
        biyeyuanxiao: [
          { required: true, message: '请输入毕业学校', trigger: 'blur' }
        ],
        biyezhuanye: [
          { required: true, message: '请输入毕业专业', trigger: 'blur' }
        ]
      }
    }
  }
}
console.log(createHOC(add, a))
export default createHOC(add, a)
