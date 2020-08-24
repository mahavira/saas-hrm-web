<template>
  <el-dialog
    :visible.sync="visible"
    title="停止招聘"
    width="460px"
  >
    <div style="padding:20px">
      <p>
        该职位还有 <span>0</span> 个候选人正在招聘流程，确认要停止招聘？停止后不影响这些候选人的招聘状态
      </p>
      <el-form ref="form" :model="stopRecruit.formData" :rules="stopRecruit.formRules" label-position="top">
        <el-form-item label="停止招聘原因：" prop="stopRecruitReason">
          <el-input v-model="stopRecruit.formData.stopRecruitReason" type="textarea" placeholder="请输入" />
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button @click="stopRecruit.visibleDialog=false" type="default" class="is-cancel" size="small">取消</el-button>
      <el-button @click="handlerStopRecruit" type="primary" class="is-shadow" size="small">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: { type: Boolean, default: false }
  },
  data () {
    return {
      stopRecruit: {
        visibleDialog: false,
        formData: {
          hrRecruitPositionIds: 0,
          stopRecruitReason: ''
        },
        formRules: {
          name: [
            { required: true, message: '请输入原因', trigger: 'blur' }
          ]
        }
      }
    }
  },
  methods: {
    onStopRecruit (ctx) {
      this.stopRecruit.formData.hrRecruitPositionIds = ctx.currentRow.recruitPositionId
      this.stopRecruit.visibleDialog = true
    },
    handlerStopRecruit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitStopRecruit()
        } else {

        }
      })
    },
    async submitStopRecruit () {
      try {
        const { data } = await this.$axios.post('/hrRecruitmentPosition/stop', this.stopRecruit.formData)
        if (data.status === 0 || data.status === 200) {
          this.$message.success('已停止')
          this.stopRecruit.visibleDialog = false
          this.$refs.tableContainer.fetch()
        }
      } catch (e) {
        console.error(e)
        this.$message.error(e.message || e || '错误！')
      } finally {
      }
    }
  }
}
</script>
