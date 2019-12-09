<template>
  <div class="items el-row--flex">
    <div v-for="(item,index) in items" :key="index" class="item">
      <div class="label">{{ item.label }}</div>
      <div class="count">
        <b>{{ item.value }}</b>
        <span v-if="item.unit">{{ item.unit }}</span>
        <span v-else-if="item.unit!==null">人</span>
      </div>
    </div>
  </div>
</template>
<script>
const items = [{
  label: '在职人数',
  value: 1111
}, {
  label: '全职',
  value: 1111
}, {
  label: '非全职',
  value: 1111
}, {
  label: '人员编制',
  value: 1111
}, {
  label: '缺编/超编',
  value: 45,
  unit: '人/缺'
}, {
  label: '负责人',
  value: '欧阳小小',
  unit: null
}, {
  label: '分管领导',
  value: '欧阳小白',
  unit: null
}]
export default {
  data () {
    return {
      items
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/var.scss';
.items{
  text-align: center;
  .item{
    margin-left: 45px;
    .label{
      color:rgba(0,0,0,0.68);
      margin-bottom: 12px;
    }
    .count{
      color: rgba(0,0,0,0.5);
      font-size: 16px;
      b{
        color: #000;
        font-size: 18px;
      }
    }
  }
}
</style>
