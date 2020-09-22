<template>
  <div class="login-container">
    <div class="login-logo">
      <img src="/static/images/uplogo.png" alt />
    </div>
    <!-- 输入账号form -->
    <el-form
      class="login-form"
      autocomplete="on"
      :model="loginForm"
      ref="loginForm"
      label-position="left"
      v-if="showfirst"
     >
      <p>需要找回的账号</p>
      <el-form-item prop="username">
        <el-input
          name="username"
          type="text"
          v-model="loginForm.username"
          autocomplete="off"
          placeholder="请输入账号"
        />
      </el-form-item>
      <div class="button">
        <el-button
          type="primary"
          style="width:100%;"
          @click="firstnext()"
        >下一步</el-button>
      </div>
    </el-form>
    <!-- 回答问题form -->
    <el-form
      class="login-form"
      autocomplete="on"
      :model="Answerform"
      ref="answerForm"
      label-position="left"
      v-if="showSecond"
     >
      <p>问题1：{{userAnswerOne}}</p>
      <el-form-item prop="AnswerOne">
        <el-input
          name="AnswerOne"
          type="text"
          v-model="Answerform.AnswerOne"
          autocomplete="off"
          placeholder="请输入问题答案"
        />
      </el-form-item>
       <p>问题2：{{userAnswerTwo}}</p> 
      <el-form-item prop="AnswerTwo"> 
        <el-input
          name="AnswerTwo"
          type="text"
          v-model="Answerform.AnswerTwo"
          autocomplete="off"
          placeholder="请输入问题答案"
        />
      </el-form-item>
      <div class="button">
        <el-button
          type="primary"
          style="width:100%;"
          @click="secondnext()"
        >下一步</el-button>
      </div>
    </el-form>
    <!-- 找回密码form -->
    <el-form
      class="login-form"
      autocomplete="on"
      :model="passwordform"
      ref="passwordform"
      label-position="left"
      v-if="showthird"
     >
      <p>请输入新密码</p>
      <el-form-item prop="padone">
        <el-input
          name="padone"
          type="password"
          v-model="passwordform.padone"
          autocomplete="off"
          placeholder="请输入新密码"
        />
      </el-form-item>
       <p>请确认新密码</p> 
      <el-form-item prop="padtwo"> 
        <el-input
          name="padtwo"
          type="password"
          v-model="passwordform.padtwo"
          autocomplete="off"
          placeholder="请确认新密码"
        />
      </el-form-item>
      <div class="button">
        <el-button
          type="primary"
          style="width:100%;"
          @click="backPassword()"
        >找回密码</el-button>
       
      </div>
    </el-form>
  </div>
</template>

<script>
import { queryQuestionData ,checkAnswerData,updatePasswordData} from "@/api/password";

export default {
  data() {
   
    return {
      loginForm: {
        username: "",
      },
      Answerform:{
        AnswerOne:'',
        AnswerTwo:'',
      },
      passwordform:{
          padone:'',
          psdtwo:'',
      },
      userAnswerOne:'',
      userAnswerTwo:'',
      showfirst:true,
      showSecond:false,
      showthird:false,
    };
  },
  mounted() {},
  methods: {
    async firstnext(){
        let that = this;
        let postdata = {
            "userAccount" :that.loginForm.username,
            "passWord":''
        };
        console.log(postdata)
        let result = await queryQuestionData(postdata)
        console.log(result,'问题信息')
        if(result.resultStatus == "000000"){
          that.showfirst=false;
          that.showSecond = true;
          that.userAnswerOne = result.data.userQuestionOne;
          that.userAnswerTwo = result.data.userQuestionTwo
        }else{
          that.$message.error(result.message);
        }
    },
    async secondnext(){
        let that = this;
        let postdata = {
           "userAccountNo" :that.loginForm.username,
           "userAnswerOne":that.Answerform.AnswerOne,
           "userAnswerTwo":that.Answerform.AnswerTwo
        }
        let result = await checkAnswerData(postdata)
        console.log(result)
        if(result.resultStatus == "000000"){
          that.showfirst=false;
          that.showSecond = false;
          that.showthird = true;
        }else{
          that.$message.error(result.message);
        }
       
    },
    async backPassword(){
        let that = this;
        let postdata = {
           "userAccountNo" :that.loginForm.username,
           "userPasswordOne":that.passwordform.padone,
           "userPasswordTwo":that.passwordform.padtwo
        }
        console.log('找回密码')
        let result = await updatePasswordData(postdata)

        if(result.resultStatus == "000000"){
          that.showfirst=false;
          that.showSecond = false;
          that.showthird = true;
          that.$message({
            message: "修改成功",
            type: 'success'
         });
          setTimeout(()=>{
          that.$router.push({ path: "/login" });
        },1000)
        }else{
          that.$message.error(result.message);
        }
       
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
