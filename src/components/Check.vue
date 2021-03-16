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
          <el-col :span="2" label="类型">
            <el-select v-model="value" placeholder="请选择级别">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
      value: '',
      username : JSON.parse(sessionStorage.getItem('loginUserInfo')),
      show: false,
      form: {
        name: '',
        score: '',
        type: '',
      },
      options: [{
        value: 'volunteer',
        label: '校义工'
      },
        {
          value: '文体活动',
          label: '文体活动'
        },
        {
          value: '讲座',
          label: '讲座'
        },{
          value: '体育测试',
          label: '体育测试'
        },{
          value: '社会实践',
          label: '社会实践'
        }],

    }
  },
  methods: {
    submit() {
      this.$axios.post('/api/actadd/', {username: this.username, actname: this.form.name, score: this.form.score, type: this.value})
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
