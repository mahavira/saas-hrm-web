<template>
  <div>
    <table-container ref="tableContainer" />
    <dialog-import :visible.sync="visibleImportDialog" :title="isImportUpdate?'批量导入更新':'批量导入'">
      <file-card
        :label="isImportUpdate?'导出模版':'导出记录'"
        :desc="isImportUpdate?'导出标准模版，支持批量导入与员工教育经历':'导出已有信息进行编辑'"
        href="http://172.16.17.106:9590/hrEducationInfo/template/export"
        download="export.excel"
        guide="1"
        icon="icon_ic_import_excel"
      />
      <file-card
        :label="isImportUpdate?'导入文件':'导入文件'"
        :desc="isImportUpdate?'导入员工教育经历，完成新增':'导入编辑更新后的信息'"
        guide="2"
        icon="icon_ic_export_excel"
      />
    </dialog-import>
    <select-import-dialog :visible.sync="visibleSelectDialog" @select="showImportDialog" />
  </div>
</template>

<script>
import TableContainer from '~/components/table-container'
import SelectImportDialog from '~/components/select-import-dialog'
import DialogImport from '~/components/dialog/import'
import FileCard from '~/components/file-card'

export default {
  components: { TableContainer, SelectImportDialog, DialogImport, FileCard },
  data () {
    return {
      uploadUrl: `${this.$axios.defaults.baseURL}/hrEducationInfo/import`,
      headers: {
        token: this.$store.state.authorization
      },
      visibleImportDialog: false,
      visibleSelectDialog: false,
      isImportUpdate: false,
      importing: false
    }
  },
  mounted () {
  },
  methods: {
    showImport () {
      this.visibleSelectDialog = true
    },
    showImportDialog (e) {
      this.isImportUpdate = !!e
      this.visibleSelectDialog = false
      this.visibleImportDialog = true
    }
  }
}
</script>
