<!--
 * @LastEditors: 招聘动态
 -->
<template>
  <div class="app-container bg" v-loading="allLoading" element-loading-text="招聘需求导出中,请稍后...">
    <div class="infoselect">
      <el-form :inline="true" :model="formInline" ref="formInline">
        <el-form-item label="一级部门:" prop="oneDepartment">
          <el-input v-model="formInline.oneDepartment"></el-input>
        </el-form-item>
        <el-form-item label="二级部门:" prop="twoDepartment">
          <el-input v-model="formInline.twoDepartment"></el-input>
        </el-form-item>
        <el-form-item label="岗位:" prop="post">
          <el-input v-model="formInline.post"></el-input>
        </el-form-item>
        <el-form-item label="工种类别:" prop="type">
          <el-select v-model="formInline.type" placeholder="请选择">
            <el-option label="小时工 " value="小时工 "></el-option>
            <el-option label="正式工 " value="正式工 "></el-option>
            <el-option label="正式工和小时工 " value="正式工和小时工 "></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">查询</el-button>
          <el-button @click="resetForm('formInline')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 增删改 -->
    <div class="buttonGroup">
      <div @click="saveClick" class="buton" style="display: inline-block">
        <svg-icon icon-class="add"></svg-icon>
        <span class="buttext">新增</span>
      </div>
      <div @click="editClick()" class="buton">
        <svg-icon icon-class="update"></svg-icon>
        <span class="buttext">修改</span>
      </div>
      <div @click="lookClick()" class="buton">
        <svg-icon icon-class="detail"></svg-icon>
        <span class="buttext">详情</span>
      </div>
      <div @click="removeClick()" class="buton" style="display: inline-block">
        <svg-icon icon-class="delete"></svg-icon>
        <span class="buttext">删除</span>
      </div>
      <div @click="UserExportDemo()" class="buton" style="display: inline-block">
        <svg-icon icon-class="plperson"></svg-icon>
        <span class="buttext">导出招聘需求</span>
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
        :span-method="objectSpanMethod"
        :summary-method="getSummaries"
        show-summary
        @selection-change="handleSelectionChange"
        style="width: 100%"
      >
        <!--  -->
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="oneDepartment" label="一级部门" width="120" align="center"></el-table-column>
        <el-table-column prop="twoDepartment" label="二级部门" width="120" align="center"></el-table-column>
        <el-table-column prop="post" label="岗位" width="60" align="center"></el-table-column>
        <el-table-column prop="address" label="工作地点" align="center"></el-table-column>
        <el-table-column prop="number" label="数量" width="60" align="center"></el-table-column>
        <el-table-column prop="type" label="工种类别" width="100" align="center"></el-table-column>
        <el-table-column label="所需条件" align="center">
          <el-table-column prop="sex" label="性别" width="80" align="center"></el-table-column>
          <el-table-column prop="age" label="年龄" width="80" align="center"></el-table-column>
          <el-table-column prop="high" label="身高(cm)" width="80" align="center"></el-table-column>
          <el-table-column prop="weight" label="体重(kg)" width="80" align="center"></el-table-column>
          <el-table-column prop="education" label="学历" width="120" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="任职要求" align="center">
          <el-table-column prop="bigClaim" label="通用要求" width align="center"></el-table-column>
          <el-table-column prop="smallClaim" label="岗位要求" width align="center"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增 -->
    <el-dialog title="新增招聘：" :visible.sync="saveDialogVisible" width="66%">
      <div class="infoselect">
        <el-form :inline="true" :rules="rules" :model="saveFormInline" ref="saveFormInline">
          <el-row>
            <el-col :span="12">
              <el-form-item label="一级部门：" prop="oneDepartment">
                <el-input v-model="saveFormInline.oneDepartment" style="width:300px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="二级部门：" prop="twoDepartment">
                <el-input v-model="saveFormInline.twoDepartment" style="width:300px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="工作地点：" prop="adress">
                <el-input v-model="saveFormInline.adress" style="width:300px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工种类别：" prop="type">
                <el-select v-model="saveFormInline.type" placeholder="请选择" style="width:300px">
                  <el-option label="小时工 " value="小时工 "></el-option>
                  <el-option label="正式工 " value="正式工 "></el-option>
                  <el-option label="正式工和小时工 " value="正式工和小时工 "></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="岗位：" prop="post">
                <el-input v-model="saveFormInline.post" style="width:300px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="数量：" prop="number">
                <el-input v-model="saveFormInline.number" style="width:300px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="年龄：" prop="age">
                <el-input v-model="saveFormInline.age" style="width:300px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别：" prop="sex">
                <el-radio-group v-model="saveFormInline.sex">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="身高：" prop="high">
                <el-input v-model="saveFormInline.high" style="width:300px" placeholder="厘米(cm)"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="体重：" prop="weight">
                <el-input v-model="saveFormInline.weight" style="width:300px" placeholder="公斤(kg)"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="学历：" prop="education">
                <el-select v-model="saveFormInline.education" placeholder="请选择" style="width:300px">
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
            <el-col :span="12">
              <el-form-item label="通用要求：" prop="bigclaim">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输任职必须要满足的条件"
                  v-model="saveFormInline.bigclaim"
                  style="width:300px"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="岗位要求：" prop="smallclaim">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输任职要求"
                v-model="saveFormInline.smallclaim"
                style="width:300px"
              ></el-input>
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
    <el-dialog title="修改招聘：" :visible.sync="editDialogVisible" width="66%">
      <div class="infoselect">
        <el-form :inline="true" :rules="rules" :model="editFormInline" ref="editFormInline">
          <el-row>
            <el-col :span="12">
              <el-form-item label="一级部门：" prop="oneDepartment">
                <el-input v-model="editFormInline.oneDepartment" style="width:300px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="二级部门：" prop="twoDepartment">
                <el-input v-model="editFormInline.twoDepartment" style="width:300px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="工作地点：" prop="adress">
                <el-input v-model="editFormInline.adress" style="width:300px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工种类别：" prop="type">
                <el-select v-model="editFormInline.type" placeholder="请选择" style="width:300px">
                  <el-option label="小时工 " value="小时工 "></el-option>
                  <el-option label="正式工 " value="正式工 "></el-option>
                  <el-option label="正式工和小时工 " value="正式工和小时工 "></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="岗位：" prop="post">
                <el-input v-model="editFormInline.post" style="width:300px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="数量：" prop="number">
                <el-input v-model="editFormInline.number" style="width:300px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="年龄：" prop="age">
                <el-input v-model="editFormInline.age" style="width:300px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别：" prop="sex">
                <el-radio-group v-model="editFormInline.sex">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="身高：" prop="high">
                <el-input v-model="editFormInline.high" style="width:300px"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="体重：" prop="weight">
                <el-input v-model="editFormInline.weight" style="width:300px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="学历：" prop="education">
                <el-select v-model="editFormInline.education" placeholder="请选择" style="width:300px">
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
            <el-col :span="12">
              <el-form-item label="通用要求：" prop="bigclaim">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输任职必须要满足的条件"
                  v-model="editFormInline.bigclaim"
                  style="width:300px"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="岗位要求：" prop="smallclaim">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输任职要求"
                v-model="editFormInline.smallclaim"
                style="width:300px"
              ></el-input>
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
    <el-dialog title="招聘详情：" :visible.sync="detailDialogVisible" width="66%">
      <div class="infoselect">
        <el-form :inline="true"  :model="saveFormInline" ref="saveFormInline">
          <el-row>
            <el-col :span="12">
              <el-form-item label="一级部门：" prop="oneDepartment">
                {{detailFormInline.oneDepartment}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="二级部门：" prop="twoDepartment">
                 {{detailFormInline.twoDepartment}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="工作地点：" prop="adress">
                  {{detailFormInline.adress}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工种类别：" prop="type">
                  {{detailFormInline.type}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="岗位：" prop="post">
                  {{detailFormInline.post}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="数量：" prop="number">
                    {{detailFormInline.number}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="年龄：" prop="age">
                  {{detailFormInline.age}}岁
               
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别：" prop="sex">
                 {{detailFormInline.sex}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="身高：" prop="high">
                  {{detailFormInline.high}}cm
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="体重：" prop="weight">
                {{detailFormInline.weight}}kg
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="学历：" prop="education">
                  {{detailFormInline.education}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="通用要求：" prop="bigclaim">
                 {{detailFormInline.bigclaim}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="岗位要求：" prop="smallclaim">
              {{detailFormInline.smallclaim}}
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  seachData,
  addRecruit,
  updateRecruit,
  deleteRecruit,
} from "@/api/recruitmentNews";
export default {
  data() {
    return {
      formInline: {
        oneDepartment: "",
        twoDepartment: "",
        post: "",
        type: "",
      },
      loading: true,
      multipleSelection: [],
      tableData: [],
      pageSize: 10,
      totalnum: 0,
      curpages: 1,
      allLoading: false,
      sumNumber: "",
      testArr1: [], //一级部门
      testArr2: [], //二级部门
      testArr3: [], //通用要求
      testArr4: [], //岗位要求
      testPosition1: 0,
      testPosition2: 0,
      testPosition3: 0,
      testPosition4: 0,
      saveDialogVisible: false,
      editDialogVisible: false,
      detailDialogVisible: false,
      saveFormInline: {
        oneDepartment: "",
        twoDepartment: "",
        post: "",
        adress: "",
        number: "",
        type: "",
        sex: "",
        age: "",
        high: "",
        weight: "",
        education: "",
        bigclaim: "",
        smallclaim: "",
      },
      editFormInline: {
        oneDepartment: "",
        twoDepartment: "",
        post: "",
        adress: "",
        number: "",
        type: "",
        sex: "",
        age: "",
        high: "",
        weight: "",
        education: "",
        bigclaim: "",
        smallclaim: "",
        uuid: "",
      },
      detailFormInline: {
        oneDepartment: "",
        twoDepartment: "",
        post: "",
        adress: "",
        number: "",
        type: "",
        sex: "",
        age: "",
        high: "",
        weight: "",
        education: "",
        bigclaim: "",
        smallclaim: "",
      },
      rules: {
        oneDepartment: [
          { required: true, trigger: "blur", message: "一级部门不能为空" },
        ],
        twoDepartment: [
          { required: true, message: "二级部门不能为空", trigger: "blur" },
        ],
        post: [{ required: true, trigger: "blur", message: "岗位不能为空" }],
        number: [
          { required: true, trigger: "blur", message: "数量不能为空" },
          {
            pattern: /^[-+]?(([0-9]+)([.]([0-9]+))?|([.]([0-9]+))?)$/,
            message: "请输入数字",
          },
        ],
        adress: [
          { required: true, trigger: "blur", message: "工作地点不能为空" },
        ],
        type: [
          { required: true, trigger: "change", message: "请选择工种类别" },
        ],

        sex: [{ required: true, trigger: "change", message: "请选择性别" }],
        age: [
          { required: true, trigger: "blur", message: "请输入年龄" },
          {
            pattern: /^[-+]?(([0-9]+)([.]([0-9]+))?|([.]([0-9]+))?)$/,
            message: "请输入数字",
          },
        ],
        high: [{ required: true, trigger: "blur", message: "身高不能为空" }],
        weight: [{ required: true, trigger: "blur", message: "体重不能为空" }],
        education: [
          { required: true, trigger: "change", message: "请选择学历" },
        ],
        bigclaim: [
          { required: true, trigger: "blur", message: "任职要求不能为空" },
        ],
        smallclaim: [
          { required: true, trigger: "blur", message: "任职要求不能为空" },
        ],
      },
    };
  },
  computed:{},
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
    rowspan(spanArr, position, spanName) {
      // console.log(1111, "111111");
      // console.log(this.tableData);
      this.tableData.forEach((item, index) => {
        if (index === 0) {
          spanArr.push(1);
          position = 0;
        } else {
          if (
            this.tableData[index][spanName] ===
            this.tableData[index - 1][spanName]
          ) {
            spanArr[position] += 1;
            spanArr.push(0);
          } else {
            spanArr.push(1);
            position = index;
          }
        }
      });
    },
    // 表格合并
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // console.log(rowIndex,'rowIndex')
      // console.log(columnIndex,'columnIndex')
      // if (columnIndex === 1) {
      //   const _row = this.testArr1[rowIndex];
      //   const _col = _row > 0 ? 1 : 0;
      //   console.log(_row, _col, "row col");
      //   return {
      //     rowspan: _row,
      //     colspan: _col,
      //   };
      // }
      // if (columnIndex === 2) {
      //   const _row = this.testArr2[rowIndex];
      //   const _col = _row > 0 ? 1 : 0;
      //   return {
      //     rowspan: _row,
      //     colspan: _col,
      //   };
      // }
      // if (columnIndex === 12) {
      //   const _row = this.testArr3[rowIndex];
      //   const _col = _row > 0 ? 1 : 0;
      //   return {
      //     rowspan: _row,
      //     colspan: _col,
      //   };
      // }
      // if (columnIndex === 13) {
      //   const _row = this.testArr4[rowIndex];
      //   const _col = _row > 0 ? 1 : 0;
      //   return {
      //     rowspan: _row,
      //     colspan: _col,
      //   };
      // }
    },
    // 表格统计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      // console.log(columns, data, "columns,data");
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
        }
        // index >= 3 || index <= 11 是你需要计算的列
        // 当然也可以指定一个或者多个列
        // index === 2 || index === 3 这样值求和第二个与第三个列
        else if (index === 5) {
          const values = data.map((item) => Number(item[column.property]));
          if (!values.every((value) => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              }
            }, 0);
          }
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },
    // 新增
    saveClick() {
      let that = this;
      that.saveDialogVisible = true;
    },
    resetaddForm() {
      this.saveDialogVisible = false;
      this.editDialogVisible = false;
    },
    // 重置新增表单
    resetaddsaveForm(formName) {
      this.$refs[formName].resetFields();
    },
    addSaveFrom(formName) {
      console.log(this.saveFormInline);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addSaveFrom1();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async addSaveFrom1() {
      let that = this;
      let postdata = {
        address: that.saveFormInline.adress,
        age: that.saveFormInline.age,
        bigClaim: that.saveFormInline.bigclaim,
        education: that.saveFormInline.education,
        high: that.saveFormInline.high,
        number: that.saveFormInline.number,
        oneDepartment: that.saveFormInline.oneDepartment,
        post: that.saveFormInline.post,
        sex: that.saveFormInline.sex,
        smallClaim: that.saveFormInline.smallclaim,
        twoDepartment: that.saveFormInline.twoDepartment,
        type: that.saveFormInline.type,
        weight: that.saveFormInline.weight,
      };
      console.log(postdata);
      let result = await addRecruit(postdata);
      console.log(result);
      if (result.resultStatus == "000000") {
        that.saveDialogVisible = false;
        that.$notify({
          title: "成功",
          message: result.message,
          type: "success",
        });
        that.search();
        that.$refs.saveFormInline.resetFields();
      } else {
        that.$notify.error({
          title: "错误",
          message: result.message,
        });
      }
    },
    // 详情
    lookClick() {
      let that = this;
      if (
        that.multipleSelection.length > 1 ||
        that.multipleSelection.length === 0
      ) {
        that.$message({
          showClose: true,
          message: "警告哦，请只选择一条数据进行查看详情",
          type: "warning",
        });
        return false;
      }
      let e = that.multipleSelection[0];
      console.log(e)
      that.detailDialogVisible = true;
      that.detailFormInline.oneDepartment = e.oneDepartment;
      that.detailFormInline.twoDepartment = e.twoDepartment;
      that.detailFormInline.post = e.post;
      that.detailFormInline.adress = e.address;
      that.detailFormInline.number = e.number;
      that.detailFormInline.type = e.type;
      that.detailFormInline.sex = e.sex;
      that.detailFormInline.age = e.age;
      that.detailFormInline.high = e.high;
      that.detailFormInline.weight = e.weight;
      that.detailFormInline.education = e.education;
      that.detailFormInline.bigclaim = e.bigClaim;
      that.detailFormInline.smallclaim = e.smallClaim;
    },
    // 修改
    editClick() {
      let that = this;
      if (
        that.multipleSelection.length > 1 ||
        that.multipleSelection.length === 0
      ) {
        that.$message({
          showClose: true,
          message: "警告哦，请只选择一条数据进行修改哦",
          type: "warning",
        });
        return false;
      }
      let e = that.multipleSelection[0];
      that.editDialogVisible = true;
      this.updateClick(e);
    },
    updateClick(e) {
      console.log(e, "eeeee");
      let that = this;
      that.editFormInline.oneDepartment = e.oneDepartment;
      that.editFormInline.twoDepartment = e.twoDepartment;
      that.editFormInline.post = e.post;
      that.editFormInline.adress = e.address;
      that.editFormInline.number = e.number;
      that.editFormInline.type = e.type;
      that.editFormInline.sex = e.sex;
      that.editFormInline.age = e.age;
      that.editFormInline.high = e.high;
      that.editFormInline.weight = e.weight;
      that.editFormInline.education = e.education;
      that.editFormInline.bigclaim = e.bigClaim;
      that.editFormInline.smallclaim = e.smallClaim;
      that.editFormInline.uuid = e.uuid;
    },
    updataFrom(formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.updataFrom1();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async updataFrom1() {
      let that = this;
      let postdata = {
        address: that.editFormInline.adress,
        age: that.editFormInline.age,
        bigClaim: that.editFormInline.bigclaim,
        education: that.editFormInline.education,
        high: that.editFormInline.high,
        number: that.editFormInline.number,
        oneDepartment: that.editFormInline.oneDepartment,
        post: that.editFormInline.post,
        sex: that.editFormInline.sex,
        smallClaim: that.editFormInline.smallclaim,
        twoDepartment: that.editFormInline.twoDepartment,
        type: that.editFormInline.type,
        weight: that.editFormInline.weight,
        uuid: that.editFormInline.uuid,
      };
      console.log(postdata);
      let result = await updateRecruit(postdata);
      console.log(result);
      if (result.resultStatus == "000000") {
        that.editDialogVisible = false;
        that.$notify({
          title: "成功",
          message: result.message,
          type: "success",
        });
        that.search();
      } else {
        that.$notify.error({
          title: "错误",
          message: result.message,
        });
      }
    },
    // 删除
    async removeClickPeople(postData) {
      let that = this;
      let resdata = await deleteRecruit(postData);
      console.log(resdata);
      if (resdata.resultStatus == "000000") {
        that.$notify({
          title: "成功",
          message: "删除成功",
          type: "success",
        });
        that.search();
      } else {
        this.$notify.error({
          title: "错误",
          message: resdata.message,
        });
      }
    },
    removeClick() {
      let that = this;
      if (that.multipleSelection.length === 0) {
        that.$message({
          showClose: true,
          message: "警告哦，请至少选择一条数据进行删除哦",
          type: "warning",
        });
        return false;
      }
      let e = that.multipleSelection;
      console.log(e);
      let newarr = [];
      e.filter((item) => {
        return newarr.push(item.uuid);
      });
      console.log(newarr, "newarr");
      let euuid = newarr.join(",");
      console.log(euuid, "euuid");
      let postdata = {
        uuids: euuid,
      };
      console.log(postdata);
      this.$confirm("此操作将永久删除该招聘, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          that.removeClickPeople(postdata);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 查询
    async search(pageNo = 1, pageSize = 10) {
      let that = this;
      let pstdata = {
        page: pageNo,
        limit: pageSize,
        oneDepartment:
          this.formInline.oneDepartment == ""
            ? null
            : this.formInline.oneDepartment,
        twoDepartment:
          this.formInline.twoDepartment == ""
            ? null
            : this.formInline.twoDepartment,
        post: this.formInline.post == "" ? null : this.formInline.post,
        type: this.formInline.type == "" ? null : this.formInline.type,
      };
      console.log(pstdata);
      let result = await seachData(pstdata);
      console.log(result);
      if (result.resultStatus == "000000") {
        this.tableData = result.data.list;
        // let arr1 =  arr.map((item,index)=>{
        //    console.log(item.high)
        //    item.high =  item.high + 'cm';
        //    item.weight =  item.weight + 'kg';
        //    return item
        // })
        // this.tableData = arr1
        this.sumNumber = result.data.sumNumber;
        that.rowspan(that.testArr1, that.testPosition1, "oneDepartment");
        that.rowspan(that.testArr2, that.testPosition2, "twoDepartment");
        that.rowspan(that.testArr3, that.testPosition3, "bigClaim");
        that.rowspan(that.testArr4, that.testPosition4, "smallClaim");
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
    // 导出招聘需求
    UserExportDemo() {
      console.log("导出招聘需求");
      let that = this;
      that.allLoading = true;
      that
        .$axios1({
          method: "get",
          url: "/api/exportExcelRequirements",
          responseType: "blob",
        })
        .then((res) => {
          console.log(res.data);
          that.allLoading = false;
          let blob = new Blob([res.data], {
            type: res.headers["content-type"],
          });
          let downloadElement = document.createElement("a");
          let href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = "招聘需求" + ".xls"; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 方法
    msgSuccess() {
      this.$notify({
        title: "成功",
        message: "数据查询成功",
        type: "success",
      });
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.tablebox {
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

.app-container {
  background: #f0f3fa;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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
</style>

