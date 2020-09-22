<template>
  <div class="login-container1">
    <el-form
      class="login-form"
      autocomplete="on"
      :model="register"
      :rules="loginRules"
      ref="loginForm"
      label-position="right"
     >
      <el-row>
        <el-form-item label="现今住址：" prop="userAdress">
          <el-input v-model="register.userAdress"></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="年龄：" prop="userAge">
            <el-input v-model="register.userAge" style="width:320px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学历：" prop="userEducation">
            <el-input v-model="register.userEducation" style="width:320px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系邮箱：" prop="userEmail">
            <el-input v-model="register.userEmail" style="width:320px" @blur="emialblur()"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="户籍:" prop="userHometown">
            <el-input v-model="register.userHometown" style="width:300px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="身份证号码:" prop="userIdcard">
            <el-input v-model="register.userIdcard" @blur="userIdcardblur()" style="width:300px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话(手机)：" prop="userMobilePhone">
            <el-input v-model="register.userMobilePhone" @blur="userMobilePhoneblur()" style="width:280px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="账号：" prop="userAccountNo">
            <el-input
              v-model="register.userAccountNo"
              @blur="userAccountNoblur()"
              style="width:330px"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="密码：" prop="userPassword">
            <el-input v-model="register.userPassword" type="password" style="width:330px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="员工名称：" prop="userName">
            <el-input v-model="register.userName" style="width:180px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="岗位" prop="userPost">
            <el-input v-model="register.userPost" style="width:200px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别：" prop="userSex">
            <el-radio-group v-model="register.userSex">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="忘记密码提示问题1:" prop="userQuestionOne">
            <el-input v-model="register.userQuestionOne" style="width:250px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="答案:" prop="userAnswerOne">
            <el-input v-model="register.userAnswerOne" style="width:300px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="忘记密码提示问题2:" prop="userQuestionTwo">
            <el-input v-model="register.userQuestionTwo" style="width:250px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="答案:" prop="userAnswerTwo">
            <el-input v-model="register.userAnswerTwo" style="width:300px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="button">
        <el-button type="primary" style="width:100%;" @click="onRegit()" :loading="loading">注册</el-button>
      </div>
    </el-form>

  </div>
</template>

<script>
import { registerdata, check } from "@/api/register";
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("不能为空哦"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能小于6位"));
      } else {
        callback();
      }
    };
    const validateEmial = (rule, value, callback) => {
      console.log(value,'emailvalue')
      let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; 
      if (!reg.test(value)) {
        console.log(111)
        callback(new Error("请输入正确的邮箱地址"));
      } else {
        // 邮箱正确 判断邮箱是否存在
        console.log(222)
        callback();
      }
    };
    const validateUserNo = (rule, value, callback) => {
    console.log(value,'novalue')
    if (value == "") {
      console.log(111222)
      callback(new Error("账号不能为空"));
    } else {
      callback();
    }
   };
    return {
      register: {
        userAdress: "",
        userAge: "",
        userEducation: "",
        userEmail: "",
        userHometown: "",
        userIdcard: "",
        userMobilePhone: "",
        userName: "",
        userAccountNo: "",
        userPassword: "",
        userPost: "",
        userSex: "",
        userQuestionOne: "",
        userQuestionTwo: "",
        userAnswerOne: "",
        userAnswerTwo: "",
      },
      loginRules: {
        userAdress: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        userAge: [
          { required: true, trigger: "blur", message: "请输入年龄" },
          {
            pattern: /^[-+]?(([0-9]+)([.]([0-9]+))?|([.]([0-9]+))?)$/,
            message: "请输入数字",
          },
        ],
        userEducation: [
          { required: true, trigger: "blur", message: "学历不能为空" },
        ],
        userEmail: [
          { required: true, trigger: "blur", validator: validateEmial },
          // {
          //   pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          //   message: "请输入正确的邮箱地址",
          // },
        ],
        userHometown: [
          { required: true, trigger: "blur", message: "户籍不能为空" },
        ],
        userAccountNo: [
          { required: true, trigger: "blur", validator: validateUserNo },
        ],
        userIdcard: [
          { required: true, trigger: "blur", message: "身份证不能为空" },
          {
            pattern: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            message: "请输入正确的身份证号码",
          },
        ],
        userMobilePhone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
          },
        ],
        userName: [
          { required: true, trigger: "blur", message: "用户名不能为空" },
        ],
        userPassword: [
          { required: true, trigger: "blur", validator: validatePass },
        ],
        userPost: [
          { required: true, trigger: "blur", message: "岗位不能为空" },
        ],
        userSex: [{ required: true, trigger: "change", message: "请选择性别" }],
        userAnswerOne: [
          { required: true, trigger: "blur", message: "答案不能为空" },
        ],
        userAnswerTwo: [
          { required: true, trigger: "blur", message: "答案不能为空" },
        ],
        userQuestionOne: [
          {
            required: true,
            trigger: "blur",
            message: "忘记密码提示问题需填写哦",
          },
        ],
        userQuestionTwo: [
          {
            required: true,
            trigger: "blur",
            message: "忘记密码提示问题需填写哦",
          },
        ],
      },
      loading:false,
      noMsg:""
    };
  },
  mounted() {

  },
  methods: {
    // 邮箱失去焦点
    async emialblur() {
      console.log("失去焦点");
      let emialvalue = this.register.userEmail;
      if(emialvalue !==""){
        let result = await check(emialvalue, 4);
        console.log(result.data);
        if(result.data.resultStatus =="000004"){
          this.$message(result.data.message);
          this.register.userEmail = "";
        }
      }
    },
    // 账号失去焦点
    async userAccountNoblur() {
      let userAccountNo = this.register.userAccountNo;
      if(userAccountNo !==""){
        let result = await check(userAccountNo, 1);
        this.noMsg = result.data.message;
        console.log(result.data)
        if(result.data.resultStatus =="000004"){
          this.$message(result.data.message);
          this.register.userAccountNo = "";
        }
       
      }
    },
    // 身份证失去焦点
    async userIdcardblur() {
      let userIdcard = this.register.userIdcard;
      if(userIdcard !== ""){
        let result = await check(userIdcard, 2);
        console.log(result.data)
       if(result.data.resultStatus =="000004"){
          this.$message(result.data.message);
          this.register.userIdcard = "";
        }
      }
    },
     // 手机号失去焦点
    async userMobilePhoneblur() {
      let userMobilePhone = this.register.userMobilePhone;
      if(userMobilePhone !==""){
        let result = await check(userMobilePhone, 3);
        console.log(result.data)
         if(result.data.resultStatus =="000004"){
          this.$message(result.data.message);
          this.register.userMobilePhone = "";
        }
      }
    },
    async loadregister() {
      let that = this;
      let postdata = {
        userAdress: this.register.userAdress,
        userAge: this.register.userAge,
        userEducation: this.register.userEducation,
        userEmail: this.register.userEmail,
        userHometown: this.register.userHometown,
        userIdcard: this.register.userIdcard,
        userMobilePhone: this.register.userMobilePhone,
        userName: this.register.userName,
        userAccountNo: this.register.userAccountNo,
        userPassword: this.register.userPassword,
        userPost: this.register.userPost,
        userSex: this.register.userSex,
        userQuestionOne: this.register.userQuestionOne,
        userQuestionTwo: this.register.userQuestionTwo,
        userAnswerOne: this.register.userAnswerOne,
        userAnswerTwo: this.register.userAnswerTwo,
      };
      console.log(postdata, "postdata");
      let userdata = await registerdata(postdata);
      console.log(userdata, "userdata");
      if(userdata.data.resultStatus == "000000"){
          this.$message({
          message:userdata.data.message,
          type: 'success'
        });
        that.loading = false;
        setTimeout(()=>{
          that.$router.push({ path: "/login" });
        },1000)
      }else{
        this.$message.error(userdata.data.message);
      }
    },
    onRegit() {
      const that = this;
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          try {
            that.loadregister();
            that.loading = true;
          } catch (err) {
            console.log(err);
            that.loading = false;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    reserLogin() {},
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #555;

/* reset element-ui css */
.login-container1 {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(255, 2555, 255, 1);
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
  width: 1000px;
  padding: 35px 35px 15px 35px;
  margin: 100px auto;
  img {
    width: 100%;
  }
}
.login-container1 {
  position: fixed;
  height: 100%;
  width: 100%;
  background: url(/static/images/login_bg.png) no-repeat center center fixed;
  background-size: cover;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    top: 50px;
    width: 900px;
    padding: 35px 35px 15px 35px;
    margin: auto;
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
