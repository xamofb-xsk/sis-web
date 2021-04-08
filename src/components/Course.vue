<template>
<el-container>
  <el-header>
    <el-autocomplete
    popper-class="my-autocomplete"
    v-model="state"
    :fetch-suggestions="querySearch"
    placeholder="请输入课程名称"
    @select="handleSelect"
    >
      <i
      class="el-icon-edit el-input__icon"
      slot="suffix"
      @click="handleIconClick"
      >
      </i>
      <template slot-scope="{ item }">
        <div class="name">{{ item.value }}</div>
        <span class="addr">{{ item.address }}</span>
      </template>
    </el-autocomplete>
  </el-header>
  <el-main>
    <el-button @click="loadall"></el-button>

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
      state: ''
    };
  },
  computed: {
    ...mapGetters(["loginUserInfo"])
  },
  methods: {
    querySearch(queryString, cb) {
      var courses = this.courses;
      var results = queryString ? courses.filter(this.createFilter(queryString)) : courses;
      cb(results);
    },
    createFilter(queryString){
      return (courses) =>{
        return (courses.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadall(){
      this.$axios.post('/api/course/', {username: this.username})
    },
    handleSelect(item){
      console.log(item)
    },
    handleIconClick(ev){
      console.log(ev);
    },
  },
  mounted: {

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
