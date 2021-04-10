<template>
  <el-container>
    <el-header>
      <el-button type="button" @click="dialogFormVisible = true">添加课程</el-button>
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
    </el-header>
    <el-main>
      <el-table
      :data="tableData"
      >
        <el-table-column
        :prop="id"
        lable="id"
        >
        </el-table-column>
        <el-table-column
        :prop="course"
        label="课程"
        >
        </el-table-column>
        <el-table-column
        :prop="teacher"
        label="老师"
        >
        </el-table-column>
        <el-table-column
        :prop="time"
        label="上课时间"
        >
        </el-table-column>
        <el-table-column
          :prop="location"
          label="上课地点">
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
      tableData: [],
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
    ...mapGetters(["loginUserInfo"], ['select_c_status'])
  },
  methods: {
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
        sessionStorage.setItem('setSelectCStatus', this.select_status)
        // this.$message.success(sessionStorage.getItem('setSelectCStatus'))
      }else{
        this.$message.success('关闭选课')
        sessionStorage.setItem('setSelectCStatus', this.select_status)
        // this.$message.success(sessionStorage.getItem('setSelectCStatus'))
    }
    }
  }
}
</script>

<style scoped>

</style>
