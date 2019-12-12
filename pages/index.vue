<template lang="pug">
section.el-container(style="height:0")
  h2.title 工作台
  el-scrollbar.container.is-vertical
    .mod-left
      .mod-group
        .mod.card
      .mod-group
        .mod.quick
          i.icon-png.icon_ic_bankcard4
          span 添加
          span 招聘计划
        .mod.quick
          i.icon-png.icon_ic_export_excel3
          span 添加
          span 面试安排
        .mod.quick
          i.icon-png.workbench_Shortcut_Addcontract_icon
          span 添加
          span 合同签署
        .mod.quick
          i.icon-png.workbench_Shortcut_Addcontract_icon4
          span 创建
          span 组织架构
        .mod.quick
          i.icon-png.icon_ic_bankcard
          span 导入
          span 员工档案
        .mod.quick
          i.icon-png.workbench_Shortcut_Addcontract_icon3
          span 添加
          span 员工
        .mod.quick
          i.icon-png.icon_ic_import_excel3
          span 添加
          span 人才
        .mod.quick
          i.icon-png.workbench_Shortcut_roster_icon
          span 导入
          span 花名册
      .mod-group
        .mod.aaa
        .mod.bbb
    .mod-right
      .mod.calendar
</template>

<style lang="scss" scoped>
@import '~/assets/var.scss';

.el-scrollbar.container {
  flex: 1;
  /deep/ {
    >.el-scrollbar__wrap {
      >.el-scrollbar__view {
        display: flex;
        padding: 32px 24px 0;
      }
    }
  }
}

.title {
  position: absolute;
  top: 0;
  font-size: 20px;
  font-weight: 500;
  color: rgba(255,255,255,1);
  padding: 5px 0 0 44px;
}
.mod-left {
  flex: 0 0 856px;
  margin-right: 24px;
}
.mod-right {
  flex: 1;
}
.mod-group {
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding-bottom: 24px;
}
.mod {
  background: #FFF;
  box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.05);
  border-radius: 10px;
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0px 4px 15px 0px rgba(0,0,0,0.2);
  }
}
.card {
  width: 100%;
  height: 330px;
  background: #FFF1D8 url(../assets/icon/bg_workbench.png) left center no-repeat;
  background-size: auto 100%;
}
.quick {
  width: 86px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color:rgba(0,0,0,0.85);
  line-height: 20px;
  background-position: right bottom;
  background-repeat: no-repeat;
  background-size: cover;
  .icon-png{
    width: 32px;
    height: 32px;
    margin-bottom: 16px;
  }
  &:nth-of-type(1){ background-image: url(../assets/icon/workbench_Shortcut_Addarchives_bg.png); }
  &:nth-of-type(2){ background-image: url(../assets/icon/workbench_Shortcut_Addinterview_bg.png); }
  &:nth-of-type(3){ background-image: url(../assets/icon/workbench_Shortcut_Addcontract_bg.png); }
  &:nth-of-type(4){ background-image: url(../assets/icon/workbench_Shortcut_Addorganization_bg.png); }
  &:nth-of-type(5){ background-image: url(../assets/icon/workbench_Shortcut_Addrecruitment_bg.png); }
  &:nth-of-type(6){ background-image: url(../assets/icon/workbench_Shortcut_Addstaff_bg.png); }
  &:nth-of-type(7){ background-image: url(../assets/icon/workbench_Shortcut_Addpersonnel_bg.png); }
  &:nth-of-type(8){ background-image: url(../assets/icon/workbench_Shortcut_Addcontract_bg.png); }
}
.aaa {
  flex: 1;
  height: 315px;
  margin-right: 24px;
}
.bbb {
  width: 228px;
  height: 315px;
}
.calendar {
  height: 795px;
}
</style>
