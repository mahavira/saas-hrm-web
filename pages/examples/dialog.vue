<template>
  <section>
    <el-button @click="dialogVisible = true" type="primary">打开对话框</el-button>
    <el-dialog
      :visible.sync="dialogVisible"
      title="对话框"
      width="30%"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="dialogVisible = false" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <br><br>

    <!-- Table -->
    <el-button @click="dialogTableVisible = true" type="primary">打开嵌套表格的 Dialog</el-button>

    <el-dialog :visible.sync="dialogTableVisible" title="收货地址">
      <el-table :data="gridData">
        <el-table-column property="date" label="日期" width="150" />
        <el-table-column property="name" label="姓名" width="200" />
        <el-table-column property="address" label="地址" />
      </el-table>
    </el-dialog>
    <br><br>
    <!-- Form -->
    <el-button @click="dialogFormVisible = true" type="primary">打开嵌套表单的 Dialog</el-button>

    <el-dialog :visible.sync="dialogFormVisible" title="收货地址">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="活动名称">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button @click="dialogFormVisible = false" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  name: 'ExampleDragDialog',
  data () {
    return {
      dialogVisible: false,
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
