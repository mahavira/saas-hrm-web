<template>
  <section class="">
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>

    <el-row>
      <el-button plain>朴素按钮</el-button>
      <el-button type="primary" plain>主要按钮</el-button>
      <el-button type="success" plain>成功按钮</el-button>
      <el-button type="info" plain>信息按钮</el-button>
      <el-button type="warning" plain>警告按钮</el-button>
      <el-button type="danger" plain>危险按钮</el-button>
    </el-row>

    <el-row>
      <el-button round>圆角按钮</el-button>
      <el-button type="primary" round>主要按钮</el-button>
      <el-button type="success" round>成功按钮</el-button>
      <el-button type="info" round>信息按钮</el-button>
      <el-button type="warning" round>警告按钮</el-button>
      <el-button type="danger" round>危险按钮</el-button>
    </el-row>

    <el-row>
      <el-button icon="el-icon-search" circle />
      <el-button type="primary" icon="icon-ico_edit" circle />
      <el-button type="success" icon="el-icon-check" circle />
      <el-button type="info" icon="el-icon-message" circle />
      <el-button type="warning" icon="el-icon-star-off" circle />
      <el-button type="danger" icon="icon-ico_delete" circle />
    </el-row>
    <el-row>
      <el-button disabled>默认按钮</el-button>
      <el-button type="primary" disabled>主要按钮</el-button>
      <el-button type="success" disabled>成功按钮</el-button>
      <el-button type="info" disabled>信息按钮</el-button>
      <el-button type="warning" disabled>警告按钮</el-button>
      <el-button type="danger" disabled>危险按钮</el-button>
    </el-row>

    <el-row>
      <el-button plain disabled>朴素按钮</el-button>
      <el-button type="primary" plain disabled>主要按钮</el-button>
      <el-button type="success" plain disabled>成功按钮</el-button>
      <el-button type="info" plain disabled>信息按钮</el-button>
      <el-button type="warning" plain disabled>警告按钮</el-button>
      <el-button type="danger" plain disabled>危险按钮</el-button>
    </el-row>

    <el-row>
      <el-button type="primary" icon="icon-ico_edit" />
      <el-button type="primary" icon="el-icon-share" />
      <el-button type="primary" icon="icon-ico_delete" />
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
      <el-button type="primary">上传<i class="el-icon-upload el-icon--right" /></el-button>
    </el-row>

    <el-row>
      <el-button-group>
        <el-button type="primary" icon="el-icon-arrow-left">上一页</el-button>
        <el-button type="primary">下一页<i class="el-icon-arrow-right el-icon--right" /></el-button>
      </el-button-group>
    </el-row>

    <el-row>
      <el-button-group>
        <el-button type="primary" icon="icon-ico_edit" />
        <el-button type="primary" icon="el-icon-share" />
        <el-button type="primary" icon="icon-ico_delete" />
      </el-button-group>
    </el-row>
    <el-row>
      <el-button :loading="true" type="primary">加载中</el-button>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'ExampleButton',
  data () {
    return {}
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/{
  .el-row{
    margin-bottom: 15px;
  }
}
</style>
