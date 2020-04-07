<template>
  <el-dialog
    :visible="visible"
    @close="close"
    :close-on-click-modal="false"
    :title="title"
    :width="(mode==='double'?820:408)+'px'"
    :showClose="showClose"
  >
    <p v-if="beforeText" class="before-text">
      {{ beforeText }}
    </p>
    <sp-form
      ref="ltform"
      :mode="mode"
      v-model="formData"
      :rules="formRules"
      :fields="fields"
      :edited="true"
      :labelWidth="labelWidth"
    />
    <div slot="footer">
      <el-button
        v-show="showCancelButton"
        @click="close"
        type="default"
        size="small"
        class="is-large-padding"
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
        class="is-large-padding"
      >
        {{ confirmButtonText }}
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import SpForm from '~/components/sp-form'
import * as formItemType from '~/constant/FORMITEM_TYPE'

export default {
  components: { SpForm },
  props: {
    visible: { type: Boolean, default: false }, // double | single
    mode: { type: String, default: 'double' }, // double | single
    title: { type: String, default: '添加' },
    fields: { type: Object, default: () => {} },
    showClose: { type: Boolean, default: true },
    showCancelButton: { type: Boolean, default: true },
    showConfirmButton: { type: Boolean, default: true },
    showConfirmNextButton: { type: Boolean, default: false },
    cancelButtonText: { type: String, default: '取消' },
    confirmButtonText: { type: String, default: '保存' },
    confirmButtonNextText: { type: String, default: '保存，继续录入' },
    callback: { type: Function, default: null },
    beforeText: { type: String, default: '' },
    url: { type: String, default: '' },
    labelWidth: { type: Number, default: 124 },
    data: { type: Object, default: () => null }
  },
  data () {
    return {
      loading: false,
      formData: {},
      formRules: null
    }
  },
  watch: {
    $route () {
      if (this.visible === false) { return }
      this.close()
    }
  },
  created () {
    this.resetFields()
    this.$nextTick(() => this.$refs.ltform.form.resetFields())
  },
  methods: {
    resetFields () {
      const formRules = {}
      const formData = Object.assign({}, this.data)
      if (this.fields) {
        Object.keys(this.fields).forEach((key) => {
          const { rules, formType } = this.fields[key]
          if (rules) {
            formRules[key] = rules
          }
          if (formType === formItemType.CHECKBOX) {
            formData[key] = this.data ? this.data[key] : []
          } else if (formType === formItemType.SWITCH) {
            formData[key] = this.data ? !!this.data[key] : false
          } else {
            formData[key] = this.data ? this.data[key] : ''
          }
        })
      }
      this.formRules = formRules
      this.formData = formData
    },
    close () {
      if (!this.visible) { return }
      this.$emit('update:visible', false)
      this.runCallback('cancel')
    },
    runCallback (e) {
      if (this.callback) { this.callback(e, this.formData) }
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
      Object.keys(formData).forEach((key) => {
        if (!this.fields[key]) { return }
        const handler = this.fields[key].handler
        if (handler) {
          formData[key] = handler(formData)
        }
      })
      this.loading = true
      try {
        const { data } = await this.$axios.post(this.url, formData)
        if (data.status === 200 || data.status === 0) {
          if (!isNext) {
            this.$emit('update:visible', false)
            this.runCallback('confirm')
          } else {
            this.runCallback('next')
          }
        } else {
          throw new Error(data.message)
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
<style lang="scss" scoped>
.before-text{
  color:rgba(0,0,0,0.85 * 0.4);
  line-height:22px;
  padding: 4px 24px 0;
}
</style>
