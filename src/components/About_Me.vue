<template>
  <el-main>
    <div class="block" style="width: 600px;text-align: center;margin: 0 auto;">
      <span class="demonstration"></span>
      <el-carousel trigger="click" height="600px" @load="load"><!--        // 可滚动卡片UI，@load=加载数据的方法-->
        <el-carousel-item><!--          // 可滚动卡片UI的实例-->
          <el-card class="box-card" style="height: 600px;text-align: center;background-color: #d3dce6">
            <div slot="header" class="clearfix" >
<!--              //slot 内容分发插槽-->
              <span>学生基本信息</span>
            </div>
            <div class="text item">
              <div style="float: left;text-align:left">姓名</div>
              <div style="display: inline;text-align:center">{{name}}</div>
            </div>
            <div class="text item">
              <div style="float: left;text-align:left">学号</div>
              <div style="display: inline;text-align:center">{{num}}</div>
            </div>
            <div class="text item">
              <div style="float: left;text-align:left">班级</div>
              <div style="display: inline;text-align:center ">{{class_name}}</div>
            </div>
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </div>
  </el-main>
</template>


<script>
import { mapGetters } from 'vuex'; // 从vuex库中加载mapGetters方法，用来加载保存在本地的用户名
export default {
name: "About_Me", // 本页面名称
  data() { //用于初始化变量
    return{
      username: JSON.parse(sessionStorage.getItem('loginUserInfo')), // JSON.parse() 转化为JSON对象的方法， sessionStorage.getItem() 获取键为'loginUserInfo'的保存在本地的session值
      name: '',
      num: '',
      class_name: '',
      count1: 1
    }
},
  computed: { // 用来监控自己定义的变量
    ...mapGetters(["loginUserInfo"]) // 用于获取loginUserInfo的状态/值
  },
  methods:{ //方法
    load (){
      this.$axios.post('/api/aboutme/',{username: this.username}) //通过post的方法请求个人信息
        .then((res)=>{ //当网页请求完后执行
          this.num = res.data.stunum[0]['stunum']
          this.name = res.data.stuname[0]['stuname']
          this.class_name = res.data.stuclass[0]['stuclass']
        })
    }
  }
  ,
  mounted() {// 访问页面时，首先同时加载里面的方法
    this.load()
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
