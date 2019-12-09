<template>
  <el-dialog
    :visible="visible"
    @close="close"
    :close-on-click-modal="false"
    :title="title"
    :width="(mode==='double'?820:408)+'px'"
    :showClose="showClose"
  >
    <sp-form
      ref="ltform"
      :mode="mode"
      v-model="formData"
      :rules="formRules"
      :fields="fields"
      :edited="true"
      style="padding: 24px;"
    />
    <div slot="footer">
      <el-button
        v-show="showCancelButton"
        @click="onCannel"
        type="default"
        size="small"
      >
        {{ cancelButtonText }}
      </el-button>
      <el-button
        v-show="showConfirmNextButton"
        @click="onSave(true)"
        :loading="loading"
        type="default"
        size="small"
      >
        {{ confirmButtonNextText }}
      </el-button>
      <el-button
        v-show="showConfirmButton"
        @click="onSave(false)"
        :loading="loading"
        type="primary"
        size="small"
      >
        {{ confirmButtonText }}
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import { isObject } from '~/utils'
import SpForm from '~/components/sp-form'
import * as formItemType from '~/constant/formItemType'
/**
 * 可传参数
 */
const defaultOpts = {
  mode: 'double', // double | single
  title: '添加',
  fields: {},
  showClose: true,
  showCancelButton: true,
  showConfirmButton: true,
  showConfirmNextButton: false,
  cancelButtonText: '取消',
  confirmButtonText: '保存',
  confirmButtonNextText: '保存，继续录入',
  callback: null,
  url: ''
}

export default {
  components: { SpForm },
  data () {
    return {
      visible: false,
      loading: false,
      formData: {},
      formRules: null,
      ...defaultOpts
    }
  },
  watch: {
    $route () {
      this.visible = false
    }
  },
  created () {
    this.$bus.$on('dialog:create', (data) => {
      Object.keys(defaultOpts).forEach((key) => {
        const defaultVal = defaultOpts[key]
        const val = data[key]
        if (typeof val === 'undefined') {
          if (isObject(defaultVal)) {
            this[key] = Object.assign({}, defaultVal)
          } else {
            this[key] = defaultVal
          }
        } else {
          this[key] = val
        }
      })
      const formRules = {}
      const formData = {}
      if (this.fields) {
        Object.keys(this.fields).forEach((key) => {
          const { rules, formType } = this.fields[key]
          if (rules) {
            formRules[key] = rules
          }
          if (formType === formItemType.CHECKBOX) {
            formData[key] = []
          } else {
            formData[key] = ''
          }
        })
      }
      this.formRules = formRules
      this.formData = formData
      this.formData.staffId = '0c8c3af0a4744d81b54a11511870734c'
      this.$set(this, 'formData', this.formData)
      this.visible = true
      this.$nextTick(() => {
        this.$refs.ltform.form.resetFields()
      })
    })
  },
  beforeDestroy () {
    this.$bus.$off('dialog:create')
  },
  methods: {
    close () {
      this.visible = false
      this.runCallback('cancel')
    },
    runCallback (e) {
      if (this.callback) { this.callback(e) }
    },
    onCannel () {
      this.close()
    },
    async onSave (isNext) {
      try {
        await this.$refs.ltform.validate()
        this.save(isNext)
      } catch (e) {
        console.error(e)
      }
    },
    async save (isNext) {
      if (!this.url) { throw new Error('需提供url') }
      const formData = Object.assign({}, this.formData)
      this.loading = true
      try {
        await this.$axios.post(this.url, formData)
        this.formData = {
          staffId: '0c8c3af0a4744d81b54a11511870734c'
        }
        this.$refs.ltform.form.resetFields()
        if (!isNext) {
          this.visible = false
          this.runCallback('confirm')
        } else {
          this.runCallback('next')
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
