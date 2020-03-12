<template>
  <el-input-number
    v-model="model"
    v-bind="mergeProps"
  />
</template>
<script>
const defaultProps = {
  placeholder: '请输入',
  size: 'small'
}
export default {
  props: {
    value: {
      type: Number,
      default: 0
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
