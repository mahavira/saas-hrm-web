<script>
const cn = ['一', '二']
export default {
  props: {
    icon: { type: String, default: '' },
    label: { type: [String, Array], default: '' },
    desc: { type: String, default: '' },
    guide: { type: String, default: '' },
    uploadUrl: { type: String, default: 'hrEducationInfo/export' }
  },
  methods: {
    async onUploadSuccess (response, file, fileList) {
      if (response.data && response.data.status === 0 && response.data.status === 200) {
        return this.$message.success('导入成功')
      }
      try {
        this.importing = true
        const res = await this.$axios.post(this.uploadUrl, response.data, {
          responseType: 'blob'
        })
        const fileName = '导入错误说明.xls'
        const blob = new Blob([res.data], { type: 'application/x-xls' })
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, fileName)
        } else {
          const link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = fileName
          link.click()
          window.URL.revokeObjectURL(link.href)
        }
      } catch (e) {
        console.error(e)
        this.$message.error(e.message || e)
      } finally {
        this.importing = false
      }
    },
    getSlots (h) {
      let slots = []
      if (typeof this.label === 'string') {
        slots = [
          h('div', { 'class': `icon-png ${this.icon}` }),
          h('div', { class: 'label' }, this.label)
        ]
      } else {
        slots = [
          h('div', { class: 'inner' }, this.label.map(label => h('div', { class: 'inner-item' }, [
            h('div', { 'class': `icon-png ${this.icon}` }),
            h('div', { class: 'label' }, label)
          ])))
        ]
      }
      slots = [...slots,
        h('div', { class: 'desc' }, this.desc),
        h('div', { class: 'guide' }, [
          h('span', this.guide),
          h('span', `第${cn[this.guide - 1]}步`)
        ])
      ]
      return slots
    }
  },
  render (h) {
    const slots = this.getSlots(h)

    if (this.$attrs.href) {
      return h('a', {
        attrs: {
          class: 'sp-upload-card__file',
          ...this.$attrs
        }
      }, slots)
    }
    return h('el-upload', {
      on: this.$listeners,
      attrs: {
        class: 'sp-upload-card__file',
        ...this.$attrs
      },
      props: {
        showFileList: false,
        headers: {
          token: this.$store.state.authorization
        },
        action: `${this.$axios.defaults.baseURL}${this.uploadUrl}`,
        onSuccess: this.onUploadSuccess,
        name: 'uploadFile',
        drag: true
      }
    }, slots)
  }
}
</script>
<style lang="scss" scoped>
@import '~/assets/var.scss';
.sp-upload-card{
  &__file{
    background:rgba(255,255,255,0.31);
    border:2px dashed rgba(189, 184, 222, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 322px;
    height: 221px;
    position: relative;
    box-sizing: border-box;
    text-decoration: none;
    padding-top: 32px;
    /deep/{
      .el-upload{
        position: absolute;
        left: 0;
        top: 0;
        width:100%;
        height:100%;
      }
      .el-upload-dragger{
        background-color: transparent;
        border: none;
        border-radius: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding-top: 32px;
      }
    }
    .inner{
      display: flex;
      position: relative;
      width: 100%;
      &::before{
        content: '';
        position: absolute;
        right: 50%;
        top: 15%;
        height: 50%;
        width: 1px;
        background: rgba(189,184,222,1);
      }
    }
    .inner-item{
      text-align: center;
      flex: 1;
    }
    .label{
      font-size:16px;
      font-weight:500;
      color:rgba(0,0,0,0.85);
      line-height:24px;
      margin: 12px 0 10px;
    }
    .desc{
      font-size: 12px;
      color:rgba(0,0,0,0.85 * 0.5);
      padding: 0 16px;
      line-height: 18px;
    }
    .guide{
      position: absolute;
      left: 21px;
      top: 16px;
      display: flex;
      line-height: 24px;
      span:nth-of-type(1) {
        width:24px;
        height:24px;
        background:$color-primary;
        border-radius: 50%;
        text-align: center;
        color: #FFF;
      }
      span:nth-of-type(2) {
        margin-left: 8px;
        color:rgba(0,0,0,0.85);
      }
    }
  }
}
</style>
