<template>
  <el-container>
    <el-header>
      <el-button type="button" @click="dialogFormVisible = true">添加课程</el-button>
      <el-button type="button" @click="delcourse">删除课程</el-button>
      <el-dialog title="添加课程" :visible.sync="dialogFormVisible" :destroy-on-close=true>
        <el-form :model="form" ref="form">
          <el-form-item  label="课程名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="老师名称" :label-width="formLabelWidth">
            <el-input v-model="form.teacher" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="上课时间" :label-width="formLabelWidth">
            <el-input v-model="form.time" auto-complete="off" ></el-input>
          </el-form-item>
          <el-form-item label="上课地点" :label-width="formLabelWidth">
          <el-input v-model="form.localtion" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-form-item label="课堂人数" :label-width="formLabelWidth">
              <el-input v-model="form.stu_num" auto-complete="off"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item>
            <el-form-item label="课程分数" :label-width="formLabelWidth">
              <el-input v-model="form.score" auto-complete="off"></el-input>
            </el-form-item>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancle" >取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </el-dialog>
      <el-switch
        v-model="select_status"
        @change="start_select(select_status)"
        active-text=开始选课></el-switch>
      <el-button @click="showse"></el-button>
    </el-header>
    <el-main>
      <el-table
        ref="multipleTable"
        :data="courses"
        style="width: 100%"
        @loading="loadall"
      >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          prop="id"
          label="课程名称"
          width="200"
        >
        </el-table-column>
        <el-table-column
          label="讲师"
          width="200"
          prop="tname"
        >
        </el-table-column>
        <el-table-column
          label="课时"
          width="200"
          prop="value"
        >
        </el-table-column>
        <el-table-column
          label="地点"
          width="200"
          prop="local"
        >
        </el-table-column>
        <el-table-column
          label="上课时间"
          width="200"
          prop="course_time"
        >
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";
export default {
  name: "Course_contral",
  data() {
    return{
      username: JSON.parse(sessionStorage.getItem("loginUserInfo")),
      selected: JSON.parse(localStorage.getItem("select_c_status")),
      tableData: [],
      courses: [],
      course: '',
      teacher: '',
      time: '',
      id: '',
      location: '',
      select_status: false,
      dialogFormVisible: false,
      form: {
        name: '',
        teacher: '',
        time: '',
        localtion: '',
        stu_num: '',
        score: ''
      },
      formLabelWidth: '120px'
    };
  },
  computed:{
    ...mapState(['select_c_status']),
    ...mapGetters(["loginUserInfo"]),
    ...mapGetters(['select_c_status'])
  },
  methods: {
    loadall(){
      this.$axios.post('/api/course/', {username: this.username})
        .then((res)=>{
          console.log(res)
          this.courses = res.data['course'];
        })},
    showse(){
      // this.$message.success(this.selected)
      this.selected = JSON.parse(localStorage.getItem("select_c_status"))
      console.log("show" + this.selected)
    },

    submit() {
      const data = {
        username: this.username,
        cname: this.form.name,
        tname: this.form.teacher,
        snum: this.form.stu_num,
        ctime: this.form.time,
        clocal: this.form.localtion,
        score: this.form.score
      }
      this.$axios.post('/api/add_course/', data)
          .then((res) =>{
            console.log(res)
            if(res.data.msg==='success'){
              this.form.name = ''
              this.form.teacher = ''
              this.form.time = ''
              this.form.localtion = ''
              this.form.stu_num = ''
              this.form.score = ''
              this.dialogFormVisible = false
              this.$message.success('添加成功')
            }else{
              this.$message.error('添加失败，请重试')
            }
          })
    },
    cancle() {
      this.dialogFormVisible = false
        this.form.name = ''
        this.form.teacher = ''
        this.form.time = ''
        this.form.localtion = ''
        this.form.stu_num = ''
        this.form.score = ''
      },
    start_select() {
      if(this.select_status === true){
        this.$message.success('开启选课')
        console.log(this.select_status)
        localStorage.setItem('select_c_status', this.select_status)
        // this.$store.commit('setSelectCStatus', this.select_status)
        // this.$store.commit('setSelectCStatus', this.select_status)
        this.selectd = JSON.parse(localStorage.getItem("select_c_status"))
        console.log(this.select_status)
        // this.$message.success(sessionStorage.getItem('select_c_status'))
        // this.$store.getters.select_c_status.select_c_status
      }else{
        // this.$message.success('关闭选课')
        console.log(this.select_status)
        // this.$store.commit('setSelectCStatus', false)
        localStorage.setItem('select_c_status', this.select_status)
        this.selectd = JSON.parse(localStorage.getItem("select_c_status"))
        // sessionStorage.setItem('select_c_status', this.select_status)
        // this.$message.success(sessionStorage.getItem('select_c_status'))
    }
    },
    loadstatus() {
      this.select_status = this.selected
    },
      delcourse() {
      const a = this.$refs.multipleTable.selection
      console.log(a)
      if (a.length === 0) {
        this.$message.error('请选择课程')
      }else{
        this.$axios.post('/api/delcourse/', {username: this.username, courseid: a[0]['id']})
          .then((res)=>{
            console.log(res)
            alert('删除成功')
            this.loadall()
          })
      }

    },
  },
  mounted() {
    this.loadstatus()
    this.loadall()
  }
}
</script>

<style scoped>

</style>
