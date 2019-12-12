<template>
  <div class="el-row el-row--flex sp-container">
    <div class="sp-material-sidebar">
      <div class="el-container is-justify-space-between">
        <el-button @click="onBack" type="default" class="is-shadow back" size="small">
          <i class="icon-ico_back is-primary" />
        </el-button>
        <el-button v-if="showDelete" type="default" class="is-shadow" size="small">
          <i class="icon-ico_delete is-primary" />
        </el-button>
      </div>
      <slot class="intro" />
    </div>
    <div class="sp-material">
      <el-tabs v-model="activeTab" @tab-click="onTab" class="sp-material-tabs" type="card">
        <el-tab-pane
          v-for="(item,index) in tabs"
          :key="index"
          :name="item.name"
          :label="item.label"
        />
      </el-tabs>
      <el-scrollbar class="content is-vertical">
        <!-- eslint-disable-next-line vue/require-component-is -->
        <component v-bind:is="comp" class="sp-material-content" />
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tabs: {
      type: Array,
      default: () => []
    },
    showDelete: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      activeTab: ''
    }
  },
  computed: {
    comp () {
      let comp = null
      this.tabs.some((tab) => {
        if (tab.name === this.activeTab) {
          comp = tab.comp
          return true
        }
      })
      return comp
    }
  },
  created () {
    this.activeTab = this.$route.query.tab || 'a'
  },
  methods: {
    onTab (e) {
      this.$router.replace({
        query: {
          tab: e.name
        }
      })
    },
    onBack () {
      this.$router.back()
    }
  }
}
</script>
<style scoped>
.content{
  height: 100%;
}
</style>
