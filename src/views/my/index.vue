<!--
 * @LastEditors: 我的信息
 -->
<template>
  <div class="app-container bg">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix header">
        <span>我的基本信息</span>
      </div>
      <div>
        <el-form :inline="true"  :model="FormInline" ref="FormInline">
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称 ：" prop="userName">
                {{FormInline.userName}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="账号：" prop="userAccountNo">
                 {{FormInline.userAccountNo}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="岗位：" prop="userPost">
                  {{FormInline.userPost}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别：" prop="userSex">
                  {{FormInline.userSex}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="年龄：" prop="userAge">
                  {{FormInline.userAge}}岁
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学历：" prop="userEducation">
                    {{FormInline.userEducation}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="户籍：" prop="userHometown">
                  {{FormInline.userHometown}}
               
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱：" prop="userEmail">
                 {{FormInline.userEmail}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="身份证号：" prop="userIdcard">
                  {{FormInline.userIdcard}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话：" prop="userMobilePhone">
                {{FormInline.userMobilePhone}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="现今住址：" prop="userAdress">
                  {{FormInline.userAdress}}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data(){
    return{
      FormInline:{
        userName:"",
        userAccountNo:"",
        userPost:'',
        userSex:'',
        userAge:'',
        userEducation:'',
        userHometown:'',
        userEmail:'',
        userIdcard:'',
        userMobilePhone:'',
        userAdress:''
      }
    }
  },
  mounted(){
    this.getInfo();
  },
  methods:{
    getInfo(){
      let userInfo = JSON.parse(localStorage.getItem('user')) 
      console.log(userInfo)
      this.FormInline.userName = userInfo.userName;
      this.FormInline.userAccountNo = userInfo.userAccountNo;
      this.FormInline.userPost = userInfo.userPost;
      this.FormInline.userSex = userInfo.userSex;
      this.FormInline.userAge = userInfo.userAge;
      this.FormInline.userEducation = userInfo.userEducation;
      this.FormInline.userHometown = userInfo.userHometown;
      this.FormInline.userEmail = userInfo.userEmail;
      this.FormInline.userIdcard = userInfo.userIdcard;
      this.FormInline.userMobilePhone = userInfo.userMobilePhone;
      this.FormInline.userAdress = userInfo.userAdress;
    }
  }
}
</script>


<style>
.clearfix span {
  text-align: center;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.app-container {
  background: #f0f3fa;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.bg {
  background: #efefef;
  height: 100%;
}
.box-card {
  width: 95%;
  margin: auto;
}
.header{
  text-align: center;
}
</style>