<template>
  <span>
    <el-button
      v-if="item.type==='button'"
      @click="onHandler(item.handler)"
      :type="item.color || 'primary'"
      class="is-shadow"
      size="small"
    >
      <i :class="item.icon" /> {{ item.label }}
    </el-button>
    <el-dropdown v-if="item.type==='dropdown'" @command="onDorpdownHandler(item.handler, $event)">
      <el-button :type="item.color || 'primary'" :icon="item.icon" size="small" class="is-shadow">{{ item.label }}
        <i class="el-icon-arrow-down el-icon--right" /></el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(option, i) in item.options" :key="i" :command="option.value">{{ option.label }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </span>
</template>
<script>
export default {
  props: {
    item: { type: Object, default: () => {} }
  },
  data () {
    return {
    }
  },
  methods: {
    onHandler (e) {
      if (e === 'ADD') {
        this.$parent.openAddDialog()
      } else if (e === 'DELETE') {
        this.$parent.selected = true
      } else if (e === 'EDIT') {
        this.$parent.editing = true
      } else
      // if (this.$parent[e]) {
      //   this.$parent[e]()
      // } else
      if (this.$parent.$parent[e]) {
        this.$parent.$parent[e](this.$parent)
      }
    },
    onDorpdownHandler (type, e) {
      this.onHandler(e)
    }
  }
}
</script>
