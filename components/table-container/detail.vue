<template>
  <div class="sp-detail">
    <div class="header">
      <div>
        <el-button @click="back" class="back" size="small" icon="icon-ico_next" />
      </div>
      <div v-if="!parent.edited">
        <t-handler v-for="(item, index) in handler" :key="index" :item="item" />
      </div>
    </div>
    <el-scrollbar class="body is-vertical">
      <div v-if="isMultipleFields">
        <div v-for="(item,index) in fields" :key="index">
          <div v-if="(!parent.edited || (parent.edited && editedKey === item.key))">
            <div class="title">{{ item.title }}</div>
            <sp-form
              :ref="item.key"
              v-model="formData"
              :fields="item.fields"
              :edited="parent.edited"
              :class="{condensed:parent.isCondensed}"
            />
          </div>
        </div>
      </div>
      <sp-form
        ref="ltform"
        v-else
        v-model="formData"
        :fields="fields"
        :edited="parent.edited"
        :class="{condensed:parent.isCondensed}"
      />
    </el-scrollbar>
    <transition name="transform-y">
      <div v-if="parent.edited" class="footer">
        <el-button @click="cancelEdit" type="default" size="small" class="is-cancel">取消</el-button>
        <el-button @click="onSave" :loading="loading" type="primary" size="small" class="is-shadow">保存</el-button>
      </div>
    </transition>
  </div>
</template>
<script>
import THandler from './handler'
import SpForm from '~/components/sp-form'
import { isArray } from '~/utils'

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
      editedKey: '',
      loading: false
    }
  },
  computed: {
    isMultipleFields () {
      return isArray(this.fields)
    }
  },
  watch: {
    data: {
      handler (val) {
        const formData = Object.assign({}, val)
        this.$set(this, 'formData', formData)
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
      Object.keys(formData).forEach((key) => {
        if (!this.fields[key]) { return }
        const handler = this.fields[key].handler
        if (handler) {
          formData[key] = handler(formData[key])
        }
      })
      this.loading = true
      try {
        await this.$axios.post(this.url, formData)
        this.$emit('update:data', formData)
        Object.keys(formData).forEach((key) => {
          this.data[key] = formData[key]
        })
        this.parent.edited = false
        this.$notify.success('已保存')
      } catch (e) {
        this.$notify.error(e.message || '保存失败！')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.title{
  font-size: 14px;
  font-weight: 500;
  padding: 0 0 0 32px;
}
</style>
