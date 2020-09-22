
<template>
  <div class="page">
     <div class="uploadbox">
       <el-upload
        class="upload-demo"
        ref="upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-change="handlechange"
        :on-exceed="handleexceed"
        :file-list="fileList"
        :limit="form.limit"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="uploadimg">上传到服务器</el-button>
        <!-- <a :href="fileprops.href" download="导入模板.xlsx"> -->
          <el-button style="margin-left: 10px;" size="small" type="info" @click="UserExport()">模板导出</el-button>
         <!-- </a> -->
        <div slot="tip" class="el-upload__tip">先下载模板，按照模板填写信息</div>
      </el-upload>
     </div>
     <!-- 导入结果 -->
     <div class="cardbox" v-show="cardboxb">
         <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>表格导入结果</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="cardboxb = false">关闭</el-button>
            </div>
            <div v-for="(o,index) in carmessg" :key="index" class="text item">
                <span class="linespan"> {{  o.message }} </span><br>
            </div>
            </el-card>
     </div>
  </div>
</template>

<script>
import utils from '@/utils/crypto'

  export default {
    props: ['fileprops', 'postdataprops'],
    data () {
      return {
        fileList: [],
        form: {
          files: '', 
          fileName: '',
          fileLists: [],
          limit: 1
        },
        carmessg: [],
        cardboxb: false
      }
    },
    components: {

    },
    computed: {
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
    methods: {
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

      
       const postData = {
         "type": this.fileprops.type
       }
       let data1 = utils.encrypt(JSON.stringify(postData))
       this.$axios1({
         method: 'post',
         url:'GSPdwPC/CustomAction!download.action',
         data: that.qs.stringify({'data': data1}),
         responseType: 'blob'
       }).then((response) => {
          let url = window.URL.createObjectURL(response.data);
                console.log(url)
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.href = url;
                a.download = this.fileprops.name;
                a.click();
                window.URL.revokeObjectURL(url);
       }).catch((err)=> {
         console.log(err)
       })
      //  this.busscardmoreVisible = true;

      //  this.usermoredatas = this.usermoredatasarr
     },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.getfilelist(fileList)
      },
      handlechange(file, fileList) {
        console.log(file, fileList);
        let name = file.name
        let nametype = name.split(".")[1]
        let  reg = /^.*\.(?:xls|xlsx)$/i;//文件名可以带空格
        if (!reg.test(file.name)) {
            this.$notify.error({
                title: '错误',
                message: '上传文件只能为excel文件，且为xlsx,xls格式'
                });
            this.fileList = []
            // this.file = ""
            return false
        }
        this.getfilelist(fileList)
      },
      handlePreview(file) {
        console.log(file);
      },
       uploadimg () {
          let that  = this
          console.log(this.form.fileLists)
          if(this.form.fileLists.length == 0) {
            this.$message({
              message: '警告, 文件不能为空',
              type: 'warning'
            });
            return false
          }
          let formData = new FormData();
          let postdata = {
            "filename": this.form.fileLists[0].name
           
          }
          let obj = Object.assign(that.postdataprops, postdata)
          //  this.form.fileLists.forEach(element => {
             
            formData.append('data', utils.encrypt(JSON.stringify(obj)))
            formData.append('file',this.form.fileLists[0].raw)
            // });
            let url = this.fileprops.url
             that.$axios1({
              method: 'post',
              url: url,
              data: formData,
              headers:{'Content-Type':'multipart/form-data'}
            }).then(function (res) {
              console.log(res)
              let response = JSON.parse(utils.decrypt(res.data))
              that.carmessg = response
              that.cardboxb = true
            //   that.tipMesg(response.data)
              // if(response.data.result == "true") {
              //   that.dialogVisible = false
              // }
            }).catch((err) => {
                console.log(err)
                that.$notify.error({
                  title: '错误',
                  message: '上传过程出错啦'
                });
            })
      },
      handleexceed (file) {
        this.$message({
          message: '超出上传文件数量限制，只能上传1个文件',
          type: 'warning'
        });
      },
      tipMesg (res) {
        if(res.result == 'true') {
        this.$notify({
            title: '成功',
            message: res.message,
            type: 'success'
        });
             this.getdata()
        }else {
            this.$notify.error({
            title: '错误',
            message: res.message
        });
            this.getdata()
        }
      },
      getfilelist (fileList) {
        this.form.fileLists = fileList

      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.uploadbox {
   padding: 20px;
   background: #fff;
   margin-bottom: 20px;
   overflow: hidden;
   .imgbox {
     width: 15%;
     height: 200px;
     overflow: hidden;
     float: left;
     margin: 10px;
     background: #efefef;
     img {
       width: 100%;
     }
   }
 }
 .cardbox {
    position: fixed;
    right: 50px;
    bottom: 50px;
    z-index: 9999;
    width: 500px;
    .linespan {
        line-height: 20px;
    }
 }
 .box-card {
     max-height: 400px;
     overflow-y: auto;
 }
</style>
