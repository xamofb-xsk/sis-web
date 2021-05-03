<template>
  <el-container style="height:100%;" class="el-new-main">
   <el-main>
     <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
       <li v-for="(i, id) in id" class="infinite-list-item">
         <el-card class="box-card">
           <div slot="header" class="clearfix">
             <span>{{'文件名: ' + names[id] }}</span>
             <el-button style="float: right; padding: 3px 0" type="text" @click="DeleteFile(i)">删除</el-button>
             <el-button style="float: right; padding: 3px 10px 3px 3px" type="text" @click="Download(i)">下载</el-button>
           </div>
           <div class="text item">
             {{'文件大小: ' + size[id] }}
           </div>
           <div class="text item">
             {{'文件上传时间:' + createTime[id] }}
           </div>
         </el-card>
       </li>
     </ul>
   </el-main>
    <el-footer style="width:200px;height:80px">
      <el-upload class="uploadfile" action="" :http-request='uploadFileMethod' multiple style="padding:3px 3px 10px 3px">
<!--    el-upload：element-ui定义好的文件上传按钮 action="" 必选参数，上传的地址 http-request自定义上传的实现  -->
        <el-button class="custom-btn" size="small">上传</el-button>
      </el-upload>
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
    uploadFileMethod(param) {//上传方法
      const username = this.username;
      let fileObject = param.file; //要上传的文件，通过param传参
      let formData = new FormData(); //创建一个FormData，用于存放文件相关信息
      let name_file = param.file['name']; //用于获取文件名
      let file_size = param.file['size']; //用于获取大小
      formData.append("file", fileObject); //将文件添加到formData里
      formData.append("username", username) //将用户名添加到formData里
      formData.append("filename", name_file)  //将文件名添加到formData里
      formData.append("file_size", file_size) //将文件大小添加到formData里
      this.$axios.post('api/upload/', formData) //发送请求， data是formData
        .then((res) => {
          console.log(res)
          if(res.data.success===true){
            console.log(res.data.success)
            this.load()
          }
        })
    },
    Download(params){
        console.log(params)
      this.$axios.post('/api/download/', {username: this.username, id: params},{responseType:"blob"}) //responseType:"blob" 以二进制传输
          .then((res) =>{
            if(res){
              const content = res.data; //将返回体中的data赋值到content
              const blob = new Blob([content]); //创建一个blob类型实例，实例的内容是content
              const fileName = res.headers['filename']; //获取文件名，无法获取则下载失败
              if("download" in document.createElement("a")){ // 非IE下载
                const elink = document.createElement("a");//创建一个链接
                elink.download = fileName; //设置连接对应的文件
                elink.style.display = "none"; //将连接设为不显示
                elink.href = URL.createObjectURL(blob); //创建下载流
                document.body.appendChild(elink); //在html内添加子dom
                elink.click(); //后台点击下载
                URL.revokeObjectURL(elink); //释放该链接
                document.body.removeChild(elink); //移除该链接
              }else{
                navigator.msSaveBlob(blob, fileName) // 如果是IE下载则弹出下载框
              }
            }
          })
          .catch(()=>{
            this.$message.error("下载失败")
          })
    },
    DeleteFile(param){ //删除文件
        this.$axios.post('/api/delfile/', {username: this.username, id: param})
            .then((res) =>{
              console.log(res)
              if(res.data.success===true){
                console.log(res.data.success)
                this.load()
              }

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

