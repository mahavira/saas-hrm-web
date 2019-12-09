<template>
  <el-form
    ref="form"
    :model="value"
    :class="mode"
    :rules="rules"
    class="sp-form"
    label-width="124px"
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
      <div v-else-if="!edited" class="inner">{{ value[name] || '/' }}</div>
      <div v-else>
        <el-input v-if="!item.formType||INPUT === item.formType" v-model="value[name]" :placeholder="item.placeholder||'请输入'" size="small" />
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
        <el-input-number
          v-if="INPUT_NUMBER === item.formType"
          v-model="value[name]"
          :placeholder="item.placeholder||'请输入'"
          size="small"
        />
        <el-checkbox-group
          v-if="CHECKBOX === item.formType"
          v-model="value[name]"
          :placeholder="item.placeholder||'请选择'"
          size="small"
          class="checkbox-group"
        >
          <el-checkbox v-for="(label, key) in opts[name]" :label="key" :key="key">{{ label }}</el-checkbox>
        </el-checkbox-group>
        <el-radio-group
          v-if="RADIO === item.formType"
          v-model="value[name]"
          :placeholder="item.placeholder||'请选择'"
          size="small"
          class="radio-group"
        >
          <el-radio v-for="(label, key) in opts[name]" :label="key" :key="key">{{ label }}</el-radio>
        </el-radio-group>
      </div>
    </el-form-item>
  </el-form>
</template>
<script>
import * as formtype from '~/config/formItemType'
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
<style scoped lang="scss">
.divider{
  margin: 0 0 14px 0;
  padding-top: 10px;
  &.line{
    border-top: 1px solid rgba(215,214,230,1);
  }
}
.checkbox-group{
  height: 32px;
}
</style>
