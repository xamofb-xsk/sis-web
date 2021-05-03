<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"> <!--//:model="ruleForm"带规则的表单 :rules="rules"规则 ref="ruleForm"用于获取表单中的变量-->
      <el-form-item label="活动名称" prop="name"> <!--//prop="name" 绑定变量名-->
        <el-input v-model="ruleForm.name" style="width: 200px" name="name"></el-input> <!--//v-model="ruleForm.name" 用于此单元格的规则-->
    </el-form-item>
    <el-form-item label="活动地点" prop="region"> <!--//prop="region" 绑定变量名-->
      <el-input v-model="ruleForm.region" style="width: 200px"></el-input> <!--//v-model="ruleForm.region" 用于此单元格的规则-->
    </el-form-item>
    <el-form-item label="活动时间" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 300px;"  value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="3">&nbsp;</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
            <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 300px;" value-format='HH:mm'></el-time-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="活动性质" prop="type">
      <el-radio-group v-model="ruleForm.type"> <!--//单项选择器组-->
        <el-radio label="校义工" name="type"></el-radio> <!--//单选内容-->
        <el-radio label="文体活动" name="type"></el-radio>
        <el-radio label="讲座" name="type"></el-radio>
        <el-radio label="体育测试" name="type"></el-radio>
        <el-radio label="社会实践" name="type"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="活动范围" prop="level">
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
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button> <!-- //submitForm('ruleForm') 里面的'ruleForm' 是表单名-->
      <el-button @click="resetForm('ruleForm')">重置</el-button> <!--//resetForm('ruleForm') 里面的'ruleForm' 是表单名-->
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters} from "vuex";
export default {
name: "ActivityPublish",
  data() {
    return {
      user: JSON.parse(sessionStorage.getItem("loginUserInfo")),
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: { //规则
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }, //required 是否必须输入，message 提示
          { min: 2, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { required: true, message: '请至少选择一个活动性质', trigger: 'change' }
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

      this.$axios.post('/api/act_info/',{username:this.user, name:this.ruleForm.name, region:this.ruleForm.region, date1:this.ruleForm.date1, date2:this.ruleForm.date2 ,type:this.ruleForm.type, level:this.ruleForm.level, desc:this.ruleForm.desc})
        .then((res) => {
        console.log(res)
          if(res.data.code === 100){
            alert("活动创建成功")
          }
        }, () => {
            alert("活动创建失败")
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
