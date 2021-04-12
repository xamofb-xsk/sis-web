<template>
  <el-main>
    <div class="block" style="width: 600px;text-align: center;margin: 0 auto;">
      <span class="demonstration"></span>
      <el-carousel trigger="click" height="600px" @load="load">
        <el-carousel-item v-for="item in count1" :key="item">
          <el-card class="box-card" style="height: 600px;text-align: center;background-color: #d3dce6">
            <div slot="header" class="clearfix" >
              <span>{{row0[item - 1]}}</span>
            </div>
            <div class="text item">
              <div style="float: left;text-align:left">{{row1[item - 1]}}</div>
              <div style="display: inline;text-align:center">{{row1_1[item - 1]}}</div>
            </div>
            <div class="text item">
              <div style="float: left;text-align:left">{{row2[item - 1]}}</div>
              <div style="display: inline;text-align:center">{{row2_1[item - 1]}}</div>
            </div>
            <div class="text item">
              <div style="float: left;text-align:left">{{row3[item - 1]}}</div>
              <div style="display: inline;text-align:center ">{{row3_1[item - 1]}}</div>
            </div>
          </el-card>
        </el-carousel-item>
      </el-carousel>
    </div>
  </el-main>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
name: "Schedule",
  data() {
  return {
    username: JSON.parse(sessionStorage.getItem('loginUserInfo')),
    row1_1: [],
    row2_1: [],
    row3_1: [],
    row1: ['姓名:', '语文:'],
    row2: ['学号:', '数学:'],
    row3: ['班级:', '英语:'],
    row0: ['姓名', '分数'],
    count1: 3,
  }
  },
  computed:{
    ...mapGetters(["loginUserInfo"])
  }
,
  methods: {
  load(){
    this.$axios.post('/api/schedule/', {username: this.username})
        .then((res)=>{
          console.log(res)
          this.course = res.data['class']
          this.class_one = res.data['class_one']
          console.log('class_one' + this.class_one)
          console.log(this.course)
          // this.course[1] = res.data['class_two']
        })
  }
},
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
