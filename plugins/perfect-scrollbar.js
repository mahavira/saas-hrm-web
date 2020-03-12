import Vue from 'vue'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
const initScrollBar = (el) => {
  if (el._ps_ instanceof PerfectScrollbar) {
    el._ps_.update()
  } else {
    el._ps_ = new PerfectScrollbar(el, { suppressScrollX: true })
  }
}
const getEl = (el, arg) => {
  if (arg === 'el-table') {
    el = el.querySelector('.el-table__body-wrapper')
    !el && console.warn('未发现className为el-table__body-wrapper的dom')
  }
  return el
}
Vue.directive('ScrollBar', {
  inserted (el, { arg }, vnode) {
    const rules = ['fixed', 'absolute', 'relative']
    if (!rules.includes(window.getComputedStyle(el, null).position)) {
      console.error(`perfect-scrollbar所在的容器的position属性必须是以下之一：${rules.join('、')}`)
    }
    el = getEl(el, arg)
    initScrollBar(el)
  },
  componentUpdated (el, { arg }, vnode, oldVnode) {
    el = getEl(el, arg)
    try {
      vnode.context.$nextTick(
        () => {
          initScrollBar(el)
        }
      )
    } catch (error) {
      console.error(error)
      initScrollBar(el)
    }
  },
  unbind (el, { arg }, vnode) {
    el = getEl(el, arg)
    if (el) {
      el._ps_.destroy()
      el._ps_ = null
    }
  }
})
