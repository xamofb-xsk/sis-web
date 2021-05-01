<template>
  <div >
    <el-header>
      <el-form :model="form" ref="form">
        <el-form-item>
          <el-col :span="6" label="活动名称">
            <el-input v-model="form.name" placeholder="活动名称">
            </el-input>
          </el-col>
          <el-col :span="6" label="发布人">
            <el-input v-model="form.user" placeholder="发布人">
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-select v-model="value" placeholder="请选择类型">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-button @click="submit">查询</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <ul class="infinite-list" v-infinite-scroll="" style="overflow:auto">
        <li v-for="(key, index) in count" class="infinite-list-item">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{'活动名称: ' + notice[index]['actname'] }}</span>
<!--              <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
            </div>
            <div class="text item">
              {{'活动等级: ' + notice[index]['level'] }}
            </div>
            <div class="text item">
              {{'活动详情: \n' + notice[index]['info'] }}
            </div>
          </el-card>
        </li>
      </ul>

    </el-main>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
name: "Notice_get",
  data () {
    return {
      count: 0,
      counts: 0,
      name: 0,
      info: 0,
      level: 0,
      username : JSON.parse(sessionStorage.getItem('loginUserInfo')),
      form: {
        name: '',
        user: '',
        data: '',
      },
      options: [{
        value: '班级',
        label: '班级'
      },
        {
          value: '年级',
          label: '年级'
        },
        {
          value: '学院',
          label: '学院'
        }],
      value: '',
      notice: []
    }
  },computed: {
    ...mapGetters(["loginUserInfo"])
  }
  ,
  mounted () {
    this.userInfo = this.loginUserInfo
    this.load()
  }
  ,
  methods:{
    load () {
      this.$axios.post('/api/allnotice/', {username: this.username})
        .then((res) =>{
            console.log(res)
            if(res.data.code === 200){
              // console.log(res.data.notice[0]['actname'])
              this.notice = res.data.notice
              this.count = res.data.counts
              // 读取到的数据做成卡片形式发送到无限滚动
            }
        })
        },
    // load () {
    //   if (this.count < this.counts){
    //     this.count += 1
    //     // alert(this.counts)
    //   }
    // },
    submit(){
      // if(this.value===''){
      //   alert('请选择级别')
      // }else{
        this.$axios.post('/api/getnotice/', {username: this.username, level: this.value, user: this.form.user,  name: this.form.name})
          .then((res) =>{
            console.log(res)
            if(res.data.code === 200){
              if(res.data.msg === "没有这个活动"){
                alert('未能查找到此活动')
              }
              this.notice = res.data.notice
              this.count = res.data.counts
              // 读取到的数据做成卡片形式发送到无限滚动
            }
          })
      }
    },

  // }
}
</script>

<style scoped>

</style>
