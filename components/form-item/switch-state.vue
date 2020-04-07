<template>
  <el-switch
    v-model="model"
    v-bind="mergeProps"
    active-color="#85CACD"
  />
</template>
<script>
import { toBooble } from '~/utils'
const defaultProps = {
  placeholder: '请输入',
  size: 'small',
  class: 'inner-txt',
  activeText: '启用',
  inactiveText: '禁用',
  width: 56
}
export default {
  props: {
    value: {
      type: [Boolean, String, Number],
      default: false
    },
    props: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    mergeProps () {
      return Object.assign({}, defaultProps, this.props)
    },
    model: {
      get () { return toBooble(this.value) },
      set (e) {
        let val = e
        if (this.$attrs.handler) {
          val = this.$attrs.handler(this.$attrs.data, this)
        } else {
          val = e ? 1 : 0
        }
        this.$emit('update:value', val)
        if (this.$attrs.event) {
          this.$attrs.event(this.$attrs.data, this)
        }
      }
    }
  }
}
</script>
