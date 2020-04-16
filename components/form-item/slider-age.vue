<template>
  <el-slider
    v-model="model"
    v-bind="mergeProps"
    range
  />
</template>
<script>
import { isString, isArray, isNumber } from '~/utils'
const defaultProps = {
  min: 18,
  max: 65
}
export default {
  props: {
    value: {
      type: [Number, String, Array],
      default: () => [18, 18]
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
      get () {
        if (!this.value) { return [18, 18] }
        if (isString(this.value)) {
          return this.value.split('-').map(row => row - 0 || 0)
        }
        if (isArray(this.value)) {
          return this.value.map((item) => {
            if (isNumber(item)) { return item } else { return 0 }
          })
        }
        return this.value
      },
      set (e) {
        const re = e.join('-')
        this.$emit('update:value', re)
      }
    }
  }
}
</script>
<style scoped lang="scss">
</style>
