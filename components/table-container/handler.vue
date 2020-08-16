<template>
  <span class="item">
    <el-button
      v-if="!item.options"
      @click="onHandler(item)"
      :type="item.color || 'primary'"
      class="is-shadow"
      size="small"
    >
      <i :class="item.icon" /> {{ item.label }}
    </el-button>
    <el-dropdown v-else @command="onDorpdownHandler(item, $event)">
      <el-button :type="item.color || 'primary'" :icon="item.icon" size="small" class="is-shadow">
        <i v-if="!item.icon" class="icon-ico_drop-down el-icon--left" /> {{ item.label }}</el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(option, i) in item.options" :key="i" :command="option">
          <i :class="option.icon" class="dropdown-item-icon" />
          {{ option.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </span>
</template>
<script>
import { isFunction } from '~/utils'
export default {
  inject: ['parent'],
  props: {
    item: { type: Object, default: () => {} }
  },
  data () {
    return {
    }
  },
  methods: {
    getContext () {
      const matched = this.$route.matched
      if (!matched.length) { return null }
      return matched[matched.length - 1].instances.default
    },
    async onHandler ({ action = null }) {
      const context = this.getContext()
      if (!action) { return }
      if (isFunction(action)) {
        return action.call(this.parent)
      }
      const [ type, prop, key ] = action.split(':')
      if (type === 'dialog') {
        const dialog = this.parent.dialog
        if (!dialog) { return }
        const config = dialog[prop]
        if (!config) { return }
        if (config.refresh) {
          config.callback = (e) => {
            if (e === 'confirm' || e === 'next') {
              this.parent.fetch()
            }
          }
        }
        this.$bus.$emit('dialog:form', config)
      } else if (type === 'table') {
        if (prop === 'selected') {
          const rows = await this.parent.openSelectRows()
          await this.parent.deleteRows(rows)
          this.parent.cancelSelectRows()
        } else {
          this.parent[prop] = !this.parent[prop]
        }
      } else if (type === 'select') {
        const rows = await this.parent.openSelectRows()
        if (prop === 'delete') {
          await this.parent.deleteRows(rows)
        } else if (prop === 'export') {
          await this.parent.exportRows(rows)
        }
      } else if (type === 'detail') {
        this.parent[prop] = !this.parent[prop]
        this.$parent.editedKey = key
      } else if (context[type] && isFunction(context[type])) {
        context[type](this.parent)
      }
    },
    onDorpdownHandler (type, e) {
      this.onHandler(e)
    }
  }
}
</script>
<style scoped lang="scss">
@import '~/assets/var.scss';
.item {
  margin-left: 8px;
  display: inline-block
}
.dropdown-item-icon{
  color: $color-primary
}
</style>
