<template>
  <div class="el-container">
    <div class="banner" />
    <div class="container-wrp">
      <div class="container">
        <div class="title">
          欢迎登录<br>{{ documentTitle }}
        </div>
        <el-form
          ref="form"
          :model="formData"
          :rules="formRule"
          class="form"
        >
          <el-form-item label="" prop="username">
            <el-input v-model="formData.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input v-model="formData.password" type="password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" @click="submit('form')" style="width:100%;margin-top: 32px" type="primary">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import conf from '~/config'
export default {
  layout: 'null',
  data () {
    return {
      loading: false,
      formData: {
        username: 'lantuyun',
        password: 'lantuyun123'
      },
      documentTitle: document.title,
      formRule: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit (e) {
      this.$refs[e].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async login () {
      this.loading = true
      try {
        const formData = Object.assign({
          applicationKey: conf.applicationKey,
          userFrom: '5'
        }, this.formData)
        const { data } = await this.$axios.post('/ltLogin/login', formData)
        if (data && data.status === 0) {
          this.$store.commit('set', {
            userinfo: data.data.permission.ltStaffDto,
            orgs: data.data.permission.ltOrganStaffDtos,
            authorization: data.data.loginDto.token,
            apps: data.data.permission.ltApplicationPermissionDtos,
            rolePermissionDtos: data.data.currentPermission.rolePermissionDtos
          })
          this.openApp(data.data.permission.ltApplicationPermissionDtos[0])
        } else {
          throw new Error(data.message)
        }
      } catch (e) {
        console.error(e)
        this.$message.error(e.message || e || '登录失败')
      } finally {
        this.loading = false
      }
    },
    async openApp (e) {
      const done = await this.$store.dispatch('switchApp', e)
      if (done) { this.$router.push('/') }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/var.scss';
.banner{
  height: 100vh;
  flex:  1;
  background: #FFF url(~assets/imgs/login-bg.png) center center no-repeat;
  background-size: cover;
  &.login {
    background-image: url(~assets/imgs/login-list.png);
    background-position: center;
  }
}
.container-wrp{
  flex:  1;
  display: flex;
  justify-content: center;
  position: relative;
}
.container{
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 32px;
  min-width: 400px;
}
.title{
  font-size:28px;
  font-weight:500;
  color:rgba(74,74,74,1);
  line-height:50px;
  margin-bottom: 50px;
}
.form{
  min-width: 346px;
}
</style>
