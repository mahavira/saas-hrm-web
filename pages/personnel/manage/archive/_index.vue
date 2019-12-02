<template>
  <div>
    <table-container ref="tableContainer" v-bind="conf" />
    <el-dialog
      :visible.sync="visibleImportDialog"
      :title="isImportUpdate?'批量导入':'批量导入更新'"
      width="820px"
    >
      <div class="el-container is-justify-space-around" style="padding:40px 60px 80px">
        <a class="sp-upload-card__file" href="http://172.16.17.106:9590/api/hrEducationInfo/template/export" download="export.excel">
          <div @click="onImport" class="icon-file file-upload" />
          <div class="label">{{ isImportUpdate?'导出记录':'导出模版' }}</div>
          <div class="hint">{{ isImportUpdate?'导出已有信息进行编辑':'导出标准模版，支持批量导入与员工教育经历' }}</div>
          <div class="point">1</div>
        </a>
        <el-upload
          :show-file-list="false"
          :headers="headers"
          :action="uploadUrl"
          class="sp-upload-card__file"
          name="uploadFile"
          drag
          multiple
        >
          <div class="icon-file file-download" />
          <div class="label">{{ isImportUpdate?'导入文件':'导入文件' }}</div>
          <div class="hint">{{ isImportUpdate?'导入编辑更新后的信息':'导入员工教育经历，完成新增' }}</div>
          <div class="point">2</div>
        </el-upload>
      </div>
      <div class="sp-wave-svg">
        <div class="wave-svg-shape">
          <svg class="wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 215.43"><path id="svg_1" fill="rgba(246, 230, 46, 0.5)" d="m563,0.80685c-17,-0.39197 -27.33,-0.12936 -40.5,1.04657s-24.58,4.64101 -40.46,5.87967c-13.56,1.05442 -31.27,1.13674 -46.2,0.52917c-17.7,-0.71731 -35,-3.55131 -35,-3.55131s-20.84,-3.51213 -37.84,-3.9041s-27.33,-0.12936 -40.5,1.04657s-24.58,4.64101 -40.46,5.87967c-13.56,1.05442 -31.27,1.13674 -46.2,0.52917c-17.7,-0.71731 -35,-3.55131 -35,-3.55131s-20.84,-3.51213 -37.84,-3.9041s-27.33,-0.12936 -40.5,1.04657s-24.58,4.64101 -40.46,5.87967c-13.56,1.05442 -31.27,1.13674 -46.2,0.52917c-17.7,-0.71731 -35,-3.55131 -35,-3.55131l0,80.37905l600,0l0,-80.39079s-20.84,-3.50037 -37.84,-3.89234l0,-0.00002z" /></svg>
        </div>
      </div>
    </el-dialog>

    <transition name="fade">
      <div v-if="visibleSelectDialog" @click="visibleSelectDialog=false" class="select-dialog">
        <div @click.stop="showImportDialog(false)" class="item">
          <div class="sp-wave-svg" style="height:180px;">
            <div class="wave-svg-shape">
              <svg id="738255fe-a9fa-4a5e-963a-8e97f59370ad" class="wave-svg" xmlns="http://www.w3.org/2000/svg" data-name="3-waves" viewBox="0 0 600 215.43"><path class="871c1787-a7ef-4a54-ad03-3cd50e05767a" d="M639,986.07c-17-1-27.33-.33-40.5,2.67s-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06S456,987.07,439,986.07s-27.33-.33-40.5,2.67-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06S256,987.07,239,986.07s-27.33-.33-40.5,2.67-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06v205.06h600V996S656,987.07,639,986.07Z" transform="translate(-76 -985)" /></svg>
            </div>
          </div>
          <div class="wrp">
            <img src="~/assets/icon/scene_add_staff@2x.png" alt="">
            <h3 class="title">批量导入新增</h3>
            <p>适用于首次批量导入添加员工信息，支持导入在职，离职员工.</p>
          </div>
        </div>
        <div @click.stop="showImportDialog(true)" class="item">
          <div class="sp-wave-svg" style="height:180px;">
            <div class="wave-svg-shape">
              <svg id="738255fe-a9fa-4a5e-963a-8e97f59370ad" class="wave-svg" xmlns="http://www.w3.org/2000/svg" data-name="3-waves" viewBox="0 0 600 215.43"><path class="871c1787-a7ef-4a54-ad03-3cd50e05767a" d="M639,986.07c-17-1-27.33-.33-40.5,2.67s-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06S456,987.07,439,986.07s-27.33-.33-40.5,2.67-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06S256,987.07,239,986.07s-27.33-.33-40.5,2.67-24.58,11.84-40.46,15c-13.56,2.69-31.27,2.9-46.2,1.35-17.7-1.83-35-9.06-35-9.06v205.06h600V996S656,987.07,639,986.07Z" transform="translate(-76 -985)" /></svg>
            </div>
          </div>
          <div class="wrp">
            <img src="~/assets/icon/scene_update_staff@2x.png" alt="">
            <h3 class="title">批量导入更新</h3>
            <p>适用于批量更新，修改系统已存在人员的信息.</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { getConf } from './.conf/index'
import TableContainer from '~/components/table-container'

export default {
  components: { TableContainer },
  data () {
    return {
      conf: getConf(this.$route.params.index),
      uploadUrl: `${this.$axios.defaults.baseURL}/hrEducationInfo/import`,
      headers: {
        token: this.$store.state.authorization
      },
      visibleImportDialog: false,
      visibleSelectDialog: false,
      isImportUpdate: false
    }
  },
  mounted () {
  },
  methods: {
    onImport () {
      this.$axios.get('hrEducationInfo/template/export')
    },
    showImport () {
      this.visibleSelectDialog = true
    },
    showImportDialog (e) {
      this.isImportUpdate = e
      this.visibleSelectDialog = false
      this.visibleImportDialog = true
    }
  }
}
</script>
<style lang="scss" scoped>
  .select-dialog{
    position: fixed;
    left: 80px;
    top: 0;
    right: 0;
    bottom: 0;
    background:rgba(0,0,0,0.25);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
    .item{
      width: 300px;
      height: 300px;
      background:rgba(255,255,255,1);
      border-radius:10px;
      padding: 50px;
      margin: 0 10px;
      color: rgba(0, 0, 0, 0.85);
      position: relative;
      cursor: pointer;
      .wrp{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }
      img{
        width: 180px;
        height: 180px;
      }
      p{
        color:rgba(0,0,0,0.85 * 0.5);
        line-height: 22px;
        text-align: center;
      }
    }
  }
</style>
