<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">足坛社交网站</h3>
      </div>

      <el-form-item prop="num">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="num"
          v-model="loginForm.num"
          placeholder="num"
          name="num"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-row>
        <el-col :span="20">
          <el-form-item prop="verify">
            <span class="svg-container">
              <i class="el-icon-circle-check" />
            </span>
            <el-input
              ref="verify"
              v-model="loginForm.verify"
              placeholder="验证码"
              name="verify"
              type="text"
              tabindex="3"
              auto-complete="on"
            />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <span class="svg-container">
            <img
              ref="verifyimg"
              style="height:30px;width:50px;margin-top:5px"
              @click="getvCode()"
            >
          </span>
        </el-col>
      </el-row>

      <el-row>
        <!-- 注册 -->
        <el-col :span="10">
          <el-button
          style="width:100%;margin-bottom:30px;"
          @click="gotoRegister"
          >注册</el-button>
        </el-col>

        <!-- 登录 -->
        <el-col :span="10" :offset="4">
        <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登录</el-button>
        </el-col>
      </el-row>

      <el-button @click="test">test</el-button>
    </el-form>
  </div>
</template>

<script>
import { validnum } from '@/utils/validate';
import {login} from "@/api/user.js";

export default {
  name: 'Login',
  created(){
    console.log("页面初始化");
    this.$nextTick(function() {
      this.getvCode()
    })
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度不小于6位'))
      } else {
        callback()
      }
    }
    const validateNum = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        num: '001',
        password: '123456',
        verify:null
      },
      loginRules: {
         num: [{ required: true, trigger: 'blur', validator: validateNum }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      /*handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },*/
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      console.log('num:'+this.loginForm.num + 'pwd:'+this.loginForm.password + 'verify:'+this.loginForm.verify)
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', {
            num:this.loginForm.num,
            password:"123456",
            verify:this.loginForm.verify
          }).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getvCode() {
      // 给图片请求地址url加上时间戳属性，保证每次刷新的验证码都不一样
      this.$refs.verifyimg.src = this.timestamp(
        'http://127.0.0.1:8002/api/verifyCode'
      )
    },
    timestamp(url) {
      var getTimestamp = new Date().getTime()
      if (url.indexOf('?') > -1) {
        url = url + '&timestamp=' + getTimestamp
      } else {
        url = url + '?timestamp=' + getTimestamp
      }
      return url
    },
    //跳转注册页面
    gotoRegister(){
      this.$router.replace('/register')
    },
    test(){
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
