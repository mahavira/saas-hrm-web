<template>
  <div class="sp-detail">
    <div class="header">
      <div>
        <el-button @click="back" class="back" size="small" icon="el-icon-arrow-right" />
      </div>
      <div v-if="!editing">
        <t-handler v-for="(item, index) in handler" :key="index" :item="item" />
      </div>
    </div>
    <el-scrollbar class="body is-vertical">
      <sp-form ref="ltform" v-model="formData" :fields="fields" :edited="editing" />
    </el-scrollbar>
    <div v-if="editing" class="footer">
      <el-button @click="cancelEdit" type="default" size="small" class="is-shadow">取消</el-button>
      <el-button @click="onSave" :loading="loading" type="primary" size="small" class="is-shadow">保存</el-button>
    </div>
  </div>
</template>
<script>
import THandler from './handler'
import SpForm from '~/components/sp-form'

export default {
  components: { SpForm, THandler },
  props: {
    data: { type: Object, default: null },
    fields: { type: Object, default: null },
    url: { type: String, default: '' },
    handler: { type: Array, default: () => [] }
  },
  data () {
    return {
      formData: {},
      loading: false,
      editing: false
    }
  },
  watch: {
    data: {
      handler (val) {
        this.$set(this, 'formData', Object.assign({}, val))
      },
      immediate: true
    }
  },
  methods: {
    back () {
      this.$parent.visibleDetail = false
    },
    onEdit () {
      this.editing = true
    },
    cancelEdit () {
      this.editing = false
    },
    onSave () {
      this.$refs.ltform.form.validate((valid) => {
        if (valid) {
          this.save()
        } else {
          return false
        }
      })
    },
    async save () {
      const formData = Object.assign({}, this.formData)
      this.loading = true
      try {
        await this.$axios.post(this.url, formData)
        this.$emit('update:data', this.formData)
        this.editing = false
      } catch (e) {} finally {
        this.loading = false
      }
    }
  }
}
</script>
