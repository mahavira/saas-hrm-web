<template>
  <el-scrollbar class="is-vertical sp-fixed-height__one">
    <table-container v-bind="conf" />
    <dialog-import :visible.sync="visibleImportDialog" title="批量导入人才">
      <file-card
        label="下载数据导入模版"
        desc="下载数据导入模板"
        href="http://172.16.17.106:9590/hrEducationInfo/template/export"
        download="export.excel"
        guide="1"
        icon="icon_ic_import_excel"
      />
      <file-card
        label="上传"
        desc="上传填写好的excel"
        guide="2"
        upload-url="/hrTalentArchives/import"
        icon="icon_ic_export_excel"
      />
    </dialog-import>
  </el-scrollbar>
</template>

<script>
import * as conf from './index.conf'
import TableContainer from '~/components/table-container'
import { downloadBlobFile } from '~/utils/file'
import DialogImport from '~/components/dialog/import'
import FileCard from '~/components/file-card'

export default {
  components: { TableContainer, DialogImport, FileCard },
  data () {
    return {
      conf,
      visibleImportDialog: false
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
      }
    },
    onImportTalent (ctx) {
      this.visibleImportDialog = true
    },
    async onRemove (ctx) {
      await this.$confirm('确定移出人才库？ 该操作只会从人才库中移出人才，TA 在候选人中的应聘记录不会被移出。', '移出人才库', {
        confirmButtonText: '确 认',
        cancelButtonText: '取 消',
        type: 'warning'
      })
      try {
        const { data } = await this.$axios.post('/hrTalentArchives/remove', {
          talentIds: ctx.currentRow.talentId
        })
        if (data.status === 200 || data.status === 0) {
          this.$notify({
            type: 'success',
            message: '已移出人才库!'
          })
          ctx.fetch()
        }
      } catch (e) {
        console.error(e)
        this.$message.error(e.message || e)
      } finally {
      }
    },
    onMoveToCandidate (ctx) {
      this.$bus.$emit('dialog:form', Object.assign({}, conf.dialog.moveCandidate, {
        data: {
          talentId: ctx.currentRow.talentId
        }
      }))
    },
    async onImportResume (ctx) {
      try {
        const res = await this.$axios.post('/hrTalentArchives/download', {
          hrTalentArchivesIds: ctx.currentRow.talentId
        })
        downloadBlobFile(res.data, `${ctx.currentRow.name}简历.doc`, 'application/msword')
      } catch (e) {
        console.error(e)
        this.$message.error(e.message || e)
      } finally {
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
