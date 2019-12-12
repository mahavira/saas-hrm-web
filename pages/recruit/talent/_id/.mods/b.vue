<template>
  <div class="wrp">
    <div class="el-container header">
      <div class="el-container">
        <div class="block-header">负责人</div>
        <div class="block-items">
          <div class="item" v-for="i in 2" :key="i">
            <div class="avatar"></div>
            <div class="nickname">张艾力</div>
          </div>
          <div class="item">
            <div class="avatar"><i class="icon-ico_new-additions"></i></div>
            <div class="nickname">添加</div>
          </div>
        </div>
      </div>
      <div class="el-container">
        <div class="block-header">协作人</div>
        <div class="block-items">
          <div class="item" v-for="i in 2" :key="i">
            <div class="avatar"></div>
            <div class="nickname">张艾力</div>
          </div>
          <div class="item">
            <div class="avatar"><i class="icon-ico_new-additions"></i></div>
            <div class="nickname">添加</div>
          </div>
        </div>
      </div>
    </div>
    <div class="body">
      <h3>个人简历</h3>
      <el-upload
        drag
        class="upload"
        :show-file-list="false"
        action="https://mock">
        <i class="icon_ic_import_excel icon-png" />
        <div class="el-upload__text">点击或拖拽上传简历</div>
        <div class="el-upload__tip">（支持pdf、doc、docx、htm、html格式、小于5M)</div>
      </el-upload>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
<style scoped lang="scss">
.header{
  padding: 16px 0 24px;
}
.block-header{
  text-align: right;
  padding: 7px 18px 0 40px;
  font-size: 16px;
}
.block-items{
  display: flex;
  .item{
    text-align: center;
    margin: 0 8px;
    .avatar{
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #eee;
      display: flex;
      margin: 0 auto;
      justify-content: center;
      align-items: center;
    }
    .nickname{
      color:rgba(0,0,0,0.5);
      margin-top: 8px;
    }
  }
}
.body{
  border-top: 1px solid rgba(233,233,233,1);
  padding: 0 40px  32px;
  h3{
    font-size:16px;
    font-weight:500;
    margin-bottom: 24px;
    color:rgba(0,0,0,0.85);
  }
  .upload{
    background:rgba(255,255,255,0.31);
    border:2px dashed rgba(189,184,222,1);
    text-align: center;
    /deep/{
      .el-upload{
        display: block
      }
      .el-upload-dragger{
        border: none;
        border-radius: 0;
        width: auto;
        height: auto;
        padding: 120px 0;
      }
      .el-upload__text{
        font-size:16px;
        font-weight:500;
        color:rgba(0,0,0,0.85);
        line-height:24px;
        padding: 10px 5px;
      }
      .el-upload__tip{
        font-size:12px;
        color:rgba(0,0,0,0.425);
      }
    }
  }
}
</style>
