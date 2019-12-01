<template>
  <el-form ref="form" :model="formData" class="sp-container__form" label-width="100px">
    <el-form-item v-for="(item, name) in formMeta" :key="name" :label="item.label" :class="{full: item.isFull, 'top-align': item.isTopAlign}" class="item">
      <div v-if="!editing" class="inner">{{ formData[name] || '/' }}</div>
      <div v-else>
        <el-input v-if="item.formType==='input'" v-model="formData[name]" :placeholder="item.placeholder || '请输入'" size="small" />
        <el-select v-if="item.formType==='select'" v-model="formData[name]" :placeholder="item.placeholder || '请选择'" size="small">
          <el-option
            v-for="(option, key) in dict[item.formDict]"
            :key="key"
            :value="key"
            :label="option"
          />
        </el-select>
        <el-date-picker
          v-if="item.formType==='date-select'"
          v-model="formData[name]"
          :placeholder="item.placeholder || '请选择'"
          :format="item.format||'yyyy-MM-dd'"
          :value-format="item.valueFormat||'yyyy-MM-dd HH:mm:ss'"
          size="small"
          type="date"
        />
        <el-input
          :rows="3"
          v-if="item.formType==='textarea'"
          v-model="formData[name]"
          :placeholder="item.placeholder || '请输入'"
          v-bind="item"
          type="textarea"
        />
      </div>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    editing: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: null
    },
    formMeta: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      formData: {},
      loading: false
    }
  },
  computed: {
    dict () {
      return this.$store.state.dict
    }
  },
  watch: {
    data: {
      handler (val) {
        this.$set(this, 'formData', Object.assign({}, val))
      },
      immediate: true
    }
  }
}
</script>
