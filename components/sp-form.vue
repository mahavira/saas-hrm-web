<template>
  <el-form
    ref="form"
    :model="value"
    :class="mode"
    :rules="rules"
    :label-width="labelWidth+'px'"
    class="sp-form"
  >
    <el-form-item
      v-for="(item, name) in fields"
      :key="name"
      :prop="name"
      :label="item.label"
      :class="{full: (item.isFull || item.divider), 'top-align': item.isTopAlign, divider: item.divider, line: item.line}"
      class="item"
    >
      <div v-if="item.divider" />
      <div v-else-if="!edited" v-html="formatter(item, name, value)" class="inner" />
      <div v-else>
        <!-- eslint-disable vue/require-component-is -->
        <component :is="comps[item.formType]" :value.sync="value[name]" v-bind="item" />
      </div>
    </el-form-item>
  </el-form>
</template>
<script>
import FormItem from './form-item'
import * as formtype from '~/constant/formItemType'
import { isArray, isObject, isString } from '~/utils'

export default {
  props: {
    mode: {
      type: String,
      default: 'double'
    },
    fields: {
      type: [Object, Array],
      default: () => {}
    },
    edited: {
      type: [Boolean, String],
      default: true
    },
    rules: {
      type: Object,
      default: () => {}
    },
    value: {
      type: [Array, Object],
      default: () => {}
    },
    labelWidth: {
      type: Number,
      default: 124
    }
  },
  data () {
    return {
      comps: FormItem,
      ...formtype,
      opts: {}
    }
  },
  watch: {
    fields: {
      handler () {
        this.setOpts()
      },
      immediate: true
    },
    value: {
      handler () {
        Object.keys(this.fields).forEach((name) => {
          const item = this.fields[name]
          if (item.formType === formtype.CASCADER_AREA) {
            const provinceKey = item.fieldmap.province
            const cityKey = item.fieldmap.city
            const provinceVal = this.value[provinceKey]
            const cityVal = this.value[cityKey]
            const province = this.$store.state.dict.province
            const city = this.$store.state.dict.city
            if (provinceVal) {
              if (!Object.keys(province).length) {
                this.$store.dispatch('dict/fetchProvince')
              }
              if (!this.value[name]) { this.value[name] = [] }
              this.value[name][0] = provinceVal
            }
            if (cityVal) {
              if (!city[provinceVal]) {
                this.$store.dispatch('dict/fetchCity', provinceVal)
              }
              if (!this.value[name]) { this.value[name] = [] }
              this.value[name][1] = cityVal
            }
          }
        })
      },
      immediate: true
    }
  },
  mounted () {
    this.form = this.$refs.form
  },
  methods: {
    validate () {
      return new Promise((resolve, reject) => {
        this.form.validate((valid) => {
          if (valid) {
            resolve()
          } else {
            reject(new Error('验证不通过'))
          }
        })
      })
    },
    setOpts () {
      Object.keys(this.fields).forEach((name) => {
        const item = this.fields[name]
        if (item.options && isString(item.options)) {
          const opts = this.$store.state.dict.data[item.options]
          if (opts && Object.keys(opts).length) {
            this.$set(this.opts, item.options, opts)
          } else {
            this.$store.dispatch('dict/fetch', item.options).then(() => {
              this.$set(this.opts, item.options, this.$store.state.dict.data[item.options])
            })
          }
        } else if (isArray(item.options)) {
          this.$set(this.opts, name, item.options)
        } else if (isObject(item.options)) {
          this.$set(this.opts, name, item.options)
        }
      })
    },
    formatter (item, key, row) {
      const val = row[key]
      if (item.options) {
        if (isObject(item.options)) {
          return item.options[val]
        } else if (this.opts[item.options] && this.opts[item.options][val]) {
          return this.opts[item.options][val]
        }
      } else if (item.formType === formtype.CASCADER_AREA) {
        const provinceKey = item.fieldmap.province
        const cityKey = item.fieldmap.city
        const provinceVal = row[provinceKey]
        const cityVal = row[cityKey]
        const provincecity = ['/', '']
        if (provinceVal) {
          const provinces = this.$store.state.dict.province
          provincecity[0] = provinces[provinceVal]
        }
        if (cityVal) {
          const citys = this.$store.state.dict.city
          const city = citys[provinceVal]
          if (city) { provincecity[1] = city[cityVal] }
        }
        return provincecity.join(' ')
      }
      if (item.formatter) {
        return item.formatter(row)
      }
      if (!val) { return item.ellipsis || '/' }
      return val
    }
  }
}
</script>
<style scoped lang="scss">
.divider{
  margin: 0;
  &.line{
    margin: 0 0 14px 0;
    padding-top: 10px;
    border-top: 1px solid rgba(215,214,230,1);
  }
}

</style>
