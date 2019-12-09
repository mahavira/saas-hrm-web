<template>
  <div class="sp-material-sidebar">
    <div class="el-container is-justify-space-between">
      <el-button
        @click="onBack"
        type="default"
        class="is-shadow"
        plain
        size="small"
        round
      >
        <i class="el-icon-arrow-left is-primary" />
      </el-button>
      <el-button type="default" class="is-shadow" size="small" round>
        <i class="el-icon-delete is-primary" />
      </el-button>
    </div>
    <div class="intro">
      <img class="headimg" src="" alt="">
      <div class="username">Joe Black</div>
      <div class="number">
        <div>NO.0003</div>
        <div>女 劳务派遣 正式</div>
      </div>
      <div class="info">
        <div>
          <i class="el-icon-user is-primary" /> <span>架构师-B1</span>
        </div>
        <div>
          <i class="el-icon-user-" /> <span>公司经营管理团队</span>
        </div>
        <div>
          <i class="el-icon-mobile-phone is-primary" /> <span>18834567899</span>
        </div>
        <div>
          <i class="el-icon-message is-primary" /> <span>102377489390@163.com</span>
        </div>
      </div>
      <div class="handler">
        <el-button type="primary" size="small" class="is-shadow"><i class="el-icon-refresh" /> 人事异动</el-button><br>
        <el-button type="primary" size="small" class="is-shadow"><i class="el-icon-s-unfold" /> 办理离职</el-button><br>
        <el-button type="default" size="small" class="is-shadow"><i class="el-icon-delete is-primary" /> 删除员工</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    onBack () {
      this.$router.back()
    }
  }
}
</script>
