<template>
  <div class="sp-container__detail">
    <div class="header">
      <div>
        <el-button @click="$emit('update:visible', false)" class="back" size="small" icon="el-icon-arrow-right" />
      </div>
      <div>
        <el-button type="primary" size="small" class="is-shadow"><i class="el-icon-plus" /> 确认入职</el-button>
        <el-button @click="onEdit" type="default" size="small" class="is-shadow"><i class="el-icon-edit" /> 快速编辑</el-button>
      </div>
    </div>
    <el-scrollbar class="body is-vertical">
      <el-form ref="form" :model="data" class="sp-container__form" label-width="100px">
        <el-form-item v-for="(item, name) in form" :key="name" :label="item.label" :class="{full: item.isFull, 'top-align': item.isTopAlign}" class="item">
          <div v-if="!isEdit">{{ data[name] || '-' }}</div>
          <div v-else>
            <el-input v-if="item.formType==='input'" v-model="data[name]" :placeholder="item.placeholder || '请输入'" size="small" />
            <el-select v-if="item.formType==='select'" v-model="data[name]" :placeholder="item.placeholder || '请选择'" size="small">
              <el-option
                label="雄黎明"
                value="雄黎明"
              />
            </el-select>
            <el-date-picker
              v-if="item.formType==='date-select'"
              v-model="data[name]"
              :placeholder="item.placeholder || '请选择'"
              size="small"
              type="date"
            />
            <el-input
              :rows="3"
              v-if="item.formType==='textarea'"
              v-model="data[name]"
              :placeholder="item.placeholder || '请输入'"
              v-bind="item"
              type="textarea"
            />
          </div>
        </el-form-item>
      </el-form>
    </el-scrollbar>
    <div class="footer">
      <el-button @click="cancelEdit" type="default" size="small" class="is-shadow">取消</el-button>
      <el-button type="primary" size="small" class="is-shadow">保存</el-button>
    </div>
  </div>
</template>
<script>
import { editFields } from './conf'

export default {
  props: {
    data: {
      type: Object,
      default: null,
      form: editFields
    }
  },
  data () {
    return {
      formData: {},
      isEdit: false
    }
  },
  methods: {
    onEdit () {
      this.isEdit = true
    },
    cancelEdit () {
      this.isEdit = false
    }
  }
}
</script>
