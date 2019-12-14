<template lang="pug">
.el-container
  el-scrollbar.lay-sidebar.is-vertical
    .logo
    nuxt-link.item(v-for="(item, key) in menus[0]" :key="key" :to="item.redirect || item.path"
      :class="[item.name, (item.name === currentPaths[0] || (!item.name && !currentPaths.length)) ? 'active' : '']")
      div.anibg
      span {{item.label}}
  .el-container.is-vertical
    .lay-header
      a.item.search
      a.item.bell
      el-dropdown
        a.item.user
          img(src="~/assets/icon/logo.png")
        el-dropdown-menu(slot="dropdown",class='dropdown')
          el-dropdown-item.dropdown-item.avater
            img(src="~/assets/icon/logo.png")
            span 欧阳飞雪
          el-dropdown-item.dropdown-item.line
            i.icon-ico_personal-information
            span 个人信息
          el-dropdown-item.dropdown-item
            i.icon-ico_password
            span 修改密码
          el-dropdown-item.dropdown-item.line
            i.icon-ico_quit
            span 进入官网
          el-dropdown-item.dropdown-item
            i.el-icon-switch-button
            span 退出登录
    nuxt.lay-main(v-if="!menus[1]||!menus[1].length")
    tab-level-one.lay-main(v-else :tabs="menus[1]" :active="currentPaths[1]" :prefix="[...currentPaths].splice(0,1).join('/')")
      nuxt.el-container.is-vertical(v-if="!menus[2]||!menus[2].length")
      tab-level-two(v-else :tabs="menus[2]" :active="currentPaths[2]" :prefix="[...currentPaths].splice(0,2).join('/')")
        nuxt(v-if="!menus[3]||!menus[3].length")
        tab-level-three(v-else :tabs="menus[3]" :active="currentPaths[3]" :prefix="[...currentPaths].splice(0,3).join('/')")
          nuxt
  dialog-form
</template>
<script>
import TabLevelOne from '~/components/level-tab/one'
import TabLevelTwo from '~/components/level-tab/two'
import TabLevelThree from '~/components/level-tab/three'
import DialogForm from '~/components/dialog/form.vue'
export default {
  provide () {
    return {
      $app: this
    }
  },
  components: { TabLevelOne, TabLevelTwo, TabLevelThree, DialogForm },
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
      background: url(~assets/icon/search.png) center no-repeat / 24px;
    }
    &.bell {
      background: url(~assets/icon/notice_bell_icon_white.png) center no-repeat / 24px;
    }
    &.user {
      margin-left: 32px;
    }
  }
}
  .dropdown{
    padding: 0;
    min-width: 190px;
    box-shadow:0px 2px 20px 0px rgba(0,0,0,0.2);
    /deep/{
      .el-dropdown-menu__item{
        padding: 16px 0 16px 24px;
        color:rgba(0,0,0,0.5);
        line-height: 20px;
        &.avater{
          display: flex;
          align-items: center;
          padding: 30px 10px 30px 20px;
          font-size:18px;
          color:rgba(0,0,0,0.85);
          img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #000000;
            display: block;
            margin-right: 15px;
          }
        }
        i{
          margin-right: 36px;
          color: $color-primary;
        }
        &.line{
          border-top: 1px solid rgba(233,233,233,1);
        }
        &:last-of-type{
          background: rgba(250,250,250,1);
          border-radius: 0 0 10px 10px;
          margin-top: 20px;
        }
      }
    }

  }
.lay-sidebar{
  height: 100vh;
  flex: 0 0 80px;
  box-sizing: border-box;
  padding-top: 10px;
  background-color: $color-primary;
  z-index: 9999;
}
.logo {
  background: url(~assets/icon/logo.png) center top no-repeat;
  background-size: 100%;
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
    background: url(~assets/icon/logo-t.png) center top no-repeat;
    background-size: 100%;
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
  transition: all 0.3s ease-in;
  border-radius: 10px 0 0 10px;
  .anibg{
    background: #F1F2F4;
    border-radius: 10px 0 0 10px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: -10px;
    transform: translateX(100%);
    transition: all 0.4s cubic-bezier(.25,.1,.3,1.5);
  }
  &:after {
    content: '';
    position: absolute;
    left: -4px;
    top: 18px;
    width: 100%;
    height: 32px;
    background: url(~assets/icon/nav_workbench_Default.png);
    background-size: 32px 32px;
    background-repeat: no-repeat;
    background-position: center;
    transition: all 0.3s ease-out;
  }
  span {
    position: relative;
    left: -4px;
  }
  &.active {
    color: $color-primary;
    .anibg{
      transform: translateX(0);
    }
  }
  &:hover{
    background: rgba($color: #000000, $alpha: 0.1);
  }
  &.active:after{
    background-image: url(~assets/icon/nav_workbench_Selected.png);
  }
  &.personnel{
    &:after{
      background-image: url(~assets/icon/nav_staff_Default.png);
    }
    &.active:after{
      background-image: url(~assets/icon/nav_staff_Selected.png);
    }
  }
  &.recruit{
    &:after{
      background-image: url(~assets/icon/nav_recruit_Default.png);
    }
    &.active:after{
      background-image: url(~assets/icon/nav_recruit_Selected.png);
    }
  }
  &.organization{
    &:after{
      background-image: url(~assets/icon/nav_organization_Default.png);
    }
    &.active:after{
      background-image: url(~assets/icon/nav_organization_Selected.png);
    }
  }
  &.attendance{
    &:after{
      background-image: url(~assets/icon/nav_attendance_Default.png);
    }
    &.active:after{
      background-image: url(~assets/icon/nav_attendance_Selected.png);
    }
  }
  &.salary{
    &:after{
      background-image: url(~assets/icon/nav_Pay_Default.png);
    }
    &.active:after{
      background-image: url(~assets/icon/nav_Pay_Selected.png);
    }
  }
}
</style>
