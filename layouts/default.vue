<template lang="pug">
.el-container
  el-scrollbar.lay-sidebar.is-vertical
    .logo
    nuxt-link.item(v-for="(item, key) in menus[0]" :key="key" :to="item.redirect || item.path"
      :class="[item.name, (item.name === currentPaths[0] || (!item.name && !currentPaths.length)) ? 'active' : '']")
      span {{item.label}}
  .el-container.is-vertical
    .lay-header
      a.item.search
      a.item.bell
      a.item.user
        img(src="~/assets/images/logo.png")
    nuxt.lay-main(v-if="!menus[1]||!menus[1].length")
    tab-level-one.lay-main(v-else :tabs="menus[1]" :active="currentPaths[1]" :prefix="[...currentPaths].splice(0,1).join('/')")
      nuxt.el-container.is-vertical(v-if="!menus[2]||!menus[2].length")
      tab-level-two(v-else :tabs="menus[2]" :active="currentPaths[2]" :prefix="[...currentPaths].splice(0,2).join('/')")
        nuxt(v-if="!menus[3]||!menus[3].length")
        tab-level-three(v-else :tabs="menus[3]" :active="currentPaths[3]" :prefix="[...currentPaths].splice(0,3).join('/')")
          nuxt
  dialog-insert
</template>
<script>
import TabLevelOne from '~/components/level-tab/one'
import TabLevelTwo from '~/components/level-tab/two'
import TabLevelThree from '~/components/level-tab/three'
import DialogInsert from '~/components/dialog-insert'
export default {
  provide () {
    return {
      $app: this
    }
  },
  components: { TabLevelOne, TabLevelTwo, TabLevelThree, DialogInsert },
  computed: {
    menus () {
      return this.$store.getters['route/currentMenus']
    },
    currentPaths () {
      return this.$store.getters['route/currentPaths']
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/var.scss';
.lay-main {
  background: $bgcolor-primary;
  flex-grow: 1;
}

.lay-header {
  height: 64px;
  background-color: $color-primary;
  display: flex;
  justify-content: flex-end;
  .item {
    display: block;
    padding: 20px 16px;
    height: 24px;
    width: 24px;
    cursor: pointer;
    img {
      width: 24px;
      height: 24px;
      background: #888;
      border-radius: 50%
    }
    &.search {
      background: url(~assets/images/search.png) center no-repeat / 24px;
    }
    &.bell {
      background: url(~assets/images/bell.png) center no-repeat / 24px;
    }
    &.user {
      margin-left: 32px;
    }
  }
}
.lay-sidebar{
  height: 100vh;
  flex: 0 0 80px;
  box-sizing: border-box;
  padding-top: 10px;
  background-color: $color-primary;
}
.logo {
  background: url(~assets/images/logo.png) center top no-repeat / 100%;
  height: 88px;
  width: 50px;
  margin: 10px 15px;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 38px;
    background: url(~assets/images/logo-t.png) center top no-repeat / 100%;
  }
}
.lay-sidebar .item{
  display: block;
  position: relative;
  padding: 62px 0 22px;
  color: #FFF;
  font-size: 12px;
  line-height: 1;
  text-align: center;
  text-decoration: none;
  margin-left: 8px;
  transition: all 0.2s;
  &:before {
    content: '';
    position: absolute;
    left: -4px;
    top: 18px;
    width: 100%;
    height: 32px;
    background: url(~assets/images/workbench.png) center top no-repeat / 32px 32px;
  }
  span {
    position: relative;
    left: -4px;
  }
  &.active {
    background: $bgcolor-primary;
    color: $color-primary;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  &.active:before{
    background-image: url(~assets/images/workbench-active.png);
  }
  &.personnel{
    &:before{
      background-image: url(~assets/images/personnel.png);
    }
    &.active:before{
      background-image: url(~assets/images/personnel-active.png);
    }
  }
  &.recruit:before{
    background-image: url(~assets/images/recruit.png);
  }
  &.organization:before{
    background-image: url(~assets/images/organization.png);
  }
  &.attendance:before{
    background-image: url(~assets/images/attendance.png);
  }
  &.salary:before{
    background-image: url(~assets/images/salary.png);
  }
}
</style>
