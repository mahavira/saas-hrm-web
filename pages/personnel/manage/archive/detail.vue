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
      <el-form ref="form" :model="formData" class="sp-container__form" label-width="100px">
        <el-form-item v-for="(item, name) in form" :key="name" :label="item.label" :class="{full: item.isFull, 'top-align': item.isTopAlign}" class="item">
          <div v-if="!isEdit" class="inner">{{ formData[name] || '-' }}</div>
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
    </el-scrollbar>
    <div class="footer">
      <el-button @click="cancelEdit" type="default" size="small" class="is-shadow">取消</el-button>
      <el-button @click="onSave" :loading="loading" type="primary" size="small" class="is-shadow">保存</el-button>
    </div>
  </div>
</template>
<script>
import { getConf } from './conf'

export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      formData: {},
      isEdit: false,
      loading: false
    }
  },
  computed: {
    form () {
      const type = this.$route.params.type
      const form = getConf(type, 'editFields')
      return form
    },
    dict () {
      return this.$store.state.dict
    }
  },
  watch: {
    data: {
      handler (val) {
        this.$set(this, 'formData', Object.assign({}, val))
        this.fetch()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    async fetch () {
      const { data } = await this.$axios.post('hrEducationInfo/detail', {
        educationInfoId: this.formData.educationInfoId
      })
      this.formData = data.data
    },
    onEdit () {
      this.isEdit = true
    },
    cancelEdit () {
      this.isEdit = false
    },
    onSave () {
      this.save()
    },
    async save () {
      const formData = Object.assign({}, this.formData, {
        educationEndTime: this.$moment(this.formData.educationEndTime).format('YYYY-MM-DD HH:mm:ss'),
        educationStartTime: this.$moment(this.formData.educationStartTime).format('YYYY-MM-DD HH:mm:ss')
      })
      this.loading = true
      await this.$axios.post('hrEducationInfo/edit', formData)
      this.isEdit = false
      this.loading = false
    }
  }
}
</script>
