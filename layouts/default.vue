<template lang="pug">
.el-container
  el-scrollbar.lay-sidebar.is-vertical
    .logo
    nuxt-link.item(v-for="(item, key) in menus" :key="key" :to="item.redirect || item.path" :class="[item.name, item.name === currentPath ? 'active' : '']")
      span {{item.label}}
  .el-container.is-vertical
    .lay-header
      a.item.search
      a.item.bell
      a.item.user
        img(src="~/assets/images/logo.png")
    nuxt.lay-main
</template>
<script>
const level = 0
export default {
  data () {
    return {
    }
  },
  computed: {
    menus () {
      return this.$store.getters['route/currentMenu'](level)
    },
    currentPath () {
      return this.$store.getters['route/currentPath'](level)
    }
  }
}
</script>
<style lang="sass" scoped>
@import '~/assets/variable.scss'
.lay-main
  background: $bgcolor-primary
  flex-grow: 1
.lay-header
  height: 64px
  background-color: $--color-primary
  display: flex
  justify-content: flex-end
  .item
    display: block
    padding: 20px 16px
    height: 24px
    width: 24px
    cursor: pointer
    img
      width: 24px
      height: 24px
      background: #888
      border-radius: 50%
    &.search
      background: url(~assets/images/search.png) center no-repeat / 24px;
    &.bell
      background: url(~assets/images/bell.png) center no-repeat / 24px;
    &.user
      margin-left: 32px
.lay-sidebar
  height: 100vh
  width: 80px
  box-sizing: border-box
  padding-top: 10px
  background-color: $--color-primary
.logo
  background: url(~assets/images/logo.png) center top no-repeat / 100%;
  height: 88px
  width: 50px
  margin: 10px 15px
  position: relative
  &:before
    content: ''
    position: absolute
    left: 0
    bottom: 0
    width: 100%
    height: 38px
    background: url(~assets/images/logo-t.png) center top no-repeat / 100%;
.lay-sidebar .item
  display: block
  position: relative
  padding: 62px 0 22px
  color: #FFF
  font-size: 12px
  line-height: 1
  text-align: center
  text-decoration: none
  margin-left: 8px
  transition: all 0.2s
  &:before
    content: ''
    position: absolute
    left: -4px
    top: 18px
    width: 100%
    height: 32px
    background: url(~assets/images/workbench.png) center top no-repeat / 32px 32px;
  span
    position: relative
    left: -4px
  &.active
    background: $bgcolor-primary
    color: $--color-primary
    border-top-left-radius: 10px
    border-bottom-left-radius: 10px
  &.active:before
    background-image: url(~assets/images/workbench-active.png);
  &.personnel
    &:before
      background-image: url(~assets/images/personnel.png);
    &.active:before
      background-image: url(~assets/images/personnel-active.png);
  &.recruit:before
    background-image: url(~assets/images/recruit.png);
  &.organization:before
    background-image: url(~assets/images/organization.png);
  &.attendance:before
    background-image: url(~assets/images/attendance.png);
  &.salary:before
    background-image: url(~assets/images/salary.png);
</style>
