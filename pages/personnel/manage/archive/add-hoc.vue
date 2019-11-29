<template>
  <el-dialog :visible="visible" @close="close" :close-on-click-modal="false" title="新增教育经历" width="820px">
    <el-form ref="form" :model="formData" :rules="formRules" class="sp-container__form" label-width="100px">
      <el-form-item
        v-for="(item, name) in form"
        :key="name"
        :prop="name"
        :label="item.label"
        :class="{full: item.isFull, 'top-align': item.isTopAlign}"
        class="item"
      >
        <el-input v-if="item.formType==='input'" v-model="formData[name]" :placeholder="item.placeholder || '请输入'" size="small" />
        <el-select v-if="item.formType==='select'" v-model="formData[name]" :placeholder="item.placeholder || '请选择'" size="small">
          <el-option
            label="雄黎明"
            value="雄黎明"
          />
        </el-select>
        <el-date-picker
          v-if="item.formType==='date-select'"
          v-model="formData[name]"
          :placeholder="item.placeholder || '请选择'"
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
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="onSave(true)" size="small">保存，继续录入</el-button>
      <el-button @click="onSave" size="small" type="primary">保存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getConf } from './conf'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    form () {
      const type = this.$route.params.type
      const form = getConf(type, 'addFields')
      return form
    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    },
    onSave (isNext = false) {
      this.$refs.form.validate((valid) => {
        if (valid) {
        } else {
          return false
        }
      })
    }
  }
}
</script>
