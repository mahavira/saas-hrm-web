<template>
  <div class="intro">
    <img class="headimg" src="" alt="">
    <div class="username">{{ user.name }}</div>
    <div class="number">
      <div>女 I {{ user.age }}岁 <span>I</span> 4年工作经验 I {{ user.homeTown }}</div>
      <div>渤海大学 I 网络工程专业</div>
    </div>
    <div class="info">
      <div>
        <i class="icon-ico_occupation is-primary" /> <span>{{ user.workNature }}</span>
      </div>
      <div>
        <i class="icon-ico_iphone is-primary" /> <span>{{ user.mobile }}</span>
      </div>
      <div>
        <i class="icon-ico_emll is-primary" /> <span>{{ user.personalEmail }}</span>
      </div>
    </div>
    <div class="handler">
      <el-button type="default" size="small" class="is-shadow"><i class="icon-ico_new-additions" /> 添加留言</el-button><br>
      <el-button type="default" size="small" class="is-shadow"><i class="icon-ico_export" /> 导出简历</el-button><br>
      <el-button type="default" size="small" class="is-shadow"><i class="icon-ico_to-update is-primary" /> 更新简历</el-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    user: { type: Object, default: () => {} }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
