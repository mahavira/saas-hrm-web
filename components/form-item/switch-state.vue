<template>
  <el-switch
    v-model="model"
    v-bind="mergeProps"
    active-color="#85CACD"
  />
</template>
<script>
const defaultProps = {
  placeholder: '请输入',
  size: 'small',
  class: 'inner-txt',
  activeText: '启动',
  inactiveText: '禁用',
  width: 56
}
export default {
  props: {
    value: {
      type: [Boolean, String],
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
      get () { return !!this.value },
      set (e) {
        this.$emit('update:value', e)
        if (this.$attrs.event) {
          this.$attrs.event(this.$attrs.data, this)
        }
      }
    }
  },
  mounted () {
    console.log(this)
  }
}
</script>
<style scoped lang="scss">
</style>
