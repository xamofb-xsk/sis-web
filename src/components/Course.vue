<template>
<el-container>
  <el-header style="height: 100%">
    <!-- //:data="select" 绑定的数据变量-->
    <el-table
      :data="select"
      style="width: 100%"
    >
      <el-table-column
        prop="stu_name"
        label="姓名"
      >
      </el-table-column>
      <el-table-column
        prop="stu"
        label="学号"
      >
      </el-table-column>
      <el-table-column
      prop="cname"
      label="中签课程"
      >

      </el-table-column>
    </el-table>
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
        label="id"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="value"
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
    <div>
      <el-button @click="sumbit">提交</el-button>
    </div>
  </el-main>
</el-container>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: "Course",
  data() {
    return{
      username: JSON.parse(sessionStorage.getItem('loginUserInfo')),
      //sessionStorage的生命是当前窗口，localStorage的生命是永久，除非被清除
      selectd: JSON.parse(localStorage.getItem('select_c_status')), //localStorage.getItem('select_c_status')用于获取select_c_status的值，
      // selectd: this.$store.getters.select_c_status('select_c_status'),
      courses: [],
      state: '',
      timeout: null,
      select: [{
        'stu_name': '',
        'stu': '',
        'cname': ''
      }
      ],
      show: false,
    };
  },
  computed: {
    ...mapGetters(["loginUserInfo"]),
    ...mapGetters(['select_c_status'])
  },
  methods: {
    loadall(){
      if(this.selectd===true){
        this.$axios.post('/api/course/', {username: this.username})
          .then((res)=>{
            this.courses = res.data['course'];
            if(res.data['select'] !== null){
              this.select = res.data['select']
            }
          })
      }else{
       this.$message.error('未开启选课系统')
      }
    },
    sumbit(){
      const a = this.$refs.multipleTable.selection //将表单中的数据赋值到a中
      if(a.length===0){
        this.$message.error('请选择课程') //弹出提示信息
      }else if(a.length>3){
        this.$message.error('最多选择3门') //弹出提示信息
        this.$refs.multipleTable.clearSelection();  //清除表单
      } else{
        this.$axios.post('/api/select/', {select:a, username: this.username})
            .then((res)=>{
              if(res.data.msg==='已有选修'){
                alert(res.data.msg)
              }else{
                alert('提交成功')
              }
            })
      }
    }
  },
  mounted() {
    this.loadall()
  }
  }
</script>

<style lang="scss" scoped>
.my-autocomplete {
    li {
      line-height: normal;
      padding: 7px;

      .name {
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .addr {
        font-size: 12px;
        color: #b4b4b4;
      }

      .highlighted .addr {
        color: #ddd;
      }
  }
}
</style>
