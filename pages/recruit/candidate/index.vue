<template>
  <div class="el-container is-vertical">
    <summary-header :props="summaryProps" :data="summaryData" style="bottom:0;background-color:#FFF;padding-bottom:15px" />
    <table-container ref="tableContainer" v-bind="conf" />
    <dialog-import :visible.sync="visibleImportDialog" title="导入">
      <file-card
        label="下载候选人模板"
        desc="下载候选人数据导入模板，填写候选人信息。"
        href="/hrFile/download?fileId=HrTalentArchives"
        download="export.xlsx"
        guide="1"
        icon="icon_ic_import_excel"
      />
      <file-card
        :uploadUrl="uploadUrl"
        label="导入候选人"
        desc="将填写好的Excel导入系统"
        guide="2"
        icon="icon_ic_export_excel"
      />
    </dialog-import>
  </div>
</template>
<script>
import * as conf from './index.conf'
import SummaryHeader from '~/components/summary-header'
import TableContainer from '~/components/table-container'
import DialogImport from '~/components/dialog/import'
import FileCard from '~/components/file-card'
export default {
  components: { SummaryHeader, TableContainer, DialogImport, FileCard },
  data () {
    return {
      conf,
      visibleImportDialog: false,
      uploadUrl: `${this.$axios.defaults.baseURL}/hrCandidate/import`,
      headers: {
        token: this.$store.state.authorization
      },
      summaryData: {},
      summaryProps: [{
        name: 'allCandidateTotal',
        label: '全部',
        value: 0,
        isPrimary: true
      }, {
        name: 'newCandidateTotal',
        label: '新候选',
        value: 0
      // }, {
      //   name: 'interviewResultTotal',
      //   label: '初试通过',
      //   value: 9
      }, {
        name: 'interviewTotal',
        label: '面试安排',
        value: 0
      }, {
        label: '面试结果',
        value: 0,
        children: [{
          name: 'passTotal',
          label: '面试通过',
          value: 0
        }, {
          name: 'offerWaitConfirmTotal',
          label: '待接受offer',
          value: 0
        }, {
          name: 'waitEntryTotal',
          label: '待入职',
          value: 0
        }, {
          name: 'outTotal',
          label: '已淘汰',
          value: 0
        }]
      }]
    }
  },

  created () {
    this.fetchSummary()
  },
  methods: {
    toInfo (e) {
      this.$router.push(`/personnel/manage/roster/${e.currentRow.educationInfoId}`)
    },
    async fetchSummary () {
      try {
        const { data } = await this.$axios.post('/hrCandidate/calc')
        if (data.status === 0) {
          this.summaryData = data.data
        }
      } catch (e) {
        console.error(e)
      }
    },
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
      this.visibleImportDialog = true
    }
  }
}
</script>
