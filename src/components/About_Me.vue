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
import { mapGetters } from 'vuex';
export default {
name: "About_Me",
  data() {
    return{
      username: JSON.parse(sessionStorage.getItem('loginUserInfo')),
      row1_1: [],
      row2_1: [],
      row3_1: [],
      row1: ['姓名:', '语文:'],
      row2: ['学号:', '数学:'],
      row3: ['班级:', '英语:'],
      row0: ['姓名', '分数'],
      count1: 0,
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
          this.count1 = res.data.count1
          this.row1_1[0] = res.data.stunum[0]['stunum']
          console.log(this.row1_1)
          this.row1_1[1] = res.data.chinese[0]['chinese']
          this.row2_1[0] = res.data.math[0]['math']
          this.row2_1[1] = res.data.stunum[0]['stunum']
          this.row3_1[0] = res.data.stuclass[0]['stuclass']
          this.row3_1[1] = res.data.english[0]['english']
          this.row0[1] = res.data.semester[0]['semester']
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
