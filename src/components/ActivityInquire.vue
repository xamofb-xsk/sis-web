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
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%"></el-date-picker>
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
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
name: "ActivityInquire",
  data () {
  return {
    form: {
      username : JSON.parse(sessionStorage.getItem('loginUserInfo')),
      name: '',
      user: '',
      date: '',
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
    submit(){
      if(this.value===''){
        alert('请选择级别')
      }else{
        this.$axios.post()
      }

    },
  }
}
</script>

<style scoped>

</style>
