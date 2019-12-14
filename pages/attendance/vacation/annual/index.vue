<template>
  <div>
    <table-container ref="tableContainer" />
    <dialog-import :visible.sync="visibleImportDialog" title="批量发放年假">
      <file-card
        label="下载年假数据导入模版"
        desc="下载年假数据导入模板，填写发放的年假数量及生效时间等。"
        href="http://172.16.17.106:9590/hrEducationInfo/template/export"
        download="export.excel"
        guide="1"
        icon="icon_ic_import_excel"
      />
      <file-card
        label="上传年假数据表格"
        desc="将填写好的Excel导入系统。发放是在当前的剩余假期值上增加额度。"
        guide="2"
        icon="icon_ic_export_excel"
      />
    </dialog-import>
  </div>
</template>

<script>
import TableContainer from '~/components/table-container'
import DialogImport from '~/components/dialog/import'
import FileCard from '~/components/file-card'

export default {
  components: { TableContainer, DialogImport, FileCard },
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
