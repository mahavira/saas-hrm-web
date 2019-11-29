<template>
  <el-dialog :visible="visible" @close="close" :close-on-click-modal="false" title="新增教育经历" width="820px">
    <el-form ref="form" :model="formData" :rules="formRules" class="sp-container__form" label-width="100px">
      <el-form-item
        v-for="(item, name) in form"
        :key="name"
        :prop="name"
        :label="item.label"
        :class="{full: item.isFull, 'top-align': item.isTopAlign}"
        class="item"
      >
        <el-input v-if="item.formType==='input'" v-model="formData[name]" :placeholder="item.placeholder || '请输入'" size="small" />
        <el-select v-if="item.formType==='select'" v-model="formData[name]" :placeholder="item.placeholder || '请选择'" size="small">
          <el-option
            v-for="(option, key) in dict[item.formDict]"
            :key="key"
            :value="key"
            :label="option"
          />
        </el-select>
        <el-date-picker
          v-if="item.formType==='date-select'"
          v-model="formData[name]"
          :placeholder="item.placeholder || '请选择'"
          size="small"
          type="date"
        />
        <el-input
          :rows="3"
          v-if="item.formType==='textarea'"
          v-model="formData[name]"
          :placeholder="item.placeholder || '请输入'"
          v-bind="item"
          type="textarea"
        />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="onSave(true)" :loading="loading" size="small">保存，继续录入</el-button>
      <el-button @click="onSave" :loading="loading" size="small" type="primary">保存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getConf } from './conf'
const formDataCopy = {
  staffId: '0c8c3af0a4744d81b54a11511870734c'
}
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      formData: Object.assign({}, formDataCopy),
      formRules: {
        education: [
          { required: true, message: '请选择学历', trigger: 'blur' }
        ],
        staffId: [
          { required: true, message: '请选择员工', trigger: 'blur' }
        ],
        graduatedSchool: [
          { required: true, message: '请输入毕业学校', trigger: 'blur' }
        ],
        graduationMajor: [
          { required: true, message: '请输入毕业专业', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    form () {
      const type = this.$route.params.type
      const form = getConf(type, 'addFields')
      return form
    },
    dict () {
      return this.$store.state.dict
    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    onSave (isNext = false) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.save(isNext)
        } else {
          return false
        }
      })
    },
    async save (isNext) {
      const formData = Object.assign({}, this.formData, {
        educationEndTime: this.$moment(this.formData.educationEndTime).format('YYYY-MM-DD HH:mm:ss'),
        educationStartTime: this.$moment(this.formData.educationStartTime).format('YYYY-MM-DD HH:mm:ss')
      })
      this.loading = true
      await this.$axios.post('hrEducationInfo/add', formData)
      if (isNext) {
        this.formData = Object.assign({}, formDataCopy)
      } else {
        this.close()
        setTimeout(() => {
          this.formData = Object.assign({}, formDataCopy)
        }, 400)
      }
      this.loading = false
    }
  }
}
</script>
