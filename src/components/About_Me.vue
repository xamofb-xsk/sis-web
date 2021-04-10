<template>
  <el-main>
    <div class="block" style="width: 600px;text-align: center;margin: 0 auto;">
      <span class="demonstration"></span>
      <el-carousel trigger="click" height="600px" @load="load">
        <el-carousel-item v-for="item in 4" :key="item">
          <el-card class="box-card" style="height: 600px;text-align: center;background-color: #d3dce6">
            <div slot="header" class="clearfix" >
              <span>{{stuname}}</span>
            </div>
            <div class="text item">
              <div style="float: left;text-align:left">姓名:</div>
              <div style="display: inline;text-align:center">{{stuname}}</div>
            </div>
            <div class="text item">
              <div style="float: left;text-align:left">学号:</div>
              <div style="display: inline;text-align:center">{{stunum}}</div>
            </div>
            <div class="text item">
              <div style="float: left;text-align:left">班级:</div>
              <div style="display: inline;text-align:center ">{{stuclass}}</div>
            </div>
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </div>
  </el-main>
</template>


<script>
import { mapGetters } from 'vuex';
export default {
name: "About_Me",
  data() {
    return{
      username: JSON.parse(sessionStorage.getItem('loginUserInfo')),
      stuname: '',
      stunum: '',
      stuclass: ''
    }
},
  computed: {
    ...mapGetters(["loginUserInfo"])
  },
  methods:{
    load (){
      this.$axios.post('/api/aboutme/',{username: this.username})
        .then((res)=>{
          console.log(res)
          console.log(res.data.stunum[0])
          console.log(res.data.stuname[0])
          console.log(res.data.stuclass[0])

          this.stunum = res.data.stunum[0]['stunum']
          this.stuname = res.data.stuname[0]['stuname']
          this.stuclass = res.data.stuclass[0]['stuclass']
          // this.name = res.data.name
        })
    }
  }
  ,
  mounted() {
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
