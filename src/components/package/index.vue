<template>
  <div class="app-container bg">
    <div class="infoselect">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
  <el-form-item label="选择筛选" prop="name">
      <el-select v-model="formInline.name" placeholder="选择筛选条件">
        <el-option label="项目名称"
          value="pack.packProjectName">
        </el-option>
        <el-option label="批次名称"
          value="pack.integratedProject.integratedProjectName">
        </el-option>
        <el-option label="WBS编码"
          value="pack.packProjectWbs">
        </el-option>
      </el-select>
  </el-form-item>
   <el-form-item label="输入" prop="proname">
      <el-input v-model="formInline.proname" placeholder="筛选字"></el-input>
  </el-form-item>
   
  <el-form-item>
    <el-button type="primary" @click="search">查询</el-button>
    <el-button type="primary" @click="resetForm('formInline')">重置</el-button>
  </el-form-item>
</el-form>
    </div>
   <!-- 弹窗 -->



<!-- 弹窗end -->
    <div class = "tablebox">
      <el-table
      :data="tableData"
      v-loading="loading"
      @selection-change="handleSelectionChange"
      style="width: 100%">
       <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="packProjectName"
        label="项目名称"
        >
      </el-table-column>
      
      <el-table-column
        prop="integratedProject.integratedProjectName"
        label="批次名称"
        >
      </el-table-column>
      <el-table-column
        prop="packProjectWbs"
        label="项目WBS编码"
        width="180">
      </el-table-column>
    </el-table>
   
    </div>
     <div class="pagina">
      <el-pagination
      background
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next"
      :page-size="pageSize"
      :total="pagesNum">
    </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
  },

  methods: {
     resetForm(formName) {
      this.$refs[formName].resetFields();
      // console.log(999)
    },
    handleCurrentChange(val) {
    
      const i = val-1
    
      this.tableData = this.tableDatas[i]
    

    },
    handleSelectionChange(val) {
        console.log(val)
        if(val.length > 1) {
          this.$message({
            message: '只能选择一条打包项目',
            type: 'warning'
          });
          // return false
        }
        this.$emit('getprojectname', val)
    },
    search () {
        this.loading = true
       const that = this
       const keyname = this.formInline.name
       const postData = {
        [keyname]: this.formInline.proname,
         'userNo': this.user_workCode
       }
       that.$axios({
         method: 'post',
         url: 'GSPdwPC/PackProjectAction!queryScreenPackPRoject.action',
         data: JSON.stringify(postData)
       }).then((data) => {
         console.log('查询所有的批次信息')
          const adata = data.data.data.list
          // console.log(adata)
          
          // console.log(tableDatas)
          that.newdata = adata
          const tableDatas = that._.chunk(adata, that.pageSize)
          that.tableDatas = tableDatas
          that.tableData = tableDatas[0]
           that.loading = false
          // console.log(that.tableData)
       })
       .catch((err) => {

       })
    }
  },
  computed: {
    pagesNum () {
      // console.log('页码')
      // console.log(this.newdata.length)
      return this.newdata.length
    },
    user_workCode () {
      return this.$store.state.user.userlists[0].user_workCode
    }
  },
  mounted () {
    
  },
  data() {
    return {
      loading: false,
      formInline: {
        name: '',
        proname: ''
      },
      tableDatas:[],
      tableData: [],
      pageSize: 10,
      addDialogVisible: false,
      olddata: '',
      newdata: '',
      deleDialogVisible:false,
      deleData: '',
      popupData: {
        'mesg': '新增打包',
        'type': 1 // 新增为1，更新为2
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.markred {
  color: red;
}
.tablebox {
  // height: 360px;
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
.add-input .el-input__inner{
  width: 230px;
}
.add-infoselsect .el-form-item__label {
  width: 200px
}
.add-form-div {
  display: flex;
  padding-bottom: 20px;
  .tit {
     width: 80px;
  }
  .input {
      flex: 1
  }
  .flex1 {
    flex: 1
  }
}

</style>