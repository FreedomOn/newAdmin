<!--
 * @Date: 2019-05-17 16:08:38
 -->
<template>
  <div class="login-container">
    <div class="login-logo">
      <!-- <img src="/static/images/uplogo.png" alt /> -->
    </div>
    <el-form
      class="login-form"
      autocomplete="on"
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left"
     >
      <p>用户名</p>
      <el-form-item prop="username">
        <el-input
          name="username"
          type="text"
          v-model="loginForm.username"
          autocomplete="off"
          placeholder="用户名"
        />
      </el-form-item>
      <p>密码</p>
      <el-form-item prop="password">
        <el-input
          name="password"
          :type="pwdType"
          @keyup.enter.native="handleLogin"
          v-model="loginForm.password"
          autocomplete="off"
          placeholder="密码"
        ></el-input>
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="eye" />
        </span>
      </el-form-item>
      <div class="forregt-password" @click="forgetpsd()">
        <span>忘记密码</span>
      </div>
      <div class="button">
        <el-button
          type="primary"
          style="width:48%;"
          :loading="loading"
          @click.native.prevent="handleLogin"
        >登录</el-button>
        <el-button type="primary" style="width:48%;"  @click="onRegit()">注册</el-button>
      </div>
    </el-form>
  
  </div>
</template>

<script>
import { login } from "@/api/login";
// import crypto from "@utils/crypto.js"

export default {
  name: "login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("不能为空哦"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    };
    return {
      eye: "eye",
      checked: true,
      loginForm: {
        username: "",
        password: "",
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePass },
        ],
      },
      loading: false,
      pwdType: "password",
    };
  },
  mounted() {},
  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
        this.eye = "eyeopen";
      } else {
        this.pwdType = "password";
        this.eye = "eye";
      }
    },
    async loadlogin() {
      let that = this;
      let postdata = {
        "userAccount":this.loginForm.username,
        "passWord":this.loginForm.password
      }
      let userdata = await login(postdata);
      console.log(userdata)
      if(userdata.data.resultStatus !== '000000'){
          that.$message.error(userdata.data.message);
          that.loading = false;
          return false;
      }else{
        console.log('333成功')
        // token
        // sessionStorage.setItem("token",token)
        sessionStorage.setItem("role", "ok");
        localStorage.setItem("role", userdata.data.type);
        localStorage.setItem("user", JSON.stringify(userdata.data.data));
        that.$router.push({ path: "/" });
      }
    },
    handleLogin() {
      const that = this;
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          try {
            that.loadlogin();
          } catch (err) {
            console.log(err);
            this.loading = false;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onRegit: function() {
      console.log("注册");
      this.$router.push('/register') 
    },
    reserLogin() {

    },
    // 忘记密码
    forgetpsd(){
       this.$router.push('/forgetpsd') 
    }
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #555;

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
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 2555, 255, 1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$img: 100%;
.forregt-password {
  margin-bottom: 10px;
  color: #1996db;
  cursor: pointer;
}
.login-logo {
  position: absolute;
  left: 0;
  right: 0;
  width: 600px;
  padding: 35px 35px 15px 35px;
  margin: 100px auto;
  img {
    width: 100%;
  }
}
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background: url(/static/images/login_bg.png) no-repeat center center fixed;
  background-size: cover;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 280px auto;
    background-color: rgba(255, 2555, 255, 0.9);
    box-shadow: -7px 4px 20px 0px rgba(0, 1, 1, 0.26);
    opacity: 0.9;
    border-radius: 6px;
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
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
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
.btn {
  display: flex;
  justify-content: space-between;
}
</style>
