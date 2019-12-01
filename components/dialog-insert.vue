<template>
  <el-dialog :visible="visible" @close="close" :close-on-click-modal="false" :title="title" width="820px">
    <el-form ref="form" :model="formData" :rules="formRules" class="sp-container__form" label-width="100px">
      <el-form-item
        v-for="(item, name) in fields"
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
          :format="item.format||'yyyy-MM-dd'"
          :value-format="item.valueFormat||'yyyy-MM-dd HH:mm:ss'"
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
const defaultFormData = {
  staffId: '0c8c3af0a4744d81b54a11511870734c'
}
export default {
  data () {
    return {
      title: '新增教育经历',
      visible: false,
      fields: {},
      loading: false,
      formData: Object.assign({}, defaultFormData),
      formRules: {}
    }
  },
  computed: {
    dict () {
      return this.$store.state.dict
    }
  },
  created () {
    this.$bus.$on('dialog:insert', (data) => {
      this.title = data.title || '无题'
      this.fields = data.fields || {}
      this.url = data.url || ''
      this.callback = data.callback || null
      if (data.formRules) {
        this.formRules = data.formRules
      } else {
        const formRules = {}
        if (this.fields) {
          Object.keys(this.fields).forEach((key) => {
            const rule = this.fields[key].rules
            if (rule) {
              formRules[key] = rule
            }
          })
        }
        this.formRules = formRules
      }
      this.visible = true
    })
  },
  beforeDestroy () {
    this.$bus.$off('dialog:insert')
  },
  methods: {
    close () {
      this.visible = false
      this.runCallback('cancel')
    },
    runCallback (e) {
      if (this.callback) { this.callback(e) }
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
      if (!this.url) { throw new Error('需提供url') }
      const formData = Object.assign({}, this.formData)
      this.loading = true
      try {
        await this.$axios.post(this.url, formData)
        if (isNext) {
          this.formData = Object.assign({}, defaultFormData)
        } else {
          setTimeout(() => {
            this.formData = Object.assign({}, defaultFormData)
          }, 400)
          this.visible = false
          this.runCallback('confirm')
        }
      } catch (e) {
        this.$message.error(e.message || e)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
