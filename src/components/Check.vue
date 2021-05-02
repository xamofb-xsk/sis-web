<template>
  <div>
    <el-header>
      <el-form>
        <el-form-item :model="form" ref="form">
          <el-col :span="10" label="活动">
            <el-input v-model="form.name" placeholder="学号"></el-input>
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
          value: 'sport',
          label: '文体活动'
        },
        {
          value: 'chair',
          label: '讲座'
        },{
          value: 'publicact',
          label: '社会实践'
        },{
          value: 'club',
          label: '社团活动'
        }],

    }
  },
  methods: {
    submit() {
      this.$axios.post('/api/actadd/', {username: this.username, actname: this.form.name, score: this.form.score, type: this.value})
      .then((res) =>{
        console.log(res)
        if(res.data.code === 200){
          alert('添加成功')
        }else{
          alert('未查询到此活动')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
