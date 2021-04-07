<!--活动查询-->
<template>
<div >
  <el-header>
    <el-form :model="form" ref="form">
      <el-form-item>
        <el-col :span="6" label="活动名称">
          <el-input v-model="form.name" placeholder="活动名称">

          </el-input>
        </el-col>
        <el-col :span="6" label="活动时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.data" style="width: 100%"></el-date-picker>
        </el-col>
        <el-col :span="6" label="发布人">
          <el-input v-model="form.user" placeholder="发布人">

          </el-input>
        </el-col>
        <el-col :span="3">
          <el-select v-model="value" placeholder="请选择级别">
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
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
      <li v-for="i in count" class="infinite-list-item">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{'活动名称: ' + name[i - 1] }}</span>
<!--            <el-button style="float: right; padding: 3px 0"  type="text">操作按钮</el-button>-->
          </div>
          <div class="text item">
            {{'活动时间: ' + date[i - 1] }}
          </div>
          <div class="text item">
            {{'活动等级: ' + level[i - 1] }}
          </div>
          <div class="text item">
            {{'活动时间: ' + local[i - 1] }}
          </div>
          <div class="text item">
            {{'活动类型: ' + type[i - 1] }}
          </div>
          <div class="text item">
            {{'活动详情: \n' + info[i - 1] }}
          </div>
        </el-card>

      </li>
    </ul>

  </el-main>
</div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
name: "ActivityInquire",
  data () {
  return {
    count: 0,
    counts: 0,
    name: 0,
    date: 0,
    info: 0,
    level: 0,
    local: 0,
    type: 0,
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
  }
},computed: {
    ...mapGetters(["loginUserInfo"])
  }
,
  mounted () {
    this.userInfo = this.loginUserInfo
  }
  ,
  methods:{
    load () {
      if (this.count < this.counts){
        this.count += 1
        // alert(this.counts)
      }
    },
    submit(){
      if(this.value===''){
        alert('请选择级别')
      }else{
        this.$axios.post('/api/iquirdata/', {username: this.username, level: this.value, user: this.form.user, data: this.form.data.toString(), name: this.form.name})
          .then((res) =>{
            console.log(res)
            if(res.data.code === 201){
              this.count = res.data.counts
              this.date = res.data.date
              this.name = res.data.name
              this.level = res.data.level
              this.info = res.data.info
              this.local = res.data.local
              this.type = res.data.type
            // 读取到的数据做成卡片形式发送到无限滚动
            }
            else if(res.data.code === 204 || res.data.code === 203)
            {
                this.count = 0
                this.load()
            }
          })
      }
    },
  }
}
</script>

<style scoped>

</style>
