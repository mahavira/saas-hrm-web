<template>
  <el-cascader
    v-bind="mergeProps"
    v-model="model"
    :props="cascaderProps"
    @change="onCascader($event,item)"
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
            opts = this.$store.state.dict.province
            if (!Object.keys(opts).length) {
              await this.$store.dispatch('dict/fetchProvince')
              opts = this.$store.state.dict.province
            }
            const nodes = Object.keys(opts).map(key => ({
              value: key,
              label: opts[key],
              // 香港、澳门、台湾
              leaf: ['3228', '3229', '3251'].includes(key) ? 1 : 0
            }))
            resolve(nodes)
          } else {
            let citys = this.$store.state.dict.city
            opts = citys[value]
            if (!opts || !Object.keys(opts).length) {
              await this.$store.dispatch('dict/fetchCity', value)
              citys = this.$store.state.dict.city
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
    onCascader (e, item) {
      if (e && e[0]) { this.value[item.fieldmap.province] = e[0] }
      if (e && e[1]) { this.value[item.fieldmap.city] = e[1] }
    }
  }
}
</script>
