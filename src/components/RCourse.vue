<template>
  <el-container>
    <el-header style="height: 100%">
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
          prop="stu_id"
          label="学号"
        >
        </el-table-column>
        <el-table-column
          prop="cname"
          label="已选课程"
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
          label="课时"
          width="200"
          prop="course_type"
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
  name: "RCourse",
  data() {
    return {
      username: JSON.parse(sessionStorage.getItem('loginUserInfo')),
      selected: JSON.parse(localStorage.getItem('select_r_status')),
      courses: [],
      state: '',
      timeout: null,
      select: [],
      show: false,
    };
  },
  computed: {
    ...mapGetters(["loginUserInfo"], ['select_r_status'])
  },
  methods: {
    loadall() {
      if(this.selected ===true){
        this.$axios.post('/api/rcourse/', {username: this.username})
          .then((res) => {
            console.log(res)
            this.courses = res.data['course'];
            // console.log(res.data['select'])
            if (res.data['select'] !== null) {
              this.select = res.data['select']
              // console.log(this.select)
              this.show = true
            }
          })
      }else{
        this.$message.error('未开启选课系统')
      }
    },
    sumbit() {
      const a = this.$refs.multipleTable.selection
      if (a.length === 0) {
        this.$message.error('请选择课程')
      } else if (a[0]['value'] === this.select[0]['cname']) {
        this.$message.error('该课程已选，请检查')
      } else {
        this.$axios.post('/api/select_rcourse/', {select: a, username: this.username})
          .then((res) => {
            alert('提交成功')
            console.log(res)
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
