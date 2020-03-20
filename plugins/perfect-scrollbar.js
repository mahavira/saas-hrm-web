import Vue from 'vue'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import debounce from 'lodash/debounce'

const setTableHeight = (el, value) => {
  el.style.height = `${window.innerHeight - value}px`
}
let debounceFunc = null
const initScrollBar = (el, value) => {
  if (el._ps_ instanceof PerfectScrollbar) {
    debounceFunc = debounce(() => setTableHeight(el, value), 600)
    setTableHeight(el, value)
    window.addEventListener('resize', debounceFunc)
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
  inserted (el, binding, vnode) {
    const rules = ['fixed', 'absolute', 'relative']
    if (!rules.includes(window.getComputedStyle(el, null).position)) {
      console.error(`perfect-scrollbar所在的容器的position属性必须是以下之一：${rules.join('、')}`)
    }
    el = getEl(el, binding.arg)
    initScrollBar(el, binding.value)
  },
  componentUpdated (el, binding, vnode, oldVnode) {
    el = getEl(el, binding.arg)
    try {
      vnode.context.$nextTick(
        () => {
          initScrollBar(el, binding.value)
        }
      )
    } catch (error) {
      console.error(error)
      initScrollBar(el, binding.value)
    }
  },
  unbind (el, { arg }, vnode) {
    el = getEl(el, arg)
    if (el && el._ps_) {
      el._ps_.destroy()
      el._ps_ = null
      if (debounceFunc) { window.removeEventListener('resize', debounceFunc) }
    }
  }
})
