<template>
  <el-time-picker
    v-bind="mergeProps"
    v-model="model"
  />
</template>
<script>
const defaultProps = {
  placeholder: '请选择',
  format: 'HH:mm:ss',
  valueFormat: 'HH:mm:ss',
  size: 'small',
  type: 'time'
}
export default {
  props: {
    value: {
      type: [String, Date],
      default: new Date()
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
      get () { return this.value },
      set (e) { this.$emit('update:value', e) }
    }
  }
}
</script>
<style scoped lang="scss">
</style>
