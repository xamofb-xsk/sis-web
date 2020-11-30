<template>
  <div>
    <el-header>
      <el-form>
        <el-form-item :model="form" ref="form">
          <el-col :span="10" label="活动">
            <el-input v-model="form.name" placeholder="活动/个人"></el-input>
          </el-col>
          <el-col :span="10" label="增加分数">
            <el-input  v-model="form.score" placeholder="增加的分数"></el-input>
          </el-col>
          <el-col :span="2">
            <el-button @click="submit">提交</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-header>
  </div>
</template>

<script>
export default {
name: "Check",
  data() {
    return{
      username : JSON.parse(sessionStorage.getItem('loginUserInfo')),
      show: false,
      form: {
        name: '',
        score: '',
      }
    }
  },
  methods: {
    submit() {
      this.$axios.post('/api/actadd/', {username: this.username, actname: this.form.name, score: this.form.score})
      .then((res) =>{
        console.log(res)
        if(res.data.code === 400){
          alert('未查询到此活动')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
