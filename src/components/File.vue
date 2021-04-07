<template>
  <el-container style="height:100%;" class="el-new-main">
    <el-header><el-button @click="load">获取</el-button></el-header>
   <el-main>
     <el-table
       :data="tableData"
       style="width:100%;">
       <el-table-column
         prop="name"
         label="Name"
         width="180">
       </el-table-column>
     <el-table-column
       prop="size"
       label="大小"
       width="180">
     </el-table-column>
       <el-table-column
         prop="createTime"
         label="上传时间"
         width="180">
       </el-table-column>

     </el-table>
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
export default {
  name: "File",
  data(){
    return {
      name:'',
      size:'',
      createTime:'',
      tableData:[],
      use:0,
      usesize:'0'
    }
  },

  methods:{
    load (){
      this.$axios.post('/api/test/', ).then((res) =>{
      console.log(res)
        this.name = res.data.name;
        this.size = res.data.size;
        this.createTime = res.data.createtime;
      })
  }}}

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

