<template>
  <el-select v-model="model" v-bind="mergeProps">
    <el-option
      v-for="(label, key) in opts"
      :key="key"
      :value="key"
      :label="label"
    />
  </el-select>
</template>
<script>
import { isObject, isString, isFunction } from '~/utils'

const defaultProps = {
  placeholder: '请选择',
  size: 'small'
}
export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    props: {
      type: Object,
      default: () => {}
    },
    options: {
      type: [String, Object, Function],
      default: null
    }
  },
  data () {
    return {
      remoteOpts: null
    }
  },
  computed: {
    mergeProps () {
      return Object.assign({}, defaultProps, this.props)
    },
    model: {
      get () { return this.value },
      set (e) { this.$emit('update:value', e) }
    },
    opts () {
      if (isString(this.options)) {
        const opts = this.$store.getters['dict/g'](this.options)
        if (!opts) {
          this.$store.dispatch('dict/fetch', this.options)
        }
        return opts
      } else if (isObject(this.options)) {
        return this.options
      } else if (isFunction(this.options)) {
        if (!this.remoteOpts) {
          this.fetchRemoteOptions()
          return null
        } else {
          return this.remoteOpts
        }
      }
      console.error('options值只能为String/Object')
      return null
    }
  },
  methods: {
    async fetchRemoteOptions () {
      const opts = await this.options(this)
      if (opts) { this.remoteOpts = opts }
    }
  }
}
</script>
