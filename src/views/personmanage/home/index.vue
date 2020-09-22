<template>
  <div class="app-container bg">
    <!-- 筛选数据 -->
    <div class="infoselect">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
    <el-form-item label="姓名:" prop="name">
        <el-input v-model="formInline.name"></el-input>
    </el-form-item>
    <el-form-item label="身份证号码:" prop="idCard">
        <el-input v-model="formInline.idCard"></el-input>
    </el-form-item>
    <el-form-item label="人员类型" prop="user_type">
      <el-select v-model="formInline.user_type" placeholder="选中状态">
        <el-option
          v-for="item in formInline.user_types"
          :key="item.type"
          :label="item.type"
          :value="item.type">
        </el-option>
      </el-select>
    </el-form-item>
   <el-form-item label="所属市公司" prop="user_orgCode"  v-show="!isBlackListype">
    <el-select v-model="formInline.user_orgCode" placeholder="请选择" @change="selectorg">
      <el-option
        v-for="item in allorgs"
        :key="item.shi_org"
        :label="item.shi_org"
        :value="item.shi_orgCode">
      </el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="所属区公司" prop="Code"  v-show="!isBlackListype">
    <el-select v-model="formInline.Code" placeholder="请选择" :disabled="formInline.user_orgCode == ''">
      <el-option
        v-for="item in formInline.Codes"
        :key="item.shi_org"
        :label="item.xian_org"
        :value="item.xian_orgCode">
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="保险购置" prop="archives_insurance_state"  v-show="!isBlackListype">
   <el-select v-model="formInline.archives_insurance_state" placeholder="选中状态">
      <el-option label="是" value="是"></el-option>
      <el-option label="否" value="否"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="search()" v-show="!isBlackListype">查询</el-button>
    <el-button type="primary" @click="searchBlackdatas" v-show="isBlackListype">黑名单查询</el-button>
    <el-button @click="resetForm('formInline')">重置</el-button>
    <!-- <div v-if="roleP" style="display: inline-block">
       <el-button type="success" @click="saveClick">新增</el-button>
    </div> -->
  </el-form-item>
</el-form>
    </div>
    <!-- 筛选数据end -->


 <!-- 编辑人员 -->
<el-dialog
  title="人员信息详情"
  :visible.sync="editDialogVisible"
  width="56%"
  >
   <div class="infoselect">
       <el-form :inline="true" :rules="rules" ref="updataFormInline" :model="updataFormInline" class="demo-form-inline">
         <el-row>
           <el-col :span="12" v-show="!activation">
             <el-form-item label="是否加入分配权限：">
               <el-switch
                 v-model="auths.authBval"
                 @change="blackClickauth"
                 :disabled="auths.authBval == '1'"
                 active-value="1"
                 inactive-value="0"
                 active-color="#13ce66">
               </el-switch>
             </el-form-item>
           </el-col>
           <el-col :span="12" v-show="blackroleP">
             <el-form-item label="是否加入黑名单：">
               <!-- <el-input v-model="addFormInline.name"></el-input> -->
               <el-switch
                 v-model="updataFormInline.isBlackListB"
                 @change="blackClick"
                 :disabled="lookB"
                 active-color="red">
               </el-switch>
             </el-form-item>
           </el-col>
         </el-row>
           <el-row>
              <el-col :span="12">
                    <el-form-item label="姓 名 ： " prop="archives_name">
                      <el-input v-model="updataFormInline.archives_name" :disabled="lookB"></el-input>
                    </el-form-item>
              </el-col>
             <el-col :span="12">
               <el-form-item label="性 别 ： " prop="archives_sex">
                 <!-- <el-input v-model="addFormInline.sex"></el-input> -->
                 <el-select v-model="updataFormInline.archives_sex" placeholder="请选择" :disabled="lookB">
                   <el-option label="男" value="男">
                   </el-option>
                   <el-option label="女" value="女">
                   </el-option>
                 </el-select>
               </el-form-item>
             </el-col>
            </el-row>
             <el-row>
               <el-col :span="12">
                  <el-form-item label="年 龄 ：" prop="archives_age">
                    <el-input v-model="updataFormInline.archives_age" :disabled="lookB"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="岗位职务：" prop="user_post">
                    <!-- <el-input v-model="addFormInline.archives_state"></el-input> -->
                    <el-select v-model="updataFormInline.user_post" placeholder="选中状态" :disabled="lookB">
                      <el-option label="主任" value="主任"></el-option>
                      <el-option label="副主任" value="副主任"></el-option>
                      <el-option label="处长" value="处长"></el-option>
                      <el-option label="副处长" value="副处长"></el-option>
                      <el-option label="专责" value="专责"></el-option>
                      <el-option label="项目经理" value="项目经理"></el-option>
                      <el-option label="安全员" value="安全员"></el-option>
                      <el-option label="技术员" value="技术员"></el-option>
                      <el-option label="资料员" value="资料员"></el-option>
                      <el-option label="质量员" value="质量员"></el-option>
                      <el-option label="作业负责人" value="作业负责人"></el-option>
                      <el-option label="班员" value="班员"></el-option>
                      <el-option label="专监" value="专监"></el-option>
                      <el-option label="安监" value="安监"></el-option>
                      <el-option label="总代" value="总代"></el-option>
                    </el-select>
                  </el-form-item>
              </el-col>
               <el-col :span="12">
                      <el-form-item label="用户工号：" prop="user_workCode">
                        <el-input v-model="updataFormInline.user_workCode" placeholder="新添加人员工号" :disabled="updatadisabled">
                          <!-- <template slot="prepend">19</template> -->
                        </el-input>
                      </el-form-item>
                  </el-col>
              <el-col :span="12">
                  <el-form-item label="人员类型：" prop="user_type">
                    <el-select v-model="updataFormInline.user_type" placeholder="选中状态" @change="selectSavetype" :disabled="lookB">
                     <el-option
                        v-for="item in formInline.user_types"
                        :key="item.type"
                        :label="item.type"
                        :value="item.type">
                      </el-option>
                    </el-select>
                  </el-form-item>
              </el-col>
               <el-col :span="12">
                  <el-form-item label="市州公司：" prop="userFirstOrg">
                    <el-select v-model="updataFormInline.userFirstOrg" placeholder="请选择" @change="selectsavecity1" :disabled="typeseleb" >
                      <el-option
                        v-for="item in saveFormInline.default.cityallorgs"
                        :key="item.orgName"
                        :label="item.orgName"
                        :value="item.orgName">
                      </el-option>
                    </el-select>
                  </el-form-item>
              </el-col>
               <el-col :span="12">
                 <el-form-item label="区县单位：" prop="user_place">
                   <el-select v-model="updataFormInline.user_place" placeholder="请选择" @change="selectsaveplace" :disabled="typeseleb">
                     <el-option
                       v-for="item in saveFormInline.default.conutallorgs"
                       :key="item.orgName"
                       :label="item.orgName"
                       :value="item.orgName">
                     </el-option>
                   </el-select>
                 </el-form-item>
               </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                  <el-form-item label="所在单位：" prop="user_org">
                    <el-select v-model="updataFormInline.user_org" placeholder="请选择" @change="selectsavedept" :disabled="typeseleb">
                      <el-option
                        v-for="item in saveFormInline.default.allorgs"
                        :key="item.orgName"
                        :label="item.orgName"
                        :value="item.orgName">
                      </el-option>
                    </el-select>
                  </el-form-item>

              </el-col>
              <el-col :span="12">
                  <el-form-item label="所属部门：" prop="user_dept">
                    <!-- <el-input v-model="addFormInline.name"></el-input> -->
                    <el-select v-model="updataFormInline.user_dept" placeholder="请选择" @change="selectsaveDeptorg" :disabled="typeseleb">
                      <el-option
                        v-for="item in saveFormInline.default.alldepts"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
              </el-col>
               <el-col :span="12" v-show="updataFormInline.user_type ==='施工'">
                  <el-form-item label="所在班组：" prop="user_dept">
                    <!-- <el-input v-model="addFormInline.name"></el-input> -->
                    <el-select v-model="userTeamId1" placeholder="请选择" :disabled="typeseleb" >
                      <el-option
                        v-for="item in saveFormInline.default.tIds"
                        :key="item.tId"
                        :label="item.userTeam"
                        :value="item.tId">
                      </el-option>
                    </el-select>
                  </el-form-item>
              </el-col>

            </el-row>
            <el-row>
                <el-col :span="12">
                  <el-form-item label="是否劳务分包：">
                    <!-- <el-input v-model="addFormInline.name"></el-input> -->
                     <el-switch
                      v-model="updataFormInline.user_subpackage"
                      :disabled="lookB"
                      active-value="0"
                      inactive-value="1"
                      active-color="bule">
                    </el-switch>
                  </el-form-item>
              </el-col>
              <el-col :span="12" v-if="updataFormInline.user_subpackage == '0'">
                  <el-form-item label="劳务分包公司：" prop="outCompanyId">
                    <!-- <el-input v-model="updataFormInline.outCompanyId" :disabled="lookB"></el-input> -->
                    <el-select v-model="updataFormInline.outCompanyId" placeholder="请先选择所属单位" :disabled = "updataFormInline.user_dept == ''">
                      <el-option
                        v-for="item in queryOutCompanys"
                        :key="item.id"
                        :label="item.companyName"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row>


              <el-col :span="12">
                  <el-form-item label="证书类型：">
                    <el-input v-model="updataFormInline.archives_certificate_type" :disabled="lookB"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="证书编号：">
                    <el-input v-model="updataFormInline.archives_certificate_number" :disabled="lookB"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="身份证号：" prop="idCard">
                    <el-input v-model="updataFormInline.idCard" :disabled="updatadisabled"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="手机号码：" prop="phone">
                    <el-input v-model="updataFormInline.phone" :disabled="lookB"></el-input>
                  </el-form-item>
              </el-col>

            </el-row>
             <el-row>
              <el-col :span="12">
                  <el-form-item label="安规考试：" prop="archives_test_state">
                    <el-input v-model="updataFormInline.archives_test_state" :disabled="lookB"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="保险购置：" prop="archives_insurance_state">
                     <el-select v-model="updataFormInline.archives_insurance_state" placeholder="选中状态" :disabled="lookB">
                      <el-option label="是" value="是"></el-option>
                      <el-option label="否" value="否"></el-option>
                    </el-select>
                  </el-form-item>
              </el-col>

            </el-row>
             <el-row>
              <el-col :span="12">
                  <el-form-item label="体检状况：">
                     <el-select v-model="updataFormInline.archives_physical_state" placeholder="选中状态" :disabled="lookB">
                      <el-option label="合格" value="合格"></el-option>
                      <el-option label="不合格" value="不合格"></el-option>
                    </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="人员状况：">
                    <!-- <el-input v-model="addFormInline.archives_state"></el-input> -->
                    <el-select v-model="updataFormInline.archives_state" placeholder="选中状态" :disabled="lookB">
                      <el-option label="离职" value="离职"></el-option>
                      <el-option label="在岗" value="在岗"></el-option>
                    </el-select>
                  </el-form-item>
              </el-col>

            </el-row>
            <el-row>
                  <el-col :span="12">
                    <el-form-item label="上传头像：">
                      <!-- <el-button type="primary" @click.native="upload">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                      <input type="file" hidden @test="inputUpload"> -->
                      <!-- <input @change="saveinputUpload" type="file" /> -->
                      <div v-if="!lookB">
                         <el-upload
                      class="avatar-uploader"
                      action="https://ode.com/posts/"
                      :show-file-list="false"
                      :auto-upload="false"
                      :on-change ="updatainputUpload"
                      >
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                      </div>
                      <div v-else>
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      </div>
                       
                    </el-form-item>

                  </el-col>
              <el-col :span="12" v-if="lookB">
                <el-form-item label="个人二维码：">
                  <qrcode-vue :value="updataFormInline.archives_code" :size="qrsize" level="H"></qrcode-vue>
                </el-form-item>
              </el-col>
            </el-row>
             <el-row>
                  <el-col :span="12">
                    <el-form-item label="上传身份证正面：">
                      <!-- <el-button type="primary" @click.native="upload">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                      <input type="file" hidden @test="inputUpload"> -->
                      <!-- <input @change="saveinputUpload" type="file" /> -->
                      <div v-if="!lookB">
                         <el-upload
                      class="avatar-uploader"
                      action="https://ode.com/posts/"
                      :show-file-list="false"
                      :auto-upload="false"
                      :on-change ="updataIDcardUpload"
                      >
                      <img v-if="idcardimageUrl" :src="idcardimageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                      </div>
                      <div v-else>
                        <img v-if="idcardimageUrl" :src="idcardimageUrl" class="avatar">
                      </div>
                       
                    </el-form-item>

                  </el-col>
            </el-row>
        <div style="margin-left: 60%;" v-show="!lookB">
            <el-button @click="resetaddForm()">取 消</el-button>
            <el-button type="primary" @click="updataFrom('updataFormInline')">保存</el-button>
          </div>

        </el-form>
    </div>

</el-dialog>
   <!-- 编辑人员end -->



      <!-- 新增人员 -->
<el-dialog
  title="新增人员"
  :visible.sync="saveDialogVisible"
  width="56%"
  >
   <div class="infoselect">
       <el-form :inline="true" :rules="rules" :model="saveFormInline" ref="saveFormInline" class="demo-form-inline">
           <el-row>
              <el-col :span="12">
                    <el-form-item label="姓名：" prop="archives_name">
                      <el-input v-model="saveFormInline.archives_name"></el-input>
                    </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="性别：" prop="archives_sex">
                    <!-- <el-input v-model="addFormInline.sex"></el-input> -->
                    <el-select v-model="saveFormInline.archives_sex" placeholder="请选择">
                       <el-option label="男" value="男">
                       </el-option>
                       <el-option label="女" value="女">
                       </el-option>
                    </el-select>
                  </el-form-item>
              </el-col>

            </el-row>
             <el-row>
               <el-col :span="12">
                  <el-form-item label="年龄：" prop="archives_age">
                    <el-input v-model="saveFormInline.archives_age"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="岗位职务：" prop="user_post">
                    <!-- <el-input v-model="addFormInline.archives_state"></el-input> -->
                    <el-select v-model="saveFormInline.user_post" placeholder="选中状态">
                      <el-option label="主任" value="主任"></el-option>
                      <el-option label="副主任" value="副主任"></el-option>
                      <el-option label="处长" value="处长"></el-option>
                      <el-option label="副处长" value="副处长"></el-option>
                      <el-option label="专责" value="专责"></el-option>
                      <el-option label="项目经理" value="项目经理"></el-option>
                      <el-option label="安全员" value="安全员"></el-option>
                      <el-option label="技术员" value="技术员"></el-option>
                      <el-option label="资料员" value="资料员"></el-option>
                      <el-option label="质量员" value="质量员"></el-option>
                      <el-option label="作业负责人" value="作业负责人"></el-option>
                      <el-option label="班员" value="班员"></el-option>
                      <el-option label="专监" value="专监"></el-option>
                      <el-option label="安监" value="安监"></el-option>
                      <el-option label="总代" value="总代"></el-option>
                    </el-select>
                  </el-form-item>
              </el-col>
               <el-col :span="12">
                      <el-form-item label="用户工号：" prop="user_workCode">
                        <el-input v-model="saveFormInline.user_workCode" placeholder="新添加人员工号">
                           <template slot="prepend">19</template>
                        </el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12">
                      <el-form-item label="登录密码：" prop="password">
                        <el-input v-model="saveFormInline.password" placeholder="Password@123"></el-input>
                      </el-form-item>
                  </el-col>
              <el-col :span="12">
                  <el-form-item label="人员类型：" prop="user_type">
                    <el-select v-model="saveFormInline.user_type" placeholder="选中状态" @change="selectSavetype">
                     <el-option
                        v-for="item in formInline.user_types"
                        :key="item.type"
                        :label="item.type"
                        :value="item.type">
                      </el-option>
                    </el-select>
                  </el-form-item>
              </el-col>
               <el-col :span="12">
                  <el-form-item label="市州公司：" prop="userFirstOrg">
                    <el-select v-model="saveFormInline.userFirstOrg" placeholder="请选择" @change="selectsavecity" :disabled="addtypeb">
                      <el-option
                        v-for="item in saveFormInline.default.cityallorgs"
                        :key="item.orgName"
                        :label="item.orgName"
                        :value="item.orgName">
                      </el-option>
                    </el-select>
                  </el-form-item>
              </el-col>

            </el-row>
            <el-row>
               <el-col :span="12">
                  <el-form-item label="区县单位：" prop="user_place">
                    <el-select v-model="saveFormInline.user_place" placeholder="请选择" @change="selectsaveplace" :disabled=" saveFormInline.userFirstOrg ==''">
                      <el-option
                        v-for="item in saveFormInline.default.conutallorgs"
                        :key="item.orgName"
                        :label="item.orgName"
                        :value="item.orgName">
                      </el-option>
                    </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="所在单位：" prop="user_org">
                    <el-select v-model="saveFormInline.user_org" placeholder="请选择" @change="selectsavedept" :disabled=" saveFormInline.user_place ==''">
                      <el-option
                        v-for="item in saveFormInline.default.allorgs"
                        :key="item.orgName"
                        :label="item.orgName"
                        :value="item.orgName">
                      </el-option>
                    </el-select>
                  </el-form-item>

              </el-col>
              <el-col :span="12">
                  <el-form-item label="所属部门：" prop="user_dept">
                    <!-- <el-input v-model="addFormInline.name"></el-input> -->
                    <el-select v-model="saveFormInline.user_dept" placeholder="请选择" @change="selectsaveDeptorg" :disabled="saveFormInline.user_org ==''">
                      <el-option
                        v-for="item in saveFormInline.default.alldepts"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
              </el-col>
               <el-col :span="12" v-show="saveFormInline.user_type ==='施工'">
                  <el-form-item label="所在班组：" prop="user_dept">
                    <!-- <el-input v-model="addFormInline.name"></el-input> -->
                    <el-select v-model="userTeamId" placeholder="请选择" :disabled="saveFormInline.user_dept ==''" >
                      <el-option
                        v-for="item in saveFormInline.default.tIds"
                        :key="item.tId"
                        :label="item.userTeam"
                        :value="item.tId">
                      </el-option>
                    </el-select>
                  </el-form-item>
              </el-col>

            </el-row>
            <el-row>
                <el-col :span="12">
                  <el-form-item label="是否劳务分包：">
                    <!-- <el-input v-model="addFormInline.name"></el-input> -->

                    <el-switch
                      v-model="saveFormInline.user_subpackage"
                      active-value="0"
                      inactive-value="1"
                      active-color="bule">
                    </el-switch>
                  </el-form-item>
              </el-col>
              <el-col :span="12" v-if="saveFormInline.user_subpackage == '0'">
                  <el-form-item label="劳务分包公司：" prop="outCompanyId">
                    <!-- <el-input v-model="saveFormInline.outCompanyId"></el-input> -->
                     <el-select v-model="saveFormInline.outCompanyId" placeholder="请先选择所属单位"  :disabled = "saveFormInline.user_org == ''">
                      <el-option
                        v-for="item in queryOutCompanys"
                        :key="item.id"
                        :label="item.companyName"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row>


              <el-col :span="12">
                  <el-form-item label="证书类型：" >
                    <el-input v-model="saveFormInline.archives_certificate_type"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="证书编号：">
                    <el-input v-model="saveFormInline.archives_certificate_number"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="身份证号：" prop="idCard">
                    <el-input v-model="saveFormInline.idCard"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="手机号码：" prop="phone">
                    <el-input v-model="saveFormInline.phone"></el-input>
                  </el-form-item>
              </el-col>

            </el-row>
             <el-row>
              <el-col :span="12">
                  <el-form-item label="安规考试：" prop="archives_test_state">
                    <el-input v-model="saveFormInline.archives_test_state"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="保险购置：" prop="archives_insurance_state">
                     <el-select v-model="saveFormInline.archives_insurance_state" placeholder="选中状态">
                      <el-option label="是" value="是"></el-option>
                      <el-option label="否" value="否"></el-option>
                    </el-select>
                  </el-form-item>
              </el-col>

            </el-row>
             <el-row>
              <el-col :span="12">
                  <el-form-item label="体检状况：" prop="archives_physical_state">
                     <el-select v-model="saveFormInline.archives_physical_state" placeholder="选中状态">
                      <el-option label="合格" value="合格"></el-option>
                      <el-option label="不合格" value="不合格"></el-option>
                    </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="人员状况：" prop="archives_state">
                    <!-- <el-input v-model="addFormInline.archives_state"></el-input> -->
                    <el-select v-model="saveFormInline.archives_state" placeholder="选中状态">
                      <el-option label="离职" value="离职"></el-option>
                      <el-option label="在岗" value="在岗"></el-option>
                    </el-select>
                  </el-form-item>
              </el-col>

            </el-row>
            <el-row>
                  <el-col :span="12">
                    <el-form-item label="上传头像：">
                       <el-upload
                      class="avatar-uploader"
                      action="https://ode.com/posts/"
                      :show-file-list="false"
                      :auto-upload="false"
                      :on-change ="saveinputUpload"
                      >
                      <img v-if="imageUrl" :src="imageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    </el-form-item>
                  </el-col>
              <el-col :span="12">
                <el-form-item label="个人二维码：">
                  <qrcode-vue :value="getsaveRrData" :size="qrsize" level="H"></qrcode-vue>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
                  <el-col :span="12">
                    <el-form-item label="身份证正面照片：">
                       <el-upload
                      class="avatar-uploader"
                      action="https://ode.com/posts/"
                      :show-file-list="false"
                      :auto-upload="false"
                      :on-change ="saveIDcardUpload"
                      >
                      <img v-if="idcardimageUrl" :src="idcardimageUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    </el-form-item>
                  </el-col>
            </el-row>
        <div style="margin-left: 60%;">
            <el-button @click="resetaddForm()">取 消</el-button>
            <el-button @click="resetaddsaveForm('saveFormInline')">重置</el-button>
            <el-button type="primary" @click="addSaveFrom('saveFormInline')">保存</el-button>
          </div>

        </el-form>
    </div>

</el-dialog>
   <!-- 新增人员end -->

    <!-- 批次表格 -->
    <div class="buttonGroup" >
      <div @click="saveClick" class="buton" v-if="roleP" style="display: inline-block">
         <svg-icon icon-class="add"></svg-icon>  <span class="buttext">新增</span>  
      </div>
      <div @click="lookClick()" class="buton">
         <svg-icon icon-class="detail"></svg-icon>  <span class="buttext">详情</span>  
      </div>
      <div @click="editClick()" class="buton"> 
         <svg-icon icon-class="update"></svg-icon>  <span class="buttext">修改</span>  
      </div>
      <div @click="removeClick()" class="buton" style="display: inline-block" v-show="roleP1">
         <svg-icon icon-class="delete"></svg-icon>  <span class="buttext">删除</span>  
      </div>
       <div @click="busscrard()" class="buton">
         <svg-icon icon-class="ming"></svg-icon>  <span class="buttext">名片</span>  
      </div>
       <div @click="initpassword()" class="buton" style="display: inline-block" v-show="roleP1">
         <svg-icon icon-class="psd"></svg-icon>  <span class="buttext">初始化密码</span>  
      </div>
      <div @click="downMorecard()" class="buton" style="display: inline-block" >
         <svg-icon icon-class="plphone"></svg-icon>  <span class="buttext">批量下载名片</span>  
      </div>
      <div @click="UserExport()" class="buton" style="display: inline-block">
         <svg-icon icon-class="plperson"></svg-icon>  <span class="buttext">批量下载人员档案</span>  
      </div>
      <div @click="blackUserExport()" class="buton" style="display: inline-block">
         <svg-icon icon-class="plperson"></svg-icon>  <span class="buttext">黑名单导出</span>  
      </div>
    </div>
     <div class="buttonGroup" style="padding-left: 16px;">
      <el-pagination
      background
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next,jumper"
      :page-size="pageSize"
      :current-page="curpages"
      :total="pagesNum">
    </el-pagination>
    </div>
    <div class = "tablebox">
      <div class="isBlackListype">
        <el-switch
          v-model="isBlackListype"
          active-text="黑名单"
          @change="getblackdata"
          inactive-text="筛选黑名单">
        </el-switch>
      </div>
      <!-- <el-button type="info" @click="downMorecard">批量下载名片</el-button>
      <el-button type="info" @click="UserExport">批量下载人员档案</el-button> -->
      <el-table
      :data="tableData"
      v-loading="loading"
      border
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <!--  -->
      <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="archives_name"
        label="姓名"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="user_workCode"
        label="工号"
        width="220"
        >
      </el-table-column>
      <el-table-column
        prop="user_post"
        label="岗位"
        >
      </el-table-column>
       <el-table-column
        prop="user_type"
        label="人员类型"
        width="180"
        >
      </el-table-column>
      <el-table-column
        prop="archives_test_state"
        label="安置考试"
        width="100"
        >
      </el-table-column>

      <el-table-column
        prop="user_org"
        label="所属单位"
        width="280"
        >
      </el-table-column>
     
     
      <el-table-column
        prop="archives_state"
        label="状态"
        width="100"
        >
      </el-table-column>
      <el-table-column
       label="黑名单"
       >
      <template slot-scope="scope">
          <span v-if="scope.row.isBlackList == '1'">
            <el-tag type="info">黑名单</el-tag>
          </span>
      </template>
      </el-table-column>
       <el-table-column
       label="黑名单原因"
       >
      <template slot-scope="scope">
          <span v-if="scope.row.isBlackList == '1'">
            {{scope.row.reason}}
          </span>
      </template>
    </el-table-column>
<!-- 
      <el-table-column
       label="操作"
       width="480"
       >
      <template slot-scope="scope">
         <el-button
          size="mini"
          type="success"
          @click="busscrard(scope.row)">名片</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="lookClick(scope.row)">查看</el-button>
  
             <el-button
              size="mini"
              type="success"
              @click="editClick(scope.row)" :disabled="!roleP1">编辑</el-button>
              

       
        <div style="display: inline-block" v-show="roleP1">
               <el-button
              size="mini"
              type="info"
              @click="initpassword(scope.row)">初始化密码</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="removeClick(scope.row)">删除</el-button>

        </div>
      </template>
    </el-table-column> -->

    </el-table>

    </div>


    
    <!-- 批次表格end -->
    <!-- 加入黑名单 -->
    <el-dialog
  title="提示"
  :visible.sync="blockDialog"
  width="30%">
  <span>加入黑名单的人员，将限制登录</span>
  <div>
   <h3>加入黑名单理由：</h3> <el-input v-model="blackListreason" placeholder="请输入加入黑名单理由"></el-input>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="blockDialog = false">不加入</el-button>
    <el-button type="primary" @click="blockDialogClick">加入</el-button>
  </span>
</el-dialog>
    <!-- end -->

    <!-- 名片 -->
    <el-dialog
  title="名片"
  :visible.sync="busscardVisible"
  width="40%"
  >
   <img :src="busscardurl" alt="" width="100%">
  <span slot="footer" class="dialog-footer">
    <el-button @click="busscardVisible = false">取 消</el-button>
    <a :href="busscardurl"  download='名片.png' style="" ref="downaurl">
    <el-button type="success"  @click="busscardVisible = false">下载</el-button>
    </a>
  </span>
</el-dialog>
<!-- 多张图 -->
    <!-- end -->
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import { hasOneOf } from '@/utils/tools'
import utils from '@/utils/crypto'
import { xiaxia, updateAuthority, InitPassword, deleteById, 
        queryOutCompany, queryBlackPeople, getplace, getallOrg, 
        findDeptByOrg, getDataAll ,updateArchives, searchCommpany,
         addBlackList, deleteByWorkCode, assignAuthority, queryAssignAuthority, 
         queryUserTeam, isHasDeletePermit} from '@/api/personmanage'

export default {
  watch: {
    
  },
  components: {
    QrcodeVue
  },
  methods: {
    // 激活
    async AssignAuthority (scope) {
      let postdata = {
         'roleidType': scope.user_type,
         'userNo': scope.user_workCode
      }
      let resdata = await assignAuthority (postdata)
      if(resdata.result == "true") {
        this.notifyTit(resdata.message)
      }
      console.log(resdata)
    },
    // 名片
    busscrard () {
      //  this.userdatas = e;
        let that = this;
      if(that.multipleSelection.length > 1 || that.multipleSelection.length === 0) {
          that.$message({
            showClose: true,
            message: '警告哦，请只选择一条数据哦',
            type: 'warning'
          });
         return false
      }
      let e = that.multipleSelection[0]
      console.log(e)
       let postdata = {
         'archivesId': e.archives_id
       }
       let data1 = utils.encrypt(JSON.stringify(postdata))
       this.$axios1({
          method: 'post',
          url:'GSPdwPC/ArchivesAction!createPostCard.action',
          data: that.qs.stringify({'data': data1}),
          responseType:'blob'
       }).then((res) => {
         console.log(res)
         let data = res.data
         let objectURL = window.URL.createObjectURL(data);
          that.busscardurl = objectURL
           that.busscardVisible = true
       }).catch((err) => {
         console.log(err)
       })

    },
    initpassword () {
      let that = this
      if(that.multipleSelection.length > 1 || that.multipleSelection.length === 0) {
          that.$message({
            showClose: true,
            message: '警告哦，请只选择一条数据哦',
            type: 'warning'
          });
         return false
      }
      let e = that.multipleSelection[0]
      let postData = {
         'userNo': e.user_workCode,
         'userToNo': this.user_workCode
      }
       this.$confirm('此操作将该用户密码修改为 Password@123 ', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.initpassword1(postData)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    async initpassword1 (postdata) {
       let resdata = await InitPassword(postdata)
       console.log(resdata)
       this.restip(resdata)
    },
    //加入黑名单
    async blockDialogClick() {
        if(this.blackListreason == "") {
          this.updataFormInline.isBlackListB = false
          this.$message.error('请加入黑名单填好原因！！');
          return false
        }
        let postdata = {
          'blackList.workCode': this.updataFormInline.user_workCode,
          'blackList.accessName': this.archives_name,
          'blackList.accessWorkCode': this.user_workCode,
          'blackType': 1,
          'blackList.reason': this.blackListreason
        }
        let addData = await addBlackList(postdata)
        console.log('我是返回数据')
        console.log(addData.result)
        if(addData.result == 'true') {
          this.$message({
            message: addData.message,
            type: 'success'
          });
          this.getData()
          this.updataFormInline.isBlackListB = true
          this.blockDialog = false
        }else{
          this.updataFormInline.isBlackListB = false
          this.$message.error(addData.message);
        }

    },
    // 取消黑名单
    async blockDialogClose(){
      let that = this;
       let postdata = {
             'workCode': this.updataFormInline.user_workCode,
              'blackType': 1,
       }

       let postdata1 = {
         'workCode': this.user_workCode
       }
      let resdata1 = await isHasDeletePermit(postdata1)
      if(resdata1.data === 0) {
         that.$message({
            showClose: true,
            message: '警告哦，该账户无权限操作黑名单',
            type: 'warning'
          });
        return false
      }

       let deledata = await deleteByWorkCode(postdata)
       if(deledata.result) {
          this.$message({
            message: '黑名单移除成功',
            type: 'success'
          });
          this.blockDialog = false
          this.updataFormInline.isBlackListB = false
          this.blockDialog = false
          this.getData()
        }else{
          this.blockDialog = false
          this.updataFormInline.isBlackListB = true
          this.$message.error('移除黑名单失败');
        }


    },
    // 多选方法
    handleSelectionChange (val) {
      let that = this;
      console.log(val)
      this.usermoredatasarr = val
       that.multipleSelection = val;
        console.log(that.multipleSelection)
    },
    // 人员档案批量导出
    UserExport () {
      let that = this
      // let idList = []
      // let len = this.usermoredatasarr.length
      // if(len < 1 ) {
      //    this.$message({
      //     message: '最少选中一个人员',
      //     type: 'warning'
      //   });
      //   return false
      // }
      // this.usermoredatasarr.forEach(function(item) {
      //     idList.push(item.archives_id)
      // })

      let Code = this.formInline.Code === "123" ? '' : this.formInline.Code
       if(this.formInline.user_orgCode === "") {
         Code = this.user_orgCode
       }else if(Code == "") {
         Code = this.formInline.user_orgCode
       }
       console.log(this.formInline.Code)
       const postData = {
         'gspw_archives.archives_name': this.formInline.name,
         'gspw_archives.user_type': this.formInline.user_type,
         'gspw_archives.archives_test_state': this.formInline.archives_test_state,
         'gspw_archives.archives_insurance_state': this.formInline.archives_insurance_state,
          'userOrg': Code,
          'pageNo': -1
       }
       let data1 = utils.encrypt(JSON.stringify(postData))
       this.$axios1({
         method: 'post',
         url:'GSPdwPC/ExportAction!userExport.action',
         data: that.qs.stringify({'data': data1}),
         responseType: 'blob'
       }).then((response) => {
          let url = window.URL.createObjectURL(response.data);
                console.log(url)
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.href = url;
                a.download = '批量人员档案.xlsx';
                a.click();
                window.URL.revokeObjectURL(url);
       }).catch((err)=> {
         console.log(err)
       })
      //  this.busscardmoreVisible = true;

      //  this.usermoredatas = this.usermoredatasarr
    },
    // 黑名单导出
    blackUserExport () {
      let that = this
       const postData = {
         'gspw_archives.archives_name': this.formInline.name,
         'gspw_archives.user_type': this.formInline.user_type,
         'gspw_archives.idCard': this.formInline.idCard,
       }
       let data1 = utils.encrypt(JSON.stringify(postData))
       this.$axios1({
         method: 'post',
         url:'GSPdwPC/BlackListExportAction!blackUserExport.action',
         data: that.qs.stringify({'data': data1}),
         responseType: 'blob'
       }).then((response) => {
          let url = window.URL.createObjectURL(response.data);
                console.log(url)
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.href = url;
                a.download = '黑名单导出.xlsx';
                a.click();
                window.URL.revokeObjectURL(url);
       }).catch((err)=> {
         console.log(err)
       })
      //  this.busscardmoreVisible = true;

      //  this.usermoredatas = this.usermoredatasarr
    },
    // 下载多张按钮
    downMorecard () {
      let that = this
      let idList = []
      let len = this.usermoredatasarr.length
      if(len < 1 ) {
         this.$message({
          message: '最少选中一个人员',
          type: 'warning'
        });
        return false
      }
      this.usermoredatasarr.forEach(function(item) {
          idList.push(item.archives_id)
      })
      let data1 = utils.encrypt(JSON.stringify({'idS': idList}))
       this.$axios1({
         method: 'post',
         url:'GSPdwPC/ArchivesAction!downLoadPostCardZips.action',
         data: that.qs.stringify({'data': data1 }),
         responseType: 'blob'
       }).then((response) => {
          let url = window.URL.createObjectURL(response.data);
                console.log(url)
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.href = url;
                a.download = '批量名片.zip';
                a.click();
                window.URL.revokeObjectURL(url);
       }).catch((err)=> {
         console.log(err)
       })
      //  this.busscardmoreVisible = true;

      //  this.usermoredatas = this.usermoredatasarr
    },
    // 激活账号
    blackClickauth (val) {
       console.log(val)
       this.AssignAuthority(this.updataFormInline)
    },
    // 黑名单
    blackClick (val) {
      this.updataFormInline.isBlackListB = !val;
      this.blackListreason = ""
      let that = this
      if(val) {
         this.blockDialog = true
      }else {
        this.$confirm('你加移除此人黑名单，他即将可以登录', '提示', {
          confirmButtonText: '移除黑名单',
          cancelButtonText: '不移除',
          type: 'warning'
        }).then(() => {
          that.blockDialogClose()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消移除'
          });
        });
      }
      //

      //
      console.log(val)
    },
    async searchcompan () {
       let that = this
       let data = await searchCommpany(this.user_orgname, this.user_orgCode)
       this.allorgs = data.sheng_porg
    },
    resetaddForm () {
      this.saveDialogVisible = false
      this.editDialogVisible = false
      // this.$refs[formName].resetFields();
    },
    // 重置新增表单
    resetaddsaveForm (formName) {
       this.$refs[formName].resetFields();
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
      console.log(this.formInline)
    },
    upload () {
       this.$emit('test')
    },
    getQr () {
       this.addFormInline.archives_code = this.addFormInline.archives_age + this.addFormInline.archives_sex + this.addFormInline.archives_certificate_number
    },

    inputUpload (e) {

       this.addFormInline.imagefile = e.target.files[0]
       this.addFormInline.imagefileName = e.target.files[0].name
    },
    selectorg (val) {
       let arrs = this.allorgs.filter((ele) => {
         return (ele.shi_orgCode === val)
       })
       console.log(arrs)
       this.formInline.Codes = arrs[0].shi_porg
       this.formInline.Code = ''
      //  console.log()
    },
    async getData (pageNo = 1,pageSize = 10) {
      const that = this
      this.typeseleb = true
      this.loading = true
      this.pagesb = false
      // localStorage.setItem("b", JSON.stringify({'xia': []}))
      const postdata = {
        'userOrg': that.user_orgCode,
        "userType": 1,
        'pageNo': pageNo,
        "pageSize": pageSize
      }
      const adata = await getDataAll(postdata)
         that.pagesNum = adata.total
      console.log(adata)
      //  that.olddata = adata
      //  that.newdata = adata
    // const tableDatas = that._.chunk(that.olddata, that.pageSize)

    // that.tableDatas = tableDatas
    that.tableData = adata.gspw_archives;
      this.loading = false;
      this.curpages = pageNo;
       this.pagesb = true
      // that.tableData = adata
    },
    selectDept (e) {

      let dept = this._.find(this.alldepts, { name: e})

      this.user_deptCode = dept.deptCode
    },
    notifyTit (message, title = '成功') {
      this.$notify({
          title: title,
          message: message,
          type: 'success'
      });
    },
    restip (val) {
      let that = this
      if(val.result == "true"){
             that.saveDialogVisible = false
             that.$notify({
                title: '成功',
                message: val.message,
                type: 'success'
              });
              that.getData()
              
          }else {
             that.$notify.error({
                title: '错误',
                message: val.message
              });
          }
    },
    async removeClickbox (postData) {
      let that = this
      let postdata1 = {
         'workCode': this.user_workCode
       }
      let resdata1 = await isHasDeletePermit(postdata1)
      if(resdata1.data === 0) {
         that.$message({
            showClose: true,
            message: '警告哦，该账户无权限操作删除',
            type: 'warning'
          });
        return false
      }
      let resdata= await deleteById(postData)
      console.log(resdata)
      this.restip(resdata)
    },
   
    removeClick () {

      let that = this
      if(that.multipleSelection.length > 1 || that.multipleSelection.length === 0) {
          that.$message({
            showClose: true,
            message: '警告哦，请只选择一条数据哦',
            type: 'warning'
          });
         return false
      }
      let e = that.multipleSelection[0]
      console.log(e)
      let postdata = {
        'archives_id': e.archives_id,
        'userNo': e.user_workCode,
        'userToNo': this.user_workCode
      }
     
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.removeClickbox(postdata)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
     

    },
    saveClick () {
      this.saveDialogVisible = true
      this.addtypeb = true
      this.imageUrl = '';
      this.idcardimageUrl = ''
    },
    updataFrom (formName) {
       let that = this
       this.$refs[formName].validate((valid) => {
          if (valid) {
            
             that.updataFrom1()
            //  console.log(9999)
             if(that.oldtype != that.updataFormInline.user_type) {
                  that.UpdateAuthority()
             }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    // 修改人员档案类型权限
    async UpdateAuthority () {
      let postData = {
         'userNo': this.updataFormInline.user_workCode,
         'archives_id': this.updataFormInline.archives_id,
         'roleidType': this.updataFormInline.user_type,
         'userToNo': this.user_workCode
      }
      let resdata = await updateAuthority(postData)
      console.log(resdata)
    },
    // 修改人员档案
    updataFrom1 () {
        let that = this
        
        const paramupdata = new FormData(); //创建form对象
         this.updataFormInline.archives_code = this.updataFormInline.archives_name + this.updataFormInline.archives_sex + this.updataFormInline.user_workCode

        let postdata = {
            'gspw_archives.archives_id':  this.updataFormInline.archives_id ,
            'gspw_archives.archives_name':  this.updataFormInline.archives_name , //通过append向form对象添加数据
            'gspw_archives.archives_sex':  this.updataFormInline.archives_sex ,
            'gspw_archives.archives_age':  this.updataFormInline.archives_age ,
            'gspw_archives.user_type': this.updataFormInline.user_type ,
            'gspw_archives.archives_insurance_state': this.updataFormInline.archives_insurance_state,
            'gspw_archives.archives_certificate_type':  this.updataFormInline.archives_certificate_type ,
            'gspw_archives.archives_certificate_number':  this.updataFormInline.archives_certificate_number ,
            'gspw_archives.archives_test_state':  this.updataFormInline.archives_test_state ,
            'gspw_archives.archives_physical_state': this.updataFormInline.archives_physical_state ,
            'gspw_archives.archives_state':  this.updataFormInline.archives_state ,
            'gspw_archives.archives_code': this.updataFormInline.archives_code ,
             'gspw_archives.user_workCode': this.updataFormInline.user_workCode ,
            'password':  this.updataFormInline.password1 ,
            'imagefileName': this.updataimagefileName,
            'updataidcardfileName': this.updataidcardfileName,
            'gspw_archives.user_post':  this.updataFormInline.user_post ,
            'gspw_archives.user_subpackage': this.updataFormInline.user_subpackage ,
            'gspw_archives.outCompanyId': this.updataFormInline.outCompanyId ,
            'gspw_archives.userFirstOrg': this.updataFormInline.userFirstOrg ,
            'gspw_archives.userFirstOrgCode': this.updataFormInline.userFirstOrgCode ,
            'gspw_archives.user_place':  this.updataFormInline.user_place ,
            'gspw_archives.user_placeCode':  this.updataFormInline.user_placeCode ,
            'gspw_archives.user_org': this.updataFormInline.user_org ,
            'gspw_archives.user_orgCode':  this.updataFormInline.user_orgCode ,
            'gspw_archives.user_dept': this.updataFormInline.user_dept ,
            'gspw_archives.user_deptCode': this.updataFormInline.user_deptCode ,
            'gspw_archives.idCard': this.updataFormInline.idCard ,
            'gspw_archives.phone': this.updataFormInline.phone ,
            'gspw_archives.userTeamId':  this.userTeamId1 ,
        }
        // paramupdata.append('gspw_archives.archives_id', this.updataFormInline.archives_id);
        // paramupdata.append('gspw_archives.archives_name', this.updataFormInline.archives_name); //通过append向form对象添加数据
        // paramupdata.append('gspw_archives.archives_sex', this.updataFormInline.archives_sex);
        // paramupdata.append('gspw_archives.archives_age', this.updataFormInline.archives_age);
        // paramupdata.append('gspw_archives.user_type',this.updataFormInline.user_type);
        // paramupdata.append('gspw_archives.archives_insurance_state',this.updataFormInline.archives_insurance_state)
        // paramupdata.append('gspw_archives.archives_certificate_type', this.updataFormInline.archives_certificate_type);
        // paramupdata.append('gspw_archives.archives_certificate_number', this.updataFormInline.archives_certificate_number);
        // paramupdata.append('gspw_archives.archives_test_state', this.updataFormInline.archives_test_state)
        // paramupdata.append('gspw_archives.archives_physical_state',this.updataFormInline.archives_physical_state)
        // paramupdata.append('gspw_archives.archives_state', this.updataFormInline.archives_state)
        // paramupdata.append('gspw_archives.archives_code',this.updataFormInline.archives_code)
        // paramupdata.append( 'gspw_archives.user_workCode',this.updataFormInline.user_workCode)
        // paramupdata.append('password', this.updataFormInline.password1)
        paramupdata.append('data', utils.encrypt(JSON.stringify(postdata)))
        paramupdata.append('imagefile',this.updataimagefile)
        paramupdata.append('idCardFile',this.updataidcardile)
        // paramupdata.append('imagefileName',this.updataimagefileName)
        // paramupdata.append('gspw_archives.user_post', this.updataFormInline.user_post)
        // paramupdata.append('gspw_archives.user_subpackage',this.updataFormInline.user_subpackage)
        // paramupdata.append('gspw_archives.outCompanyId',this.updataFormInline.outCompanyId)
        // paramupdata.append('gspw_archives.userFirstOrg',this.updataFormInline.userFirstOrg)
        // paramupdata.append('gspw_archives.userFirstOrgCode',this.updataFormInline.userFirstOrgCode)
        // paramupdata.append('gspw_archives.user_place', this.updataFormInline.user_place);
        // paramupdata.append('gspw_archives.user_placeCode', this.updataFormInline.user_placeCode);
        // paramupdata.append('gspw_archives.user_org',this.updataFormInline.user_org);
        // paramupdata.append('gspw_archives.user_orgCode', this.updataFormInline.user_orgCode);
        // paramupdata.append('gspw_archives.user_dept',this.updataFormInline.user_dept);
        // paramupdata.append('gspw_archives.user_deptCode',this.updataFormInline.user_deptCode);
        // paramupdata.append('gspw_archives.idCard',this.updataFormInline.idCard);
        // paramupdata.append('gspw_archives.phone',this.updataFormInline.phone);
        // paramupdata.append('gspw_archives.userTeamId', this.userTeamId1);
        console.log(postdata)

        that.$axios1({
          method: 'post',
          url: 'GSPdwPC/ArchivesAction!updateArchives.action',
          data: paramupdata,
          headers:{'Content-Type':'multipart/form-data'}
        })
        .then((res) => {
          
          let val = JSON.parse(utils.decrypt(res.data))
          if(val.result == "true"){
             that.saveDialogVisible = false
             that.$notify({
                title: '成功',
                message: val.message,
                type: 'success'
              });
              that.getData()
              that.resetaddForm()
              // that.$refs.saveFormInline.resetFields()
          }else {
             that.$notify.error({
                title: '错误',
                message: val.message
              });
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // // 二维码信息生产
    // setqrimg (data) {
    //    let code = data.archives_code
    //    this.getlookRrData = code
    // },
    lookClick () {
       let that = this;
      if(that.multipleSelection.length > 1 || that.multipleSelection.length === 0) {
          that.$message({
            showClose: true,
            message: '警告哦，请只选择一条数据哦',
            type: 'warning'
          });
         return false
      }
      let e = that.multipleSelection[0]
      this.lookB = true
      this.typeseleb = true
      this.evalClick(e)
      // this.setqrimg(e)
    },
    editClick () {
        let that = this;
      if(that.multipleSelection.length > 1 || that.multipleSelection.length === 0) {
          that.$message({
            showClose: true,
            message: '警告哦，请只选择一条数据哦',
            type: 'warning'
          });
         return false
      }
      let e = that.multipleSelection[0]
      this.evalClick(e)
      this.typeseleb = false
      this.lookB = false

    },
    // 查询是否激活
    async QueryAssignAuthority (e) {
      let postdata = {
        'userNo': e.user_workCode
      }
      let resdata = await queryAssignAuthority(postdata)
      console.log(resdata,'限制啊')
      this.auths.authBval = resdata.data
      // console.log
    },
    evalClick (e) {
      console.log(e)
       this.QueryAssignAuthority(e)
      this.actstate = 0
      this.editDialogVisible = true
      let isBlackListB = e.isBlackList == 1 ? true: false;
      console.log(isBlackListB)
      this.oldtype = e.user_type
      this.updataFormInline = {
          archives_age: e.archives_age,
          archives_certificate_number: e.archives_certificate_number,
          archives_certificate_type: e.archives_certificate_type,
          archives_code: e.archives_code,
          archives_id: e.archives_id,
          archives_insurance_state: e.archives_insurance_state,
          archives_name: e.archives_name,
          archives_photo: e.archives_photo,
          archives_photo_ur: e.archives_photo_ur,
          archives_physical_state: e.archives_physical_state,
          archives_sex: e.archives_sex,
          archives_state: e.archives_state,
          archives_test_state: e.archives_test_state,
          deleteMark: e.deleteMark,
          departMentInfo: e.departMentInfo,
          idCard: e.idCard,
          isBlackList: e.isBlackList,
          isBlackListB: isBlackListB,
          phone: e.phone,
          userFirstOrg: e.userFirstOrg,
          userFirstOrgCode: e.userFirstOrgCode,
          user_dept: e.user_dept,
          user_deptCode: e.user_deptCode,
          user_org: e.user_org,
          user_orgCode: e.user_orgCode,
          user_place: e.user_place,
          user_placeCode: e.user_placeCode,
          user_post: e.user_post,
          user_subpackage: e.user_subpackage,
          outCompanyId: e.outCompanyId == 0 ? '': e.outCompanyId,
          user_type: e.user_type,
          user_workCode: e.user_workCode
      }
      this.userTeamId1 = e.userTeamId
      this.defaultData()
      this.imageUrl ='GSPdwPC/ArchivesAction!downloadFile.action?gspw_archives.archives_photo_ur=' + e.archives_photo_ur
      this.idcardimageUrl = e.idcardUrl
      // http://172.30.79.161:8080/GSPdwV2.0.8/ArchivesAction!downloadFile.action?archives_photo_ur=/mnt/oss/file/20181114160518.jpg
    },
    handleCurrentChange(val) {
      this.search(val)
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
    // 新增保存
     addSaveFrom1 () {
        const that =this
        const param = new FormData(); //创建form对象
        console.log(this.saveFormInline)
        let postdata = {
             'gspw_archives.archives_name':  this.saveFormInline.archives_name , //通过append向form对象添加数据
           'gspw_archives.archives_sex':  this.saveFormInline.archives_sex ,
           'gspw_archives.archives_age':  this.saveFormInline.archives_age ,
           'gspw_archives.user_type': this.saveFormInline.user_type ,
           'gspw_archives.archives_insurance_state': this.saveFormInline.archives_insurance_state ,
           'gspw_archives.archives_certificate_type':  this.saveFormInline.archives_certificate_type ,
           'gspw_archives.archives_certificate_number': this.saveFormInline.archives_certificate_number ,
           'gspw_archives.archives_test_state':  this.saveFormInline.archives_test_state,
           'gspw_archives.archives_physical_state': this.saveFormInline.archives_physical_state,
           'gspw_archives.archives_state':  this.saveFormInline.archives_state ,
           'gspw_archives.archives_code': this.saveFormInline.archives_code ,
           'gspw_archives.user_workCode': '19' + this.saveFormInline.user_workCode ,
           'password':  this.saveFormInline.password ,
           'imagefileName': this.saveFormInline.imagefileName ,
           'idCardFileName': this.saveFormInline.idCardFileName ,
           'gspw_archives.archives_test_state':  this.saveFormInline.archives_test_state ,
           'gspw_archives.user_post':  this.saveFormInline.user_post ,
           'gspw_archives.user_subpackage': this.saveFormInline.user_subpackage ,
           'gspw_archives.outCompanyId': this.saveFormInline.outCompanyId ,
           'gspw_archives.userFirstOrg': this.saveFormInline.userFirstOrg ,
           'gspw_archives.userFirstOrgCode': this.saveFormInline.userFirstOrgCode ,
           'gspw_archives.user_place':  this.saveFormInline.user_place ,
           'gspw_archives.user_placeCode':  this.saveFormInline.user_placeCode ,
           'gspw_archives.user_org': this.saveFormInline.user_org ,
           'gspw_archives.user_orgCode':  this.saveFormInline.user_orgCode ,
           'gspw_archives.user_dept': this.saveFormInline.user_dept ,
           'gspw_archives.user_deptCode': this.saveFormInline.user_deptCode ,
           'gspw_archives.idCard': this.saveFormInline.idCard ,
           'gspw_archives.phone': this.saveFormInline.phone ,
           'gspw_archives.userTeamId':  this.userTeamId ,
        }
        console.log(postdata)
        param.append('data', utils.encrypt(JSON.stringify(postdata)))
        param.append('imagefile',this.saveFormInline.imagefile)
        param.append('idCardFile',this.saveFormInline.idCardFile)
        

        that.$axios1({
          method: 'post',
          url: 'GSPdwPC/ArchivesAction!addArchives.action',
          data: param,
          headers:{'Content-Type':'multipart/form-data'}
        })
        .then((res) => {
          let val = JSON.parse(utils.decrypt(res.data))
          if(val.result == "true"){
             that.saveDialogVisible = false
             that.$notify({
                title: '成功',
                message: val.message,
                type: 'success'
              });
              that.getData()
              that.$refs.saveFormInline.resetFields()
          }else {
             that.$notify.error({
                title: '错误',
                message: val.message
              });
          }
        })
        .catch((err) => {
          console.log(err)
        })
        //
    },
    // 查询姓名
    getallName () {
      // 查询id和姓名
      let that = this
        this.$axios({
          method: 'post',
          url:'GSPdwPC/ArchivesAction!queryArchivesName.action',
          data: JSON.stringify({'userOrg': that.user_orgCode})
        })
        .then((res) => {
          that.users = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 新增上传图片
    updatainputUpload (file, fileList) {
        const isJPG = file.raw.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.raw.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
          return false
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return false
        }
        // return isJPG && isLt2M;
       this.imageUrl = URL.createObjectURL(file.raw);
       this.updataimagefile = file.raw
       this.updataimagefileName = file.name
    },
     // 修改 上传身份证
    updataIDcardUpload (file, fileList) {
        const isJPG = file.raw.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.raw.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
          return false
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return false
        }
        // return isJPG && isLt2M;
       this.idcardimageUrl = URL.createObjectURL(file.raw);
       this.updataidcardile = file.raw
       this.updataidcardfileName = file.name
    },
    // 新增上传图片
    saveinputUpload (file, fileList) {

        const isJPG = file.raw.type === 'image/jpeg' || 'image/png';
        
        const isLt2M = file.raw.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
          return false
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return false
        }
        // return isJPG && isLt2M;
       this.imageUrl = URL.createObjectURL(file.raw);
       this.saveFormInline.imagefile = file.raw
       this.saveFormInline.imagefileName = file.name
    },
     // 新增上传身份证照片
    saveIDcardUpload (file, fileList) {

        const isJPG = file.raw.type === 'image/jpeg' || 'image/png';
        
        const isLt2M = file.raw.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传身份证只能是 JPG 格式!');
          return false
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return false
        }
        // return isJPG && isLt2M;
       this.idcardimageUrl = URL.createObjectURL(file.raw);
       this.saveFormInline.idCardFile = file.raw
       this.saveFormInline.idCardFileName = file.name
    },
    // 点击编辑默认去获取相关地级数据
    async defaultData() {
        // 获取市公司
        let that = this

        //
         let getOrg = await xiaxia(this.user_orgCode, this.user_type, this.user_orgname,this.updataFormInline.user_type)
         this.saveFormInline.default.cityallorgs = getOrg  // 市公司
        //
        let getallorg = await getallOrg(this.updataFormInline.userFirstOrgCode,this.user_type,this.updataFormInline.userFirstOrg, that.updataFormInline.user_type )
        let placedata = await getplace(this.updataFormInline.user_orgCode,this.user_type, this.updataFormInline.user_org, that.updataFormInline.user_type)
        that.saveFormInline.default.conutallorgs = placedata  // 县公司
        that.saveFormInline.default.allorgs = getallorg  // 所属公司
        let deptorg = await findDeptByOrg(this.updataFormInline.user_placeCode)
        that.saveFormInline.default.alldepts = deptorg  // 部门
        this.getqueryOutCompany(this.updataFormInline.user_org)
        this.QueryUserTeam(this.updataFormInline.user_type, this.updataFormInline.user_deptCode)
    },
    // 保存 -- 选择所属公司
    async selectsavedept (val) {
        let that = this;
        let result3 = this._.filter(this.saveFormInline.default.allorgs, function(item){
          return item.orgName === val;
        });
        let orgNo = result3[0].orgNo
        let deptorg = await findDeptByOrg(orgNo)
        that.saveFormInline.default.alldepts = deptorg
        that.saveFormInline.user_orgCode = orgNo
        that.updataFormInline.user_orgCode = orgNo
        this.getqueryOutCompany(val)
    },
    // 查询外包公司
    async getqueryOutCompany (subCompany) {
         let resdata = await queryOutCompany(subCompany)
         this.queryOutCompanys = resdata
         console.log(resdata)
    },
    // 保存--选择市公司
    async selectsavecity (userOrgName) {
       let that = this
       let result3 = this._.filter(this.saveFormInline.default.cityallorgs, function(item){
          return item.orgName === userOrgName;
        });
        console.log(33)
        let getallorg = await getallOrg(result3[0].orgNo,this.user_type,userOrgName, that.saveFormInline.user_type )
        let placedata = await getplace(result3[0].orgNo,this.user_type, userOrgName, that.saveFormInline.user_type)
        console.log(getallorg)
        console.log(placedata)
        that.saveFormInline.default.conutallorgs = placedata
        that.saveFormInline.default.allorgs = getallorg
        that.saveFormInline.userFirstOrgCode = result3[0].orgNo
        that.updataFormInline.userFirstOrgCode = result3[0].orgNo
        that.saveFormInline.user_place = ""
        that.updataFormInline.user_place = ""
    },
    // 修改--选择市公司
    async selectsavecity1 (userOrgName) {
       let that = this
       let result3 = this._.filter(this.saveFormInline.default.cityallorgs, function(item){
          return item.orgName === userOrgName;
        });

        let getallorg = await getallOrg(result3[0].orgNo,this.user_type,userOrgName, that.updataFormInline.user_type )
        let placedata = await getplace(result3[0].orgNo,this.user_type, userOrgName, that.updataFormInline.user_type)
        that.saveFormInline.default.conutallorgs = placedata
        that.saveFormInline.default.allorgs = getallorg
        that.saveFormInline.userFirstOrgCode = result3[0].orgNo
        that.updataFormInline.userFirstOrgCode = result3[0].orgNo
        that.saveFormInline.user_place = ""
        that.updataFormInline.user_place = ""
    },
    // 保存--选择区县单位
    selectsaveplace (val) {
         let result3 = this._.filter(this.saveFormInline.default.conutallorgs, function(item){
          return item.orgName === val;
        });
        this.saveFormInline.user_placeCode = result3[0].orgNo
        this.updataFormInline.user_placeCode = result3[0].orgNo

       
    },
    // 保存--选择部门
    selectsaveDeptorg (val) {
        console.log(val)
        let result3 = this._.filter(this.saveFormInline.default.alldepts, function(item){
          return item.name === val;
        });
        this.saveFormInline.user_deptCode = result3[0].deptNo
        this.updataFormInline.user_deptCode = result3[0].deptNo
        this.QueryUserTeam(this.saveFormInline.user_type,result3[0].deptNo)

    },
    selectEdittype () {

    },
    async selectSavetype (val){

      let that = this
      this.typeseleb = false
      this.addtypeb = false
      let getOrg = await xiaxia(this.user_orgCode, this.user_type, this.user_orgname,val)
      console.log(getOrg)
      this.saveFormInline.default.cityallorgs = getOrg
      this.saveFormInline.userFirstOrg = ""
      this.saveFormInline.user_place = ""
      this.saveFormInline.user_dept = ""
      this.saveFormInline.user_org = ""
      this.saveFormInline.outCompanyId = ""

      this.updataFormInline.userFirstOrg = ""
      this.updataFormInline.user_place = ""
      this.updataFormInline.user_dept = ""
      this.updataFormInline.user_org = ""
      this.updataFormInline.outCompanyId = ""

    },
    // 获取黑名单数据
    getblackdata (val) {
      let postdata = {
        'pageNo': -1,
        'gspw_archives.archives_name': '',
        'gspw_archives.user_type': '',
        'blackType': 1
      }
      this.resetForm('formInline')
      if(val) {
         this.searchBlackdata(postdata)
         this.blocknumber = this.blocknumber - 1
      }else {
         this.getData()
         this.blocknumber = this.blocknumber + 1
      }
    },
    searchBlackdatas () {
       let postdata = {
        'pageNo': -1,
        'gspw_archives.archives_name': this.formInline.name,
        'gspw_archives.user_type': this.formInline.user_type,
        'blackType': 1
      }
      this.searchBlackdata(postdata)
    },
    // 查询所在施工项目组
    async QueryUserTeam (user_type, userDeptNo) {
       let postdata = {
         'userType': user_type,
          'userDeptNo': userDeptNo,
       }
       let resdata = await queryUserTeam (postdata)
       this.saveFormInline.default.tIds = resdata.data
       console.log('查询所在施工项目组')
       console.log(resdata)
    },
    // 按条件查询黑名单数据
    async searchBlackdata (postdata) {
       let that = this
       this.loading = true
       this.pagesb = false
       let data = await queryBlackPeople(postdata)
       let adata = data.data.gspw_archives
         that.olddata = adata
         that.newdata = adata
         const tableDatas = that._.chunk(that.olddata, that.pageSize)
         that.tableDatas = tableDatas
         that.tableData = tableDatas[0]
          that.loading = false
          that.curpages = 1
           this.pagesb = true
    },
    search (pageNo = 1, pageSize = 10) {
       const that = this
       this.loading = true
       this.pagesb = false
       let Code = this.formInline.Code === "123" ? '' : this.formInline.Code
       if(this.formInline.user_orgCode === "") {
         Code = this.user_orgCode
       }else if(Code == "") {
         Code = this.formInline.user_orgCode
       }
       console.log(this.formInline.Code)
       const postData = {
         'gspw_archives.archives_name': this.formInline.name,
         'gspw_archives.idCard': this.formInline.idCard,
         'gspw_archives.user_type': this.formInline.user_type,
         'gspw_archives.archives_test_state': this.formInline.archives_test_state,
         'gspw_archives.archives_insurance_state': this.formInline.archives_insurance_state,
          'userOrg': Code,
          "userType": 1,          
          'pageNo': pageNo,
          'pageSize': pageSize
       }
       that.$axios({
         method: 'post',
         url: 'GSPdwPC/ArchivesAction!queryByAhInfo.action',
         data: JSON.stringify(postData)
       }).then((data) => {
          const adata = data.data.data.gspw_archives
         that.pagesNum = data.data.data.total
        //  that.olddata = adata
        //  that.newdata = adata
         
        //  const tableDatas = that._.chunk(that.olddata, that.pageSize)
        //  that.tableDatas = tableDatas
         that.tableData = adata
          that.loading = false
          that.curpages = pageNo
           this.pagesb = true
       })
       .catch((err) => {

       })
    }
  },
  computed: {
    activation () {
       const type = [ localStorage.getItem('user_type') ]
       return hasOneOf(['业主'], type)
     },
     roleP () {
       const type = [ localStorage.getItem('user_type') ]
       return hasOneOf(['业主', '省公司管理' , '市公司管理'], type)
     },
     roleP1 () {
       const type = [ localStorage.getItem('user_type') ]
       return hasOneOf(['省公司管理' , '市公司管理'], this.user_type)
     },
     blackroleP () {
       const type = [localStorage.getItem('user_type')]
       if(hasOneOf(['省公司管理'], type)) {
          this.blocknumber = this.blocknumber + 1
       }
       return hasOneOf(['省公司管理'], type)
     },
    // pagesNum () {
    //   return this.newdata.length
    // },
    // getRrData () {

    //    return this.addFormInline.archives_age + this.addFormInline.archives_sex + this.addFormInline.archives_certificate_number
    // },
    // 新增二维码
     getsaveRrData () {
       let code = this.saveFormInline.archives_name + this.saveFormInline.archives_sex + this.saveFormInline.user_workCode
       this.saveFormInline.archives_code = code
       return code

     },
      // 编辑二维码
     getlookRrData () {
       let code = this.updataFormInline.archives_name + this.updataFormInline.archives_sex + this.updataFormInline.user_workCode
       this.updataFormInline.archives_code = code
       return code

     },
    // 登录者的所属公司
    user_placeCode () {
      return this.$store.state.user.userlists[0].user_placeCode
    },
     // 登录者的公司代码
    user_orgCode () {
      return this.$store.state.user.userlists[0].user_orgCode
    },
    // 登录者的公司
    user_orgname () {
      return this.$store.state.user.userlists[0].user_org
    },
    // 登录者的工号
    user_workCode () {
      return this.$store.state.user.userlists[0].user_workCode
    },
     // 登录者的姓名
    archives_name () {
      return this.$store.state.user.userlists[0].archives_name
    },
    // 登录人的人员类型
    user_type () {
      return this.$store.state.user.usertype
    }
  },
  mounted () {
    this.getData()
    this.searchcompan()
    // this.formInline.Code = this.user_orgCode
    // 查询筛选的所在单位数据

  },
  data() {
    var validatePass = (rule, value, callback) => {
      let reg = /^(?!([a-zA-Z\d]*|[\d!@#\$%_\.]*|[a-zA-Z!@#\$%_\.]*)$)[a-zA-Z\d!@#\$%_\.]{12,16}$/;
     
        console.log(reg.test(value));
        if (!reg.test(value)) {
          return callback(new Error('12位包含字母大小写数字特殊符号'));
        }else {
           callback();
        }
       
    };
    return {
      imageUrl: '',
      idcardimageUrl: '',
      blocknumber: 2,
      pagesb: true,
      busscardVisible: false, // 名片框
      userdatas: {}, // 名片数据
      usermoredatas: [],
      usermoredatasarr: [],
      lookB: true, // 查看无法编辑
      blockDialog: false, // 黑名单弹窗
      blackListreason:'', // 黑名单原因
      formInline: {
        name: '',
        user_org: '',
        user_type: '',
        archives_test_state:'',
        archives_insurance_state: '',
        user_orgCode: '',
        idCard: '',
        Code:'',
        Codes: [],
        user_types: [
          {
          'type': '省公司管理'
          },
          {
          'type': '市公司管理'
          },
          {
          'type': '县公司管理'
          },
          {
          'type': '项目部管理'
          },
          {
            'type': '施工单位管理'
          },
          {
          'type': '业主'
          },
          {
          'type': '施工'
          },
          {
          'type': '监理'
          }
         
        ]

      },
      users: [],
      loading: true,
      multipleSelection:[],
      typeseleb: true,
      addtypeb: true, // 新增禁止选择单位，部门
      updatadisabled: true,
      isBlackListype: false, // 筛选黑名单
      busscardmoreVisible: false,
      updataimagefile:'',
      updataidcardile:'',
       curpages:4,
      updataimagefileName:'',
      updataidcardfileName:'',
      busscardurl: '',
      saveFormInline: {
          archives_name:'',
          archives_sex:'',
          archives_age:'',
          user_org:'',
          user_orgCode:'',
          user_dept:'',
          user_deptCode:'',
          user_type:'',
          archives_insurance_state:'',
          archives_certificate_type:'',
          archives_certificate_number:'',
          archives_test_state:'',
          archives_physical_state:'',
          archives_state:'',
          archives_code:'',
          user_workCode:'',
          password:'',
          imagefile:'',
          imagefileName:'',
          user_placeCode: '',
          user_place: '',
          outCompanyId: '',
          user_subpackage: '',
          userFirstOrgCode: '', // 市单位编码
          userFirstOrg: '',
          phone:'',
          idCard:'',
          userTeamId: '',
          default: {
            conutallorgs: [],
            allorgs: [],
            cityallorgs: [],
            alldepts: [],
            tIds: []
          }
      },
      userTeamId: '',
      userTeamId1: '',
      updataFormInline: {
          niubia:'',
          niubiaxia:'',
          archives_name:'',
          archives_sex:'',
          archives_age:'',
          user_org:'',
          user_orgCode:'',
          user_dept:'',
          user_deptCode:'',
          user_type:'',
          archives_insurance_state:'',
          archives_certificate_type:'',
          archives_certificate_number:'',
          archives_test_state:'',
          archives_physical_state:'',
          archives_state:'',
          archives_code:'',
          user_workCode:'',
          password:'',
          user_placeCode: '',
          user_place: '',
          outCompanyId: '',
          user_subpackage: '',
          userFirstOrgCodeBODY: '', // 市单位编码
          userFirstOrg: '',
          phone:'',
          userTeamId: '',
          idCard:'',
          default: {
            conutallorgs: [],
            allorgs: [],
            cityallorgs: [],
            alldepts: [],
          }
      },
      // 激活
      auths: {
         authBval: '0'
      },
      // 二维码数据
      // getlookRrData: '',
      addFormInline: {
          archives_name:'',
          archives_sex:'',
          archives_age:'',
          user_org:'',
          user_orgCode:'',
          user_dept:'',
          user_deptCode:'',
          user_type:'',
          archives_insurance_state:'',
          archives_certificate_type:'',
          archives_certificate_number:'',
          archives_test_state:'',
          archives_physical_state:'',
          archives_state:'',
          archives_code:'',
          user_workCode:'',
          password:'',
          imagefile:'',
          imagefileName:'',
          idCardFile:'',
          idCardFileName:''
      },
      password: '',
      password1: '',
      allorgs: '',
      alldepts:'',
      tableDatas:[],
      tableData: [],
      pageSize: 10,
      pagesNum: 0,
      saveDialogVisible: false,
      editDialogVisible: false,
      olddata: '',
      newdata: '',
      actstate: 1, // 为0 是修改，1为增加
      updDatapost: '',
      qrvalue: '36男63686',
      qrsize: 200,
      queryOutCompanys: [],
      oldtype: '',
      rules: {
          archives_age: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          archives_certificate_number: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          password: [
             { validator: validatePass, trigger: 'blur' }
          ],
          archives_certificate_type: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          archives_code: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          archives_insurance_state: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          archives_name: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          archives_photo: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          archives_photo_ur: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          archives_physical_state: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          archives_sex: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          archives_state: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          archives_test_state: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          deleteMark: 0,
          departMentInfo: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          idCard: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],

          phone: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          reason: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          userFirstOrg: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          userFirstOrgCode: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          user_dept: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          user_deptCode: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          user_org: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          user_orgCode: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          user_place: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          user_placeCode: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          user_post: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          user_subpackage: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          user_type: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          user_workCode: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ],
          outCompanyId: [
            { required: true, message: '不能为空，请填写', trigger: 'blur' }
          ]
        }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.btngetqr {
  margin-bottom: 20px;
}
.markred {
  color: red;
}
.tablebox {
  // height: 300px;
  background: #fff;
  padding: 10px;
}
.bg {
  background: #efefef;
  height: 100%;
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


// 上传图片
.avatar-uploader {
  border: 1px dashed #333;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .isBlackListype {
    padding: 10px;
    border-bottom: 1px solid #efefef;
  }
   .app-container{
     background: #F0F3FA;
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
   .buttonGroup{
  background: #f6f8fc;
  height: 48px;
  overflow: hidden;
 
}
 .buton{
    float: left;
    margin-left: 20px;
    cursor: pointer;
    margin-top: 18px;
  }
  .buttext{
    display: inline-block;
    margin-left: 5px;
  }
</style>

