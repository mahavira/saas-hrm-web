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
  activeText: '是',
  inactiveText: '否',
  width: 46
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
      set (e) { this.$emit('update:value', e) }
    }
  }
}
</script>
<style scoped lang="scss">
</style>
