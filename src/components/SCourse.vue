<template>
  <el-container>
    <el-header>
      <el-table
        v-show="show"
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

      <!--    <el-autocomplete-->
      <!--    v-model="state"-->
      <!--    :fetch-suggestions="querySearchAsync"-->
      <!--    placeholder="请输入课程名称"-->
      <!--    @select="handleSelect"-->
      <!--    >-->
      <!--      <i-->
      <!--      class="el-icon-edit el-input__icon"-->
      <!--      slot="suffix"-->
      <!--      @click="handleIconClick"-->
      <!--    >-->
      <!--    </i>-->
      <!--      <template slot-scope="{ item }">-->
      <!--        <div class="name">{{ item.value }}</div>-->
      <!--      </template>-->
      <!--    </el-autocomplete>-->
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
  name: "SCourse",
  data() {
    return{
      username: JSON.parse(sessionStorage.getItem('loginUserInfo')),
      courses: [],
      state: '',
      timeout: null,
      select: [],
      show: false,
    };
  },
  computed: {
    ...mapGetters(["loginUserInfo"], ['select_s_status'])
  },
  methods: {
    loadall(){
      if(sessionStorage.getItem('setSelectSStatus')===true){
        this.$axios.post('/api/scourse/', {username: this.username})
          .then((res)=>{
            console.log(res)
            this.courses = res.data['course'];
            console.log(res.data['select'])
            if(res.data['select'] !== null){
              this.select = res.data['select']
              console.log(this.select)
              this.show = true
            }
          })
      }else{
        this.$message.error('未开启选课系统')
      }


    },
    handleSelect(item){
      console.log(item)
    },
    handleIconClick(ev){
      console.log(ev);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    sumbit(){
      const a = this.$refs.multipleTable.selection
      if(a.length===0){
        this.$message.error('请选择课程')
      }else{
        this.$axios.post('/api/select_scourse/', {select:a, username: this.username})
          .then((res)=>{
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

<style scoped>
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
