<template>
  <el-cascader
    v-bind="mergeProps"
    v-model="model"
    :props="cascaderProps"
    @change="onCascader"
  />
</template>
<script>
const defaultProps = {
  placeholder: '请选择',
  size: 'small'
}
export default {
  props: {
    value: {
      type: [Array, String],
      default: () => ['', '']
    },
    props: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      cascaderProps: {
        lazy: true,
        lazyLoad: async (node, resolve) => {
          const { level, value } = node
          let opts
          if (level === 0) {
            opts = this.$store.getters['dict/g']('province')
            if (!opts) {
              await this.$store.dispatch('dict/fetchProvince')
              opts = this.$store.getters['dict/g']('province')
            }
            const nodes = Object.keys(opts).map(key => ({
              value: key,
              label: opts[key],
              // 香港、澳门、台湾
              leaf: ['3228', '3229', '3251'].includes(key) ? 1 : 0
            }))
            resolve(nodes)
          } else {
            let citys = this.$store.getters['dict/g']('city')
            if (citys) { opts = citys[value] }
            if (!citys || !opts || !Object.keys(opts).length) {
              await this.$store.dispatch('dict/fetchCity', value)
              citys = this.$store.getters['dict/g']('city')
              opts = citys[value]
            }
            const nodes = Object.keys(opts).map(key => ({
              value: key,
              label: opts[key],
              leaf: level >= 1
            }))
            resolve(nodes)
          }
        }
      }
    }
  },
  computed: {
    mergeProps () {
      return Object.assign({}, defaultProps, this.props)
    },
    model: {
      get () { return this.value || ['', ''] },
      set (e) { this.$emit('update:value', e) }
    }
  },
  methods: {
    onCascader (e) {
      const { province, city } = this.$attrs.fieldmap
      if (e && e[0]) { this.value[province] = e[0] }
      if (e && e[1]) { this.value[city] = e[1] }
    }
  }
}
</script>
