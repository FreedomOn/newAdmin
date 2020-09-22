
<template>
  <div class="app-container bg">
    <!-- 案例学习 -->
    <!-- 筛选数据 -->
      <div class="downbox" v-show="roleP">
        <h2>上传文件</h2>
        <el-upload
  class="upload-demo"
  ref="upload"
  name="file"
  :limit="limit"
  :auto-upload="false"
  action="GSPdwPC/auxiliary!exprotExcel.action"
  :file-list = "filelist"
  :on-change="handleChansge">
  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="postfile">上传到服务器</el-button>
  <!-- <div slot="tip" class="el-upload__tip">上传文件只能为excel文件，且为xlsx,xls格式</div> -->
</el-upload>
      </div>
       
       <!-- 表格 -->
       <div class="downbox">
         <el-table
            v-loading="loading"
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            type="index"
            label="序号"
            width="50">
          </el-table-column>
            <el-table-column
              prop="userName"
              label="上传人"
              width="280">
            </el-table-column>
            <el-table-column
              prop="fileName"
              label="文件名">
            </el-table-column>
             <el-table-column label="操作">
                <template slot-scope="scope">
                  <a :href="scope.row.filePath" target="_blank">
                  <el-button
                    size="mini"
                    >查看</el-button></a>
                  <!-- <el-button
                    size="mini"
                    @click="downclick(scope.row)">下载</el-button> -->
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDeletefile(scope.row)" v-show="roleP">删除</el-button>
                </template>
              </el-table-column>
          </el-table>
       </div>
  </div>
</template>

<script>
import {deleteNotice, searchCase} from '@/api/fileimport'
import { hasOneOf } from '@/utils/tools'
import utils from '@/utils/crypto'

export default {
  name: 'case',
  watch: {
   
  },
  components: {
   
  },
  computed: {
    roleP () {
       const type = [ localStorage.getItem('user_type') ]
       return hasOneOf([ '省公司管理', '市公司管理'], type)
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
    }
  },
  mounted() {
    this.findfile()
  },
  methods: {
    // FileAction!queryFile.action
    async findfile () {
       let that  = this
       this.loading = true;
       let posdata = {
         'orgCode': this.user_orgCode
       }
       let res = await searchCase(posdata)
       
           that.tableData = res.data.data
           console.log(res)
           that.loading = false
           this.file = "";
       this.filelist = [];
        
    },
    downclick (e) {
       this.funDownload(e.fileUrl, e.fileName)
    },
    handleDeletefile(id) {
      let that = this;
      that.deleteID = id;
      that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        that.deleteFun();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      }); 
    },
    async deleteFun(){
        let that = this;
        let postdata = {
          noticeId: that.deleteID.id
        };
        console.log(postdata)
        let resdata = await deleteNotice(postdata);
        console.log(resdata.data.message);
        that.findfile();
    },
    handleChansge (file, fileList) {
      console.log(file)
      
      if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG|PDF|pdf)$/.test(file.name)){
        this.filelist = [];
        this.$message.error('上传头像图片只能是 图片 格式和PDF格式!');
        return false
      }
      
      let name = file.name
      let nametype = name.split(".")[1]
      this.file = file.raw
      this.filename = file.name
    },
    funDownload (url, filename) {
      // 创建隐藏的可下载链接
      // window.open(url,'_blank')
      var eleLink = document.createElement('a');
      
      // 字符内容转变成blob地址
      // var blob = new Blob([content]);
      eleLink.href = url
      eleLink.download = filename;
      // eleLink.style.display = 'none';
      // 触发点击
      console.log(eleLink)
      document.body.appendChild(eleLink);
      eleLink.click();
      // 然后移除
      document.body.removeChild(eleLink); 
    },
    postfile () {
      let that = this
      if(this.file == "") {
        that.$notify.error({
              title: '错误',
              message: '上传文件不能为空'
            });
        return false
      }
      let formData = new FormData();
        let posdata = {
          'fileName': this.filename,
          'isCase': 1,
          'userOrg': that.user_orgname,
          'userOrgCode': that.user_orgCode,
          'userWorkcode': that.user_workCode,
          'userName': that.archives_name
        }
        console.log(posdata)
        let data1 = utils.encrypt(JSON.stringify(posdata))
        formData.append('file', this.file);
        formData.append('data', data1);
        
        let url = 'GSPdwPC/NoticeAction!addNotice.action';
        let config = {
          headers:{'Content-Type':'multipart/form-data'}
        };
        this.$axios1.post(url,formData, config).then(function (response) {
          
          let res = JSON.parse(utils.decrypt(response.data))
          that.$notify({
              title: '成功',
              message: res.message,
              type: 'success'
            });
          that.findfile()
        }).catch((err) => {
           console.log(err)
        })


    }
  },
  data() {
    return {
       file: '',
       filename:'',
       limit: 1,
       filelist: [],
       errmesg: [],
       dialogVisible: false,
       tableData: [],
       loading: false,
       deleteID:'',
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.bg {
  background: #efefef;
  height: 100%;
}
.downbox {
  padding:20px;
  margin: 20px;
  background: #fff;
}


// 
.cardbox {
  position: fixed;
  right: 20px;
  bottom: 20px;
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
    clear: both
  }

  .box-card {
    width: 480px;
  }
.card-box-item-message {
  max-height: 400px;
  overflow-y: auto;
}
.app-container{
    position: relative;
    background: #F0F3FA;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
</style>

