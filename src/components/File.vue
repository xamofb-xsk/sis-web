<template>
  <el-container style="height:100%;" class="el-new-main">
    <el-header><el-upload class="uploadfile" action="" :http-request='uploadFileMethod' :show-file-list="false" multiple>
      <el-button class="custom-btn" size="small">上传</el-button>
    </el-upload></el-header>
   <el-main>
     <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
       <li v-for="i in count" class="infinite-list-item">
         <el-card class="box-card">
           <div slot="header" class="clearfix">
             <span>{{'文件名: ' + names[i - 1] }}</span>
             <el-button style="float: right; padding: 3px 0" type="text">删除</el-button>
<!--             <el-button style="float: right; padding: 3px 10px 3px 3px" type="text" @click="Download(i)">下载</el-button>-->
             <el-button style="float: right; padding: 3px 10px 3px 3px" type="text" @click="Download(i)">下载</el-button>
           </div>
           <div class="text item">
             {{'文件大小: ' + size[i - 1] }}
           </div>
           <div class="text item">
             {{'文件上传时间:' + createTime[i - 1] }}
           </div>
         </el-card>

       </li>
     </ul>
   </el-main>
    <el-footer style="width:200px;">
      <el-progress :text-inside="false" :stroke-width="10" :percentage="use" :show-text="false"></el-progress>
      <el-breadcrumb separator="/" style="margin-top: 5px;font-size: 12px;">
        <el-breadcrumb-item>{{usesize}}</el-breadcrumb-item>
        <el-breadcrumb-item>500M</el-breadcrumb-item>
      </el-breadcrumb>
    </el-footer>
  </el-container>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "File",

  data(){
    return {
      username : JSON.parse(sessionStorage.getItem('loginUserInfo')),
      dialogAddFile: false,
      addArr: [],
      count: 0,
      names: [],
      size: [],
      createTime: [],
      use: 0,
      usesize: 0,
      currentRowObject: [],
      id: []
    }
  }, computed: {
    ...mapGetters(["loginUserInfo"])
  }
,
  methods: {
      load (){
        this.$axios.post('/api/showdata/', {username: this.username}).then((res) =>{
        console.log(res)
          this.count = res.data.count;
          this.names = res.data.name;
          this.size = res.data.size;
          this.createTime = res.data.createtime;
          this.id = res.data.id
        })
    },
    uploadFileMethod(param) {
      const username = this.username;
      let fileObject = param.file;
      let formData = new FormData();
      let name_file = param.file['name'];
      console.log(param.file['size'])
      let file_size = param.file['size'];
      formData.append("file", fileObject);
      formData.append("username", username)
      formData.append("filename", name_file)
      formData.append("file_size", file_size)
      this.$axios.post('api/upload/', formData)
        .then((res) => {
          console.log(res)
        })
    },
    Download(params){
        console.log(params)
      this.$axios.post('/api/download/', {username: this.username, id: params},{responseType:"blob"})
          .then((res) =>{
            console.log(res)
            if(res){
              console.log("download===", res);
              const content = res.data;
              const blob = new Blob([content]);
              const fileName = res.headers['filename']; //获取文件名，无法获取则下载失败
              if("download" in document.createElement("a")){
                const elink = document.createElement("a");
                elink.download = fileName;
                elink.style.display = "none";
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                URL.revokeObjectURL(elink);
                document.body.removeChild(elink);
              }else{
                navigator.msSaveBlob(blob, fileName)
              }
            }
          })
          .catch(()=>{
            this.$message.error("下载失败")
          })
    }
  }}


</script>

<style scoped>
.el-menu{
  background-color:  #f7f7f7;
  border: 0;

  /*text-align: center;*/
}
.item{
  color:#424e67;
  font-size: 14px;
}
.el-new-main{
  padding: 0;
}
.el-progress-bar__outer{

}
</style>

