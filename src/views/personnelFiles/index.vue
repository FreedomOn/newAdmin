<!--
 * @LastEditors: 人员信息
 -->
<template>
  <div class="app-container bg" v-loading="allLoading"  element-loading-text="人员档案导出中,请稍后...">
    <div class="infoselect">
      <el-form :inline="true" :model="formInline" ref="formInline">
        <el-form-item label="员工名称:" prop="name">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话:" prop="userphone">
          <el-input v-model="formInline.userphone"></el-input>
        </el-form-item>
        <el-form-item label="身份证号:" prop="userCard">
          <el-input v-model="formInline.userCard" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">查询</el-button>
          <el-button @click="resetForm('formInline')">重置</el-button>
          <el-button @click="excelDemo()" type="info">人员档案模板</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 增删改 -->
    <div class="buttonGroup">
      <div @click="saveClick" class="buton" style="display: inline-block">
        <svg-icon icon-class="add"></svg-icon>
        <span class="buttext">新增</span>
      </div>
      <div @click="lookClick()" class="buton">
        <svg-icon icon-class="detail"></svg-icon>
        <span class="buttext">详情</span>
      </div>
      <div @click="editClick()" class="buton">
        <svg-icon icon-class="update"></svg-icon>
        <span class="buttext">修改</span>
      </div>
      <div @click="removeClick()" class="buton" style="display: inline-block">
        <svg-icon icon-class="delete"></svg-icon>
        <span class="buttext">删除</span>
      </div>

      <div @click="UserExportDemo()" class="buton" style="display: inline-block">
        <svg-icon icon-class="plperson"></svg-icon>
        <span class="buttext"> 导出人员档案</span>
      </div>
      <div @click="importPerson()" class="buton" style="display: inline-block">
        <svg-icon icon-class="importperson"></svg-icon>
        <span class="buttext"> 导入人员档案</span>
      </div>
    </div>
    <div class="buttonGroup" style="padding-left: 16px;">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="curpages"
        :page-size="pageSize"
        layout="total, prev, pager, next,jumper"
        :total="totalnum"
      ></el-pagination>
    </div>
    <div class="tablebox">
      <el-table
        :data="tableData"
        v-loading="loading"
        element-loading-text="拼命加载中"
        border
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <!--  -->
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="userName" label="员工名称" width="120"  align="center"></el-table-column>
        <el-table-column prop="userAge" label="年龄" width="60"  align="center"></el-table-column>
        <el-table-column prop="userSex" label="性别" width="60"  align="center"></el-table-column>
        <el-table-column prop="userEducation" label="学历" width="100"  align="center"></el-table-column>
        <el-table-column prop="userHometown" label="户籍" width  align="center"></el-table-column>
        <el-table-column prop="userEmail" label="邮箱" width  align="center"></el-table-column>
        <el-table-column prop="userMobilePhone" label="联系电话" width="120"  align="center"></el-table-column>
        <el-table-column prop="userIdcard" label="身份证号码" width="165"  align="center"></el-table-column>
        <el-table-column prop="userAdress" label="现今住址" width align="center"></el-table-column>
      </el-table>
    </div>
    <!-- 新增 -->
    <el-dialog title="新增人员" :visible.sync="saveDialogVisible" width="66%">
      <div class="infoselect">
        <el-form :inline="true" :rules="rules" :model="saveFormInline" ref="saveFormInline">
          <el-row>
            <el-col :span="12">
              <el-form-item label="员工名称：" prop="username">
                <el-input v-model="saveFormInline.username" style="width:300px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别：" prop="usersex">

                <el-radio-group v-model="saveFormInline.usersex">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="年龄：" prop="userage">
                <el-input v-model="saveFormInline.userage" style="width:300px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学历：" prop="userEducation">
                <el-select v-model="saveFormInline.userEducation" placeholder="请选择" style="width:300px">
                  <el-option label="小学 " value="小学 "></el-option>
                  <el-option label="初级中学 " value="初级中学 "></el-option>
                  <el-option label="高级中学 " value="高级中学 "></el-option>
                  <el-option label="专科" value="专科"></el-option>
                  <el-option label="本科" value="本科"></el-option>
                  <el-option label="硕士研究生" value="硕士研究生"></el-option>
                  <el-option label="博士研究生" value="博士研究生"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="户籍：" prop="userHometown">
                <el-input v-model="saveFormInline.userHometown" style="width:300px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱：" prop="userEmail">
                  <el-input v-model="saveFormInline.userEmail" style="width:300px" @blur="emialblur()"></el-input>
              </el-form-item>
            </el-col>
           </el-row>
            <el-row>
                <el-col :span="12">
                <el-form-item label="联系电话：" prop="userMobilePhone">
                    <el-input v-model="saveFormInline.userMobilePhone" style="width:300px" @blur="userMobilePhoneblur()" ></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="身份证号码：" prop="userIdcard">
                    <el-input v-model="saveFormInline.userIdcard" style="width:300px" @blur="userIdcardblur()"></el-input>
                </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="现今住址：" prop="userAdress">
                    <el-input v-model="saveFormInline.userAdress" style="width:700px"></el-input>
                </el-form-item>
            </el-row>
          <div style="margin-left: 60%;">
            <el-button @click="resetaddForm()">取 消</el-button>
            <el-button @click="resetaddsaveForm('saveFormInline')">重置</el-button>
            <el-button type="primary" @click="addSaveFrom('saveFormInline')">保存</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
    <!-- 修改 -->
     <el-dialog title="修改人员" :visible.sync="editDialogVisible" width="66%">
      <div class="infoselect">
        <el-form :inline="true" :rules="rules" :model="editFormInline" ref="editFormInline">
          <el-row>
            <el-col :span="12">
              <el-form-item label="员工名称：" prop="username">
                <el-input v-model="editFormInline.username" style="width:300px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别：" prop="usersex">

                <el-radio-group v-model="editFormInline.usersex">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="年龄：" prop="userage">
                <el-input v-model="editFormInline.userage" style="width:300px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学历：" prop="userEducation">
                <el-select v-model="editFormInline.userEducation" placeholder="请选择" style="width:300px">
                  <el-option label="小学 " value="小学 "></el-option>
                  <el-option label="初级中学 " value="初级中学 "></el-option>
                  <el-option label="高级中学 " value="高级中学 "></el-option>
                  <el-option label="专科" value="专科"></el-option>
                  <el-option label="本科" value="本科"></el-option>
                  <el-option label="硕士研究生" value="硕士研究生"></el-option>
                  <el-option label="博士研究生" value="博士研究生"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="户籍：" prop="userHometown">
                <el-input v-model="editFormInline.userHometown" style="width:300px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱：" prop="userEmail">
                  <el-input v-model="editFormInline.userEmail" style="width:300px"></el-input>
              </el-form-item>
            </el-col>
           </el-row>
            <el-row>
                <el-col :span="12">
                <el-form-item label="联系电话：" prop="userMobilePhone">
                    <el-input v-model="editFormInline.userMobilePhone" style="width:300px"></el-input>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="身份证号码：" prop="userIdcard">
                    <el-input v-model="editFormInline.userIdcard" style="width:300px"></el-input>
                </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="现今住址：" prop="userAdress">
                    <el-input v-model="editFormInline.userAdress" style="width:700px"></el-input>
                </el-form-item>
            </el-row>
          <div style="margin-left: 60%;">

            <el-button @click="resetaddForm()">取 消</el-button>
            <el-button type="primary" @click="updataFrom('editFormInline')">保存</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
    <!-- 详情 -->
     <el-dialog title="人员详情：" :visible.sync="detailDialogVisible" width="66%">
      <div class="infoselect">
        <el-form :inline="true" :model="detailFormInline" ref="detailFormInline">
          <el-row>
            <el-col :span="12">
              <el-form-item label="员工名称：" prop="username">
                {{detailFormInline.username}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别：" prop="usersex">
                {{detailFormInline.usersex}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="年龄：" prop="userage">
                {{detailFormInline.userage}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学历：" prop="userEducation">
                  {{detailFormInline.userEducation}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="户籍：" prop="userHometown">
                  {{detailFormInline.userHometown}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱：" prop="userEmail">
                 {{detailFormInline.userEmail}}
              </el-form-item>
            </el-col>
           </el-row>
            <el-row>
                <el-col :span="12">
                <el-form-item label="联系电话：" prop="userMobilePhone">
                      {{detailFormInline.userMobilePhone}}
                </el-form-item>
                </el-col>
                <el-col :span="12">
                <el-form-item label="身份证号码：" prop="userIdcard">
                   {{detailFormInline.userIdcard}}
                </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="现今住址：" prop="userAdress">
                   {{detailFormInline.userAdress}}
                </el-form-item>
            </el-row>
        </el-form>
      </div>
    </el-dialog>
    <!-- 导入人员档案 -->
    <el-dialog title="导入人员档案" :visible.sync="importDialogVisible" width="66%">
      <el-upload
          ref="upload"
          name="file"
          :limit="limit"
          :auto-upload="false"
          action="api/importExcelUser"
          :on-exceed="handleExceed"
          :file-list = "filelist"
          :on-change="handleChansge">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="postfile" :disabled="btn.disable">{{btn.message}}</el-button>
          <div slot="tip" class="el-upload__tip">上传文件只能为excel文件，且为xlsx,xls格式</div>
      </el-upload>
      <div v-for="o in errmesg" :key="o.message" class="text item">
          {{ o.message }}
      </div>  
    </el-dialog>
  </div>
</template>
<script>
import { seachPerson ,addPerson ,deletePerson ,updatePerson} from "@/api/personFile";
import { check } from "@/api/register";
export default {
  data() {
    return {
      formInline: {
        name: "",
        userphone: "",
        userCard: "",
      },
      loading: true,
      multipleSelection: [],
      tableData: [],
      pageSize: 10,
      totalnum: 0,
      curpages: 1,
      allLoading:false,
      // 新增
      saveDialogVisible: false,
      editDialogVisible:false,
      detailDialogVisible:false,
      importDialogVisible:false,
      //文件   
      file: '',
      filename:'',
      limit: 1,
      filelist: [],
      errmesg: [],
      btn: {
        disable: false,
        message: '上传服务器'
      },
      saveFormInline: {
        username: "",
        usersex: "",
        userage: "",
        userEducation: "",
        userEmail:"",
        userHometown: "",
        userMobilePhone:'',
        userIdcard:'',
        userAdress:''
      },
      editFormInline: {
        username: "",
        usersex: "",
        userage: "",
        userEducation: "",
        userEmail:"",
        userHometown: "",
        userMobilePhone:'',
        userIdcard:'',
        userAdress:'',
        userUuid:"",
      },
      detailFormInline:{
        username: "",
        usersex: "",
        userage: "",
        userEducation: "",
        userEmail:"",
        userHometown: "",
        userMobilePhone:'',
        userIdcard:'',
        userAdress:''
      },
      rules: {
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
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" },
        ],
        userAdress: [
          { required: true, trigger: "blur", message: "现今住址不能为空" },
        ],
        usersex: [{ required: true, trigger: "change", message: "请选择性别" }],
        userage: [
          { required: true, trigger: "blur", message: "请输入年龄" },
          {
            pattern: /^[-+]?(([0-9]+)([.]([0-9]+))?|([.]([0-9]+))?)$/,
            message: "请输入数字",
          },
        ],
        usersex: [{ required: true, trigger: "change", message: "请选择性别" }],
        userEducation: [
          { required: true, trigger: "change", message: "请选择学历" },
        ],
        userHometown: [
          { required: true, trigger: "blur", message: "户籍不能为空" },
        ],
        userEmail: [
          { required: true, trigger: "blur", message: "请输入邮箱"  },
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "请输入正确的邮箱地址",
          },
        ],
      },
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    // 多选方法
    handleSelectionChange(val) {
      let that = this;
      console.log(val);
      that.multipleSelection = val;
      console.log(that.multipleSelection);
    },
    // 分页
    handleCurrentChange(val) {
      this.search(val);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 新增校验 邮箱 身份证 电话
    async emialblur() {
      console.log("失去焦点");
      let emialvalue = this.saveFormInline.userEmail;
      if(emialvalue !==""){
        let result = await check(emialvalue, 4);
        console.log(result.data);
        if(result.data.resultStatus =="000004"){
          this.$message(result.data.message);
          this.saveFormInline.userEmail = "";
        }
      }
    },
    async userIdcardblur() {
      let userIdcard = this.saveFormInline.userIdcard;
      if(userIdcard !== ""){
        let result = await check(userIdcard, 2);
        console.log(result.data)
       if(result.data.resultStatus =="000004"){
          this.$message(result.data.message);
          this.saveFormInline.userIdcard = "";
        }
      }
    },
    async userMobilePhoneblur() {
      let userMobilePhone = this.saveFormInline.userMobilePhone;
      if(userMobilePhone !==""){
        let result = await check(userMobilePhone, 3);
        console.log(result.data)
         if(result.data.resultStatus =="000004"){
          this.$message(result.data.message);
          this.saveFormInline.userMobilePhone = "";
        }
      }
    },
    // 新增
    saveClick() {
      let that = this;
      that.saveDialogVisible = true;
      that.saveFormInline.userAdress = "";
      that.saveFormInline.userage = "";
      that.saveFormInline.userEducation = "";
      that.saveFormInline.userEmail = "";
      that.saveFormInline.userHometown = "";
      that.saveFormInline.userIdcard = "";
      that.saveFormInline.userMobilePhone = "";
      that.saveFormInline.username = "";
      that.saveFormInline.usersex = "";
    },
    resetaddForm () {
      this.saveDialogVisible = false
      this.editDialogVisible = false
    },
     // 重置新增表单
    resetaddsaveForm (formName) {
       this.$refs[formName].resetFields();
    },
    addSaveFrom (formName) {
      console.log(this.saveFormInline)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addSaveFrom1()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    async addSaveFrom1(){
        let that = this;
        let postdata = {
            "userAdress": this.saveFormInline.userAdress,
            "userAge": this.saveFormInline.userage,
            "userEducation": this.saveFormInline.userEducation,
            "userEmail": this.saveFormInline.userEmail,
            "userHometown": this.saveFormInline.userHometown,
            "userIdcard": this.saveFormInline.userIdcard,
            "userMobilePhone":this.saveFormInline.userMobilePhone,
            "userName": this.saveFormInline.username,
            "userSex":this.saveFormInline.usersex,  
        }
        console.log(postdata)
        let result = await addPerson(postdata)
        console.log(result);
        if(result.resultStatus == "000000"){
            that.saveDialogVisible = false
            that.$notify({
                title: '成功',
                message: result.message,
                type: 'success'
            });
            that.search()
            that.$refs.saveFormInline.resetFields()
        }else{
            that.$notify.error({
                title: '错误',
                message: result.message
            });
        }
    },
    // 详情
    lookClick() {
      let that = this;
        if(that.multipleSelection.length > 1 || that.multipleSelection.length === 0) {
            that.$message({
                showClose: true,
                message: '警告哦，请只选择一条数据进行查看详情',
                type: 'warning'
            });
            return false
      }
      this.detailDialogVisible = true;
      let e = that.multipleSelection[0];
      console.log(e)
      that.detailFormInline.username = e.userName;
      that.detailFormInline.usersex = e.userSex;
      that.detailFormInline.userage = e.userAge;
      that.detailFormInline.userEducation = e.userEducation;
      that.detailFormInline.userEmail = e.userEmail;
      that.detailFormInline.userHometown = e.userHometown;
      that.detailFormInline.userMobilePhone = e.userMobilePhone;
      that.detailFormInline.userIdcard = e.userIdcard;
      that.detailFormInline.userAdress = e.userAdress;
    },
    // 修改
    editClick() {
        let that = this;
        if(that.multipleSelection.length > 1 || that.multipleSelection.length === 0) {
            that.$message({
                showClose: true,
                message: '警告哦，请只选择一条数据进行修改哦',
                type: 'warning'
            });
            return false
        }
       let e = that.multipleSelection[0];
       that.editDialogVisible = true;
       this.updateClick(e)
    },
    updateClick(e){
        console.log(e,'eeeee');
        let that = this;
        that.editFormInline.username = e.userName;
        that.editFormInline.usersex = e.userSex;
        that.editFormInline.userage = e.userAge;
        that.editFormInline.userEducation = e.userEducation;
        that.editFormInline.userEmail = e.userEmail;
        that.editFormInline.userHometown = e.userHometown;
        that.editFormInline.userMobilePhone = e.userMobilePhone;
        that.editFormInline.userIdcard = e.userIdcard;
        that.editFormInline.userAdress = e.userAdress;
        that.editFormInline.userUuid = e.userUuid;
    },
    updataFrom (formName) {
       let that = this
       this.$refs[formName].validate((valid) => {
          if (valid) {
             that.updataFrom1()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    async updataFrom1(){
        let that = this;
        let postdata = {
            "userAdress": that.editFormInline.userAdress,
            "userAge": that.editFormInline.userage,
            "userEducation": that.editFormInline.userEducation,
            "userEmail": that.editFormInline.userEmail,
            "userHometown": that.editFormInline.userHometown,
            "userIdcard": that.editFormInline.userIdcard,
            "userMobilePhone":that.editFormInline.userMobilePhone,
            "userName": that.editFormInline.username,
            "userSex":that.editFormInline.usersex,  
            "userUuid":that.editFormInline.userUuid
        }
        console.log(postdata)
        let result = await updatePerson(postdata)
        console.log(result);
        if(result.resultStatus == "000000"){
            that.editDialogVisible = false
            that.$notify({
                title: '成功',
                message: result.message,
                type: 'success'
            });
            that.search()
        }else{
            that.$notify.error({
                title: '错误',
                message: result.message
            });
        }
    },
    // 删除
    async removeClickPeople(postData){
      let that = this
      let resdata= await deletePerson(postData)
      console.log(resdata)
      if(resdata.resultStatus == "000000"){
        that.$notify({
            title: '成功',
            message: "删除成功",
            type: 'success'
        });
        that.search()
      }else{
        this.$notify.error({
          title: "错误",
          message: resdata.message,
        });
      }
    },
    removeClick() {
        let that = this
        if(that.multipleSelection.length === 0) {
            that.$message({
                showClose: true,
                message: '警告哦，请至少选择一条数据进行删除哦',
                type: 'warning'
            });
            return false
        }
        let e = that.multipleSelection;
        console.log(e);
        let newarr = [];
        e.filter((item) => {
          return newarr.push(item.userUuid);
        });
        let euuid = newarr.join(",");
        console.log(euuid,'euuid')
        let postdata = {
            "uuids":euuid
        }
        console.log(postdata)
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          that.removeClickPeople(postdata)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 查询
    async search(pageNo = 1, pageSize = 10) {
      let pstdata = {
        page: pageNo,
        limit: pageSize,
        userMobilePhone:this.formInline.userphone == "" ? null : this.formInline.userphone,
        userName: this.formInline.name == "" ? null : this.formInline.name,
        userIdcard:this.formInline.userCard == "" ? null : this.formInline.userCard,
      };
      let result = await seachPerson(pstdata);
      console.log(result);
      if (result.resultStatus == "000000") {
        this.tableData = result.data.userList;
        this.totalnum = result.data.total;
        this.loading = false;
        this.curpages = pageNo;
        this.msgSuccess();
      } else {
        this.loading = false;
        this.$notify.error({
          title: "错误",
          message: result.message,
        });
      }
    },
    // 人员档案模板
    excelDemo(){
        let that = this;
        that.allLoading = true;
        that.$axios1({
            method:'get',
            url:'/api/exportExcelUserDemo',
            responseType:'blob',
        })
        .then((res) => {
            console.log(res.data);
            that.allLoading = false;
            let blob = new Blob([res.data],{type: res.headers['content-type']});
            let downloadElement = document.createElement('a');
            let href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            downloadElement.download =  '人员档案模板'+'.xls'; //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象
        })
        .catch((err) => {
            console.log(err)
        });
    },
    // 导出人员档案
    UserExportDemo(){
        console.log('导出人员档案')
        let that = this;
        that.allLoading = true;
        that.$axios1({
            method:'get',
            url:'/api/exportExcelUser',
            responseType:'blob',
        })
        .then((res) => {
            console.log(res.data);
            that.allLoading = false;
            let blob = new Blob([res.data],{type: res.headers['content-type']});
            let downloadElement = document.createElement('a');
            let href = window.URL.createObjectURL(blob); //创建下载的链接
            downloadElement.href = href;
            downloadElement.download =  '人员档案'+'.xls'; //下载后文件名
            document.body.appendChild(downloadElement);
            downloadElement.click(); //点击下载
            document.body.removeChild(downloadElement); //下载完成移除元素
            window.URL.revokeObjectURL(href); //释放掉blob对象
        })
        .catch((err) => {
            console.log(err)
        });


    },
    // 导入人员档案
    importPerson(){
      this.importDialogVisible = true;
    },
    handleExceed (e) {
      // 判断是否只能上传一个文件，超过提示报错
      console.log(e)
      this.$notify.error({
              title: '错误',
              message: '只能上传一个文件哦'
      });
    },
    handleChansge (file, fileList) {
      console.log(file)
      let name = file.name
      if (!/\.(xlsx|xls|XLSX|XLS)$/.test(file.name)) {
          this.$notify.error({
              title: '错误',
              message: '上传文件只能为excel文件，且为xlsx,xls格式'
            });
        this.filelist = []
        this.file = ""
        return false
      }
      this.file = file.raw
      this.filename = file.name
    },
    postfile () {
      let that = this
      if(this.file == "") {
        that.$notify.error({
              title: '错误',
              message: '上传文件不能为空'
            });
        return false
      }else{
        let formData = new FormData();
        formData.append('file', this.file);
        let url = 'api/importExcelUser';
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };
        this.btn.disable=true;
        this.btn.message="上传中，请等待"
        this.$axios1.post(url,formData, config).then(function (response) {
          console.log(response)
          that.$notify({
              title: '成功',
              message: response.data.message,
              type: 'success'
            });
          that.filelist = [];
          that.btn.disable=false;
          that.btn.message="上传服务器"
        }).catch((err) => {
          that.btn.disable=false;
          that.btn.message="上传服务器"
            that.$notify.error({
              title: '错误',
              message: '上传过程出错啦'
            });
        })
      }
        
    },
    // 方法
    msgSuccess() {
      this.$notify({
        title: "成功",
        message: "数据查询成功",
        type: "success",
      });
    },
    setMsg (data) {
       this.errmesg = data
       console.log(this.errmesg,'this.errmesg')
    },
    tipMesg (datas) {
      // data 为数组
      console.log(datas,'datas')
      let data = datas
      let that = this
      let len = data.length
      if(len === 1 ) {
         let message = data[0].message
         let res = data[0].result
         if(res == "false") {
            that.$notify.error({
              title: '错误',
              message: message
            })
        }else {
            that.$notify({
              title: '成功',
              message: message,
              type: 'success'
            });
          }
      }else {
         that.$notify.error({
              title: '错误',
              message: '部分导入成功'
          })
          that.setMsg(data)
      }
       
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.tablebox {
  background: #fff;
  padding: 10px;
}

.infoselect {
  background: #fff;
  padding-top: 24px;
  margin-bottom: 10px;
  padding-left: 10px;
}
.pagina {
  background: #fff;
  padding: 10px;
}

.app-container {
  background: #f0f3fa;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.bg {
  background: #efefef;
  height: 100%;
}
.buttonGroup {
  background: #f6f8fc;
  height: 48px;
  overflow: hidden;
}
.buton {
  float: left;
  margin-left: 20px;
  cursor: pointer;
  margin-top: 18px;
}
.buttext {
  display: inline-block;
  margin-left: 5px;
}
.text {
    font-size: 14px;
  }
.item {
  margin-bottom: 18px;
}
</style>

