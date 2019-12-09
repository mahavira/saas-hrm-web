<template>
  <el-table :data="tableData" :highlightCurrentRow="true" class="blue">
    <el-table-column :show-overflow-tooltip="true" property="date" label="岗位名称" />
    <el-table-column :show-overflow-tooltip="true" property="name" label="在职人数" />
    <el-table-column :show-overflow-tooltip="true" property="name" label="全职人数" />
    <el-table-column :show-overflow-tooltip="true" property="name" label="人员编制" />
    <el-table-column :show-overflow-tooltip="true" property="name" label="岗位编码" />
    <el-table-column :show-overflow-tooltip="true" property="name" label="所属组织" />
    <el-table-column :show-overflow-tooltip="true" property="name" label="岗位类别" />
    <el-table-column :show-overflow-tooltip="true" property="name" label="默认职级" />
    <el-table-column :show-overflow-tooltip="true" property="address" label="默认职等" />
  </el-table>
</template>
<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海'
      }]
    }
  }
}
</script>
