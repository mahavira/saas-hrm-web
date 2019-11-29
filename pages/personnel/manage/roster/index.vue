<template>
  <div class="el-container is-vertical">
    <div class="header">
      <div class="item is-primary">
        在职 <span class="num is-primary">9 人</span>
      </div>
      <div class="item">
        全职 <span class="num">9</span> 人
        <el-popover
          placement="bottom"
          trigger="hover"
          width="432"
        >
          <div class="popover">
            <div class="item">
              <div>全职</div>
              <div><span>103</span> 人</div>
            </div>
            <div class="item">
              <div>实习生</div>
              <div><span>34</span> 人</div>
            </div>
            <div class="item">
              <div>劳务派遣</div>
              <div><span>3</span> 人</div>
            </div>
            <div class="item">
              <div>退休返聘</div>
              <div><span>11</span> 人</div>
            </div>
          </div>
          <i slot="reference" class="el-icon-caret-bottom" />
        </el-popover>
      </div>
      <div class="item">
        试用期 <span class="num">9</span> 人
      </div>
      <div class="item">
        待入职 <span class="num">9</span> 人
      </div>
      <div class="item">
        待离职 <span class="num">9</span> 人
      </div>
    </div>
    <div class="sp-container">
      <div class="sp-container__filter">
        <div class="search">
          <el-input
            v-model="keyword"
            @keyup.enter.native="onSearch"
            size="small"
            placeholder="请输入搜索关键词"
            suffix-icon="el-icon-search"
          />
        </div>
        <div class="handler">
          <el-button @click="onAdd" type="primary" class="is-shadow" size="small"><i class="el-icon-plus" /> 添加员工</el-button>
          <el-button @click="onAdd" type="default" class="is-shadow" size="small"><i class="el-icon-upload2 is-primary" /> 导入名册</el-button>
          <el-button @click="onDelete" type="default" class="is-shadow" size="small"><i class="el-icon-delete-solid is-primary" /> 批量删除</el-button>
        </div>
      </div>
      <div class="sp-container__table">
        <el-table
          ref="table"
          :data="tableData"
          :highlightCurrentRow="highlightCurrentRow"
          @row-click="onRowClick"
          @selection-change="onSelectionChange"
          v-if="tableFields"
        >
          <el-table-column
            v-if="currentStatus===status.DELETE"
            type="selection"
            width="60"
          />
          <el-table-column
            v-for="(item, name) in tableFields"
            :key="name"
            :prop="name"
            :show-overflow-tooltip="true"
            v-bind="item"
          />
          <el-table-column
            :width="60"
            label="操作"
          >
            <template slot-scope="scope">
              <el-button
                @click="openDetail(scope.row)"
                size="mini"
                type="primary"
                class="detail-btn"
                icon="el-icon-arrow-right"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="sp-container__footer">
        <el-pagination
          :total="1000"
          background
          layout="prev, pager, next, sizes, total"
        />
        <div v-if="currentStatus===status.DELETE" class="handler">
          <span>已选择 <span class="is-primary">{{ selecteds.length }}</span> 条</span>
          <el-button @click="onCancelDelete" type="default" size="small" class="is-shadow">取消</el-button>
          <el-button @click="onConfirmDelete" :disabled="!selecteds.length" type="primary" size="small" class="is-shadow"><i class="el-icon-delete" /> 确认删除</el-button>
        </div>
      </div>
      <transition name="slide-left">
        <comp-detail v-if="visibleDetail" :visible.sync="visibleDetail" :data="currentData" />
      </transition>
      <comp-add :visible.sync="visibleAddDialog" />
    </div>
  </div>
  </div>
</template>
<script>
import compDetail from './detail'
import compAdd from './add'
import { tableFields } from './conf'

const data = {
  xingming: '王小虎',
  gonghao: '0001',
  bumen: '研发部',
  gangwei: '安卓工程师',
  gongzuoxingzhi: '全职',
  phone: '18611852267',
  credential_type: '身份证',
  credential_number: '2400192838273827'
}
const tableData = []
for (let i = 0; i < 10; i += 1) {
  tableData.push(Object.assign({}, data, {
    id: i,
    gonghao: `000${i}`
  }))
}
const status = {
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
  ADD: 'ADD'
}
export default {
  components: { compDetail, compAdd },
  data () {
    return {
      keyword: '',
      tableData,
      visibleDetail: false,
      visibleAddDialog: false,
      highlightCurrentRow: false,
      currentData: {},
      status,
      currentStatus: '',
      selecteds: [],
      tableFields
    }
  },
  watch: {
    visibleDetail (val) {
      this.highlightCurrentRow = val
    }
  },
  methods: {
    openDetail (row) {
      this.visibleDetail = true
      this.highlightCurrentRow = true
      this.currentData = row
    },
    onRowClick (row) {
      if (this.visibleDetail) {
        this.openDetail(row)
      }
    },
    onAdd () {
      this.visibleAddDialog = true
    },
    onDelete () {
      this.currentStatus = status.DELETE
    },
    onCancelDelete () {
      this.currentStatus = ''
      this.selecteds = []
      this.$refs.table.clearSelection()
    },
    onSearch (e) {
      console.log(e)
    },
    onSelectionChange (e) {
      this.selecteds = e
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/variable.scss';
.header{
  padding: 28px 24px 20px;
  .item{
    display: inline-block;
    font-size: 14px;
    font-weight:400;
    color:rgba(0,0,0,0.45);
    line-height: 28px;
    padding: 0 32px;
    margin: 5px 0;
    position: relative;
    .num{
      font-size: 16px;
      color: #0BAFB7;
      display: inline-block;
      text-align: right;
      min-width: 38px;
    }
    &.is-primary{
      .num{
        font-size: 32px;
        min-width: 80px;
      }
    }
    &:before{
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      height: 28px;
      width: 1px;
      background: #CCCCCD;
    }
    &:last-of-type:before{
      content: none;
    }
    &.active{
      color: $--color-primary;
    }
  }
}
.popover{
  display: flex;
  justify-content: space-between;
  .item{
    padding: 10px 22px;
    color: rgba(0,0,0,0.45);
    text-align: center;
    cursor: pointer;
    div:first-of-type{
      margin-bottom: 10px;
    }
    span{
      color: $--color-primary;
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>
