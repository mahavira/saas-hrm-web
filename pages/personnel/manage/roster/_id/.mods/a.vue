<template>
  <div class="wrp">
    <div v-for="(item,key) in conf" :key="key" class="block">
      <div class="title">
        <div>{{ item.label }}</div>
        <div>
          <i v-if="item.multiple" @click="onAdd(item, key)" class="icon-ico_new-additions is-primary" />
          <i v-else-if="!item.edited" @click="onEdit(item, key)" class="icon-ico_edit is-primary" />
        </div>
      </div>
      <ul v-if="item.multiple" class="form">
        <li v-for="(subitem,index) in data[key]" :key="index">
          <div class="title sub">
            <div>{{ item.subtitle + (chnNumChar[index] ? chnNumChar[index]: index + 1) }}</div>
            <div>
              <!-- <i v-if="item.edited.indexOf(index) < 0" @click="onDelete(item, index)" class="icon-ico_delete is-primary" /> -->
              <i v-if="item.edited.indexOf(index) < 0" @click="onEdit(item, index)" class="icon-ico_edit is-primary" />
            </div>
          </div>
          <sp-form :fields="item.fields" :edited="item.edited.indexOf(index) >= 0" :rules="{}" :value="subitem" mode="double" />
          <transition name="slide-left-fade">
            <div v-if="item.edited.indexOf(index) >= 0" class="footer">
              <el-button @click="cancelEdit(item, index)" type="default" size="small">取消</el-button>
              <el-button type="primary" size="small">保存</el-button>
            </div>
          </transition>
        </li>
      </ul>
      <div v-else class="form">
        <sp-form :fields="item.fields" :edited="item.edited" :rules="{}" :value="data[key]" mode="double" />
        <transition name="slide-left-fade">
          <div v-if="item.edited" class="footer">
            <el-button @click="item.edited=false" type="default" size="small">取消</el-button>
            <el-button type="primary" size="small">保存</el-button>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import conf from './a'
import SpForm from '~/components/sp-form'
export default {
  components: { SpForm },
  data () {
    const data = {}
    Object.keys(conf).forEach((k) => {
      data[k] = conf[k].multiple ? [] : {}
    })
    return {
      chnNumChar: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
      conf,
      data
    }
  },
  created () {
  },
  methods: {
    onEdit (item, index) {
      if (item.multiple) {
        item.edited.push(index)
      } else {
        item.edited = true
      }
    },
    cancelEdit (e, index) {
      const i = e.edited.indexOf(index)
      if (i < 0) { return }
      e.edited.splice(i, 1)
    },
    onAdd (item, key) {
      if (item.max && this.data[key].length >= item.max) {
        return this.$message.info(`最多可以加${item.max}个`)
      }
      this.data[key].push({})
      item.edited.push(this.data[key].length - 1)
    }
  }
}
</script>
