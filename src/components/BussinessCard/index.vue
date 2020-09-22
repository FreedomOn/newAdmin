<template>
  <div class="page"> 
     <div ref="busscard" style="height:350px;"> 
        <img class="avarimgurl" :src="'GSPdwPC/ArchivesAction!downloadFile.action?gspw_archives.archives_photo_ur=' + userdata.archives_photo_ur" alt="" style="width:80px;" ref="avatarimg" >
        <div class="qrbox" ref="qrbox">
           <img src="/static/bg/qrbg.jpg" alt="" :onerror="imgerr">
           <div class="avatar">
               <img :src="avatarimgurl" alt="">
           </div>
           <div class="info">
             <div class="low">
                 <div class="left">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</div>
                 <div class="right">{{userdata.archives_name}}</div>
             </div>
              <div class="low">
                 <div class="left">人员类型：</div>
                 <div class="right">{{userdata.user_type}}</div>
             </div>
              <div class="low">
                 <div class="left">工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</div>
                 <div class="right">{{userdata.user_workCode}}</div>
             </div>
              <div class="low">
                 <div class="left">身份证号：</div>
                 <div class="right">{{userdata.idCard}}</div>
             </div>
            
             
              <div class="low">
                 <div class="left">所属单位：</div>
                 <div class="right">{{userdata.user_org}}</div>
             </div>
              <div class="low">
                 <div class="left">所属部门：</div>
                 <div class="right">{{userdata.user_dept}}</div>
             </div>
              <div class="low">
                 <div class="left">岗位职务：</div>
                 <div class="right">{{userdata.user_post}}</div>
             </div>
             
           </div>
           <div class="qrimg">
               <qrcode-vue :value="userdata.archives_code" :size="qrsize" level="H"></qrcode-vue>
           </div>
        </div>
       
     </div>
      <el-button type="primary" @click="downqr">下载</el-button>
      <a :href="url"  :download="userdata.archives_name+ '名片.png'" style="" ref="downaurl"></a>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import html2canvas from 'html2canvas'
  export default {
    props: ['userdata'],
    data () {
      return {
        url:'',
        qrsize: 70,
        avatarimgurl:'',
        imgerr: ''
      }
    },
    components: {
       QrcodeVue
    },
    
    mounted () {
       let that = this
             
            html2canvas(that.$refs.avatarimg).then(function(canvas) {
                    // console.log(canvas.toDataURL()) //将canvas转为base64图片
                    that.avatarimgurl =canvas.toDataURL()   
            });
            this.imgerr = "this.onerror='';this.src='/static/images/avatar3.png'"
    },
    updated () {
      
       let that = this
       html2canvas(that.$refs.avatarimg).then(function(canvas) {
            // console.log(canvas.toDataURL()) //将canvas转为base64图片
            that.avatarimgurl =canvas.toDataURL()
            
       });
    },
    methods: {
        downqr () {
          let that = this
          html2canvas(that.$refs.qrbox).then(function(canvas) {
            console.log(canvas.toDataURL()) //将canvas转为base64图片
            that.url =canvas.toDataURL()
            setTimeout(function() {
                  that.$refs.downaurl.click()
            }, 1000)
          });
        }
       
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@mixin avatar-po () {
  width: 80px;
    position: absolute;
    top: 140px;
    left: 70px;
}

.qrbox {
   width: 500px;
   position: relative;
   height: 300px;
   img {
       width: 100%;
   }
   .avatar {
       @include avatar-po ;
       top: 56px;
       left: 50px;
       img {
           width: 100%;
       }
   }
   .info {
    //    width: 30px;
       position: absolute;
       top: 50px;
       left: 170px;
       font-size: 12px;
       .low {
           display: flex;
           .left {
               width: 64px;
           }
       }
   }
   .qrimg {
       width: 40px;
       position: absolute;
       top: 30px;
       right: 40px;
       img {
           width: 100%;
       }
   }
}
.avarimgurl {
    @include avatar-po ;
    z-index: 999;
}
 
</style>
