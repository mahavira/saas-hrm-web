<template lang="pug">
section.el-container(style="height:0")
  h2.title 工作台
  el-scrollbar.container.is-vertical
    .mod-left
      .mod-group
        .mod.card
      .mod-group
        .mod.quick
        .mod.quick
        .mod.quick
        .mod.quick
        .mod.quick
        .mod.quick
        .mod.quick
      .mod-group
        .mod.aaa
        .mod.bbb
    .mod-right
      .mod.calendar
</template>

<style lang="sass" scoped>
@import '~/assets/variable.scss'

.el-scrollbar.container
  flex: 1
  /deep/
    >.el-scrollbar__wrap
      >.el-scrollbar__view
        display: flex
        padding: 32px 24px 0

.title
  position: absolute
  top: 0
  font-size: 20px
  font-weight: 500
  color: rgba(255,255,255,1)
  padding: 5px 0 0 44px
.mod-left
  flex: 0 0 861px
  margin-right: 24px
.mod-right
  flex: 1
.mod-group
  flex: 1
  display: flex
  justify-content: space-between
  padding-bottom: 24px
.mod
  background: #FFF
  box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.05)
  border-radius: 10px
  transition: box-shadow 0.3s
  &:hover
    box-shadow: 0px 4px 15px 0px rgba(0,0,0,0.2)
.card
  width: 100%
  height: 330px
  background: $color-yellow
.quick
  width: 102px
  height: 102px
.aaa
  flex: 1
  height: 315px
  margin-right: 24px
.bbb
  width: 228px
  height: 315px
.calendar
  height: 795px
</style>
