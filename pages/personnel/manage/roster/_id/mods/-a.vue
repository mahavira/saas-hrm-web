<template>
  <div class="wrp">
    <div v-for="(item,key) in conf" :key="key" class="block">
      <div class="title">
        <div>{{ item.label }}</div>
        <div>
          <i v-if="item.multiple" @click="onAdd(item, key)" class="el-icon-plus is-primary" />
          <i v-else @click="onEdit(item, key)" class="el-icon-edit is-primary" />
        </div>
      </div>
      <ul v-if="item.multiple" class="form">
        <li v-for="(subitem,index) in data[key]" :key="index">
          <div class="title sub">
            <div>{{ item.subtitle + (chnNumChar[index] ? chnNumChar[index]: index + 1) }}</div>
            <div>
              <i @click="onDelete(item, index)" class="el-icon-delete is-primary" />
              <i @click="onEdit(item, index)" class="el-icon-edit is-primary" />
            </div>
          </div>
          <sp-form :fields="item.fields" :edited="item.edited.indexOf(index) >=0" :rules="{}" :value="subitem" mode="double" />
          <div v-if="item.edited.indexOf(index) >= 0" class="footer">
            <el-button @click="item.edited.splice(index,1)" type="default" size="small">取消</el-button>
            <el-button type="primary" size="small">保存</el-button>
          </div>
        </li>
      </ul>
      <div v-else class="form">
        <sp-form :fields="item.fields" :edited="item.edited" :rules="{}" :value="data[key]" mode="double" />
        <div v-if="item.edited" class="footer">
          <el-button @click="item.edited=false" type="default" size="small">取消</el-button>
          <el-button type="primary" size="small">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import conf from './.a.conf'
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
<style scoped lang="scss">
.title{
  display: flex;
  justify-content: space-between;
  padding: 16px 40px;
  font-size:16px;
  font-weight:500;
  color:rgba(0,0,0,0.85);
  &.sub{
    padding: 16px 0;
    font-size:14px;
    color:rgba(0,0,0,1);
  }
}
.block{
  border-top: 1px solid rgba(233,233,233,1);
  &:first-of-type{
    border-top: none
  }
}

.form{
  padding: 0 40px 0 64px;
  margin: 0;
  .footer{
    padding: 16px 0;
    text-align: right;
  }
}
</style>
