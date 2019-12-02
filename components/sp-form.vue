<template>
  <el-form ref="form" :model="value" :rules="rules" class="sp-form" label-width="100px">
    <el-form-item
      v-for="(item, name) in fields"
      :key="name"
      :prop="name"
      :label="item.label"
      :class="{full: item.isFull, 'top-align': item.isTopAlign}"
      class="item"
    >
      <div v-if="!edited" class="inner">{{ value[name] || '/' }}</div>
      <div v-else>
        <el-input v-if="INPUT === item.formType" v-model="value[name]" :placeholder="item.placeholder||'请输入'" size="small" />
        <el-date-picker
          v-if="DATE_PICKER === item.formType"
          v-model="value[name]"
          :placeholder="item.placeholder || '请选择'"
          :format="item.format||'yyyy-MM-dd'"
          :value-format="item.valueFormat||'yyyy-MM-dd HH:mm:ss'"
          size="small"
          type="date"
        />
        <el-select v-if="SELECT === item.formType" v-model="value[name]" :placeholder="item.placeholder||'请选择'" size="small">
          <el-option
            v-for="(label, key) in opts[name]"
            :key="key"
            :value="key"
            :label="label"
          />
        </el-select>
        <el-input
          v-if="TEXTAREA === item.formType"
          :rows="item.rows||3"
          v-model="value[name]"
          :placeholder="item.placeholder||'请输入'"
          type="textarea"
        />
      </div>
    </el-form-item>
  </el-form>
</template>
<script>
import * as formtype from '~/utils/formType'
import { isArray, isObject, isString } from '~/utils'

export default {
  // functional: true,
  props: {
    fields: {
      type: [Object, Array],
      default: () => {}
    },
    edited: {
      type: Boolean,
      default: true
    },
    rules: {
      type: Object,
      default: () => {}
    },
    value: {
      type: [String, Array, Boolean, Number, Date, Object],
      default: () => {}
    }
  },
  data () {
    return {
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
    }
  },
  mounted () {
    this.form = this.$refs.form
  },
  methods: {
    setOpts () {
      Object.keys(this.fields).forEach((name) => {
        const item = this.fields[name]
        if (isString(item.options) && item.options) {
          const opts = this.$store.state.dict[item.options]
          if (opts && Object.keys(opts).length) {
            this.$set(this.opts, name, opts)
          } else {
            this.$store.dispatch('dict/fetch', item.options).then(() => {
              this.$set(this.opts, name, this.$store.state.dict[item.options])
            })
          }
        } else if (isArray(item.options)) {
          this.$set(this.opts, name, item.options)
        } else if (isObject(item.options)) {
          this.$set(this.opts, name, item.options)
        }
      })
    }
  }
}
</script>
