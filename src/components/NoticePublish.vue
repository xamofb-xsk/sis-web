<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="通知名称" prop="name">
      <el-input v-model="ruleForm.name" style="width: 200px" name="name"></el-input>
    </el-form-item>
    <el-form-item label="发布范围" prop="level">
      <el-radio-group v-model="ruleForm.level">
        <el-radio label="学院" name="type"></el-radio>
        <el-radio label="年级" name="type"></el-radio>
        <el-radio label="班级" name="type"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="具体内容" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc" style="width: 300px;"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters} from "vuex";
export default {
name: "NoticePublish",
  data() {
    return {
      user: JSON.parse(sessionStorage.getItem("loginUserInfo")),
      ruleForm: {
        name: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入通知名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请选择接收范围', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["loginUserInfo"])
  },mounted() {
    this.userInfo = this.loginUserInfo;
  },
  methods: {
    submitForm(formName) {
      this.$axios.post('/api/notice/',{username:this.user, name:this.ruleForm.name, level:this.ruleForm.level, desc:this.ruleForm.desc})
        .then((res) => {
        console.log(res)
          if(res.data.code === 100){
            alert("发布成功")
          }
        }, () => {
            alert("发布失败")
          }
        )
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
#center{
   text-align: center;
 }
</style>
