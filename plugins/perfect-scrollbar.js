import Vue from 'vue'
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'
import debounce from 'lodash/debounce'
import { offset } from '~/utils'

function getElementToPageTop (el) {
  if (el.parentElement) {
    return getElementToPageTop(el.parentElement) + el.offsetTop
  }
  return el.offsetTop
}

const setTableHeight = (el, value) => {
  if (!value) {
    const top = getElementToPageTop(el)
    el.style.height = `${window.innerHeight - top - 32 - 64}px`
  } else {
    el.style.height = `${window.innerHeight - value}px`
  }
}
let debounceFunc = null
const initScrollBar = (el, value) => {
  if (el._ps_ instanceof PerfectScrollbar) {
    if (!el.isFixed) {
      debounceFunc = debounce(() => setTableHeight(el, value), 600)
      setTableHeight(el, value)
      window.addEventListener('resize', debounceFunc)
    }
    el._ps_.update()
  } else {
    el._ps_ = new PerfectScrollbar(el, { suppressScrollX: true })
  }
}
const getEl = (el, binding) => {
  if (binding.arg === 'el-table') {
    if (!binding.value) {
      const e = offset(el)
      console.table({
        windowHeight: window.innerHeight,
        top: e.top,
        bottom: 64 + 32,
        content: window.innerHeight - e.top - 64 - 32 - 56
      })
      binding.value = e.top + 64 + 32 + 56
    }
    el = el.querySelector('.el-table__body-wrapper')
    !el && console.warn('未发现className为el-table__body-wrapper的dom')
  } else if (binding.arg === 'fixed') {
    el.isFixed = true
  }

  return el
}
Vue.directive('ScrollBar', {
  inserted (el, binding, vnode) {
    const rules = ['fixed', 'absolute', 'relative']
    if (!rules.includes(window.getComputedStyle(el, null).position)) {
      console.error(
        `perfect-scrollbar所在的容器的position属性必须是以下之一：${rules.join(
          '、'
        )}`
      )
    }
    el = getEl(el, binding)
    initScrollBar(el, binding.value)
  },
  componentUpdated (el, binding, vnode, oldVnode) {
    el = getEl(el, binding)
    try {
      vnode.context.$nextTick(() => {
        initScrollBar(el, binding.value)
      })
    } catch (error) {
      console.error(error)
      initScrollBar(el, binding.value)
    }
  },
  unbind (el, binding, vnode) {
    el = getEl(el, binding)
    if (el && el._ps_) {
      el._ps_.destroy()
      el._ps_ = null
      if (debounceFunc) {
        window.removeEventListener('resize', debounceFunc)
      }
    }
  }
})
