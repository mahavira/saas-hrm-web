<template>
  <div>
    <table-container ref="tableContainer" />
    <el-dialog
      :visible.sync="visibleImportDialog"
      title="批量发放年假"
      width="820px"
    >
      <div class="el-container is-justify-space-around" style="padding:40px 60px 80px">
        <a class="sp-upload-card__file" href="http://172.16.17.106:9590/hrEducationInfo/template/export" download="export.excel">
          <div class="icon-png icon_ic_import_excel" />
          <div class="label">下载年假数据导入模版</div>
          <div class="hint">下载年假数据导入模板，填写发放的年假数量及生效时间等。</div>
          <div class="point">1</div>
        </a>
        <el-upload
          :show-file-list="false"
          :headers="headers"
          :action="uploadUrl"
          :on-success="onImportSuccess"
          class="sp-upload-card__file"
          name="uploadFile"
          drag
          multiple
        >
          <div class="icon-png icon_ic_export_excel" />
          <div class="label">上传年假数据表格</div>
          <div class="hint">将填写好的Excel导入系统。发放是在当前的剩余假期值上增加额度。</div>
          <div class="point">2</div>
        </el-upload>
      </div>
      <div class="sp-wave-svg">
        <div class="wave-svg-shape">
          <svg class="wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 215.43"><path id="svg_1" fill="rgba(246, 230, 46, 0.5)" d="m563,0.80685c-17,-0.39197 -27.33,-0.12936 -40.5,1.04657s-24.58,4.64101 -40.46,5.87967c-13.56,1.05442 -31.27,1.13674 -46.2,0.52917c-17.7,-0.71731 -35,-3.55131 -35,-3.55131s-20.84,-3.51213 -37.84,-3.9041s-27.33,-0.12936 -40.5,1.04657s-24.58,4.64101 -40.46,5.87967c-13.56,1.05442 -31.27,1.13674 -46.2,0.52917c-17.7,-0.71731 -35,-3.55131 -35,-3.55131s-20.84,-3.51213 -37.84,-3.9041s-27.33,-0.12936 -40.5,1.04657s-24.58,4.64101 -40.46,5.87967c-13.56,1.05442 -31.27,1.13674 -46.2,0.52917c-17.7,-0.71731 -35,-3.55131 -35,-3.55131l0,80.37905l600,0l0,-80.39079s-20.84,-3.50037 -37.84,-3.89234l0,-0.00002z" /></svg>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TableContainer from '~/components/table-container'

export default {
  components: { TableContainer },
  data () {
    return {
      uploadUrl: `${this.$axios.defaults.baseURL}/hrEducationInfo/import`,
      headers: {
        token: this.$store.state.authorization
      },
      visibleImportDialog: false,
      visibleSelectDialog: false,
      importing: false
    }
  },
  mounted () {
  },
  methods: {
    async onImportSuccess (response, file, fileList) {
      if (response.data && response.data.status === 0 && response.data.status === 200) {
        return this.$message.success('导入成功')
      }
      try {
        this.importing = true
        const res = await this.$axios.post('hrEducationInfo/export', response.data, {
          responseType: 'blob'
        })
        const fileName = '导入错误说明.xls'
        const blob = new Blob([res.data], { type: 'application/x-xls' })
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, fileName)
        } else {
          const link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = fileName
          link.click()
          window.URL.revokeObjectURL(link.href)
        }
      } catch (e) {
        console.error(e)
        this.$message.error(e.message || e)
      } finally {
        this.importing = false
      }
    },
    showImport () {
    },
    showImportDialog (e) {
      this.visibleImportDialog = true
    }
  }
}
</script>
