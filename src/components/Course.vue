<template>
<el-container>
  <el-header>
    <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="请输入课程名称"
    @select="handleSelect"
    >
      <i
      class="el-icon-edit el-input__icon"
      slot="suffix"
      @click="handleIconClick"
    >
    </i>
<!--      <template slot-scope="{ item }">-->
<!--        <div class="name">{{ item.value }}</div>-->
<!--      </template>-->
    </el-autocomplete>
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
        prop="time"
      >
      </el-table-column>
      <el-table-column
        label="通过率"
        width="180"
        prop="past"
      >
      </el-table-column>
    </el-table>
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
      courses: [],
      state: '',
      timeout: null,
      cname: [{
        id: 1,
        tname: 1,
        course_type: 1,
        local: 1
      },]
    };
  },
  computed: {
    ...mapGetters(["loginUserInfo"])
  },
  methods: {
    querySearchAsync(queryString, cb) {
      var courses = this.courses;
      var results = queryString ? courses.filter(this.createStateFilter(queryString)) : courses;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(()=>{
          cb(results);
      }, 3000 * Math.random());
    },
    createStateFilter(queryString){
      return (state) =>{
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
      };
    },
    loadall(){
      this.$axios.post('/api/course/', {username: this.username})
          .then((res)=>{
            console.log(res)
            this.courses = res.data['course'];

          })

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
