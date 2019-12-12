<template>
  <div class="sp-detail">
    <div class="header">
      <div>
        <el-button @click="back" class="back" size="small" icon="el-icon-arrow-right" />
      </div>
      <div v-if="!parent.edited">
        <t-handler v-for="(item, index) in handler" :key="index" :item="item" />
      </div>
    </div>
    <el-scrollbar class="body is-vertical">
      <sp-form
        ref="ltform"
        v-model="formData"
        :fields="fields"
        :edited="parent.edited"
        :class="{condensed:parent.isCondensed}"
      />
    </el-scrollbar>
    <transition name="transform-y">
      <div v-if="parent.edited" class="footer">
        <el-button @click="cancelEdit" type="default" size="small" class="is-shadow">取消</el-button>
        <el-button @click="onSave" :loading="loading" type="primary" size="small" class="is-shadow">保存</el-button>
      </div>
    </transition>
  </div>
</template>
<script>
import THandler from './handler'
import SpForm from '~/components/sp-form'

export default {
  inject: ['parent'],
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
      loading: false
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
      this.parent.visibleDetail = false
    },
    onEdit () {
      this.parent.edited = true
    },
    cancelEdit () {
      this.parent.edited = false
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
        this.parent.edited = false
        this.$notify.success('已保存')
      } catch (e) {
        this.$notify.success(e.message || '保存失败！')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
