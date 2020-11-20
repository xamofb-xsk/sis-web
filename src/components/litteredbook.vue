<template>
  <div>
    <el-main>
      <el-table :data="tableData" >
        <el-table-column prop="publicact" label="社会实践" width="140">
          <template slot-scope="scope" v-for="i in count">
            <span> {{ publicact[i - 1] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="report" label="社会实践报告字数" width="140">
          <template slot-scope="scope" v-for="i in count">
            <span> {{ report[i - 1] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="chair" label="讲座章" width="140">
          <template slot-scope="scope" v-for="i in count">
            <span> {{ chair[i - 1] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="book" label="熟读经典数" width="140">
          <template slot-scope="scope" v-for="i in count">
            <span> {{ book[i - 1] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sport" label="文体活动" width="140">
          <template slot-scope="scope" v-for="i in count">
            <span> {{ sport[i - 1] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="volunteer" label="义工时" width="140">
          <template slot-scope="scope" v-for="i in count">
            <span> {{ volunteer[i - 1] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="club" label="社团活动" width="140">
          <template slot-scope="scope" v-for="i in count">
            <span> {{ club[i - 1] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="friend" label="好朋友数" width="140">
          <template slot-scope="scope" v-for="i in count">
            <span> {{ friend[i - 1] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
export default {
name: "litteredbook",
  data() {
   return {
     count: '',
     publicact: '',
     report: '',
     chair: '',
     book: '',
     sport: '',
     volunteer: '',
     club: '',
     friend: '',
     username : JSON.parse(sessionStorage.getItem('loginUserInfo')),
     tableData: [{
     }]
   }
  },
  mounted:function() {
    this.load()
  },
  methods: {
    load(){
        this.$axios.post('/api/littebook/', {username: this.username})
          .then((res) => {
            console.log(res)
            this.count = res.data.counts
            this.publicact = res.data.publicact
            this.report = res.data.report
            this.chair = res.data.chair
            this.book = res.data.book
            this.sport = res.data.sport
            this.volunteer = res.data.volunteer
            this.club = res.data.club
            this.friend = res.data.friend
          })
    },
  }
}
</script>

<style scoped>

</style>
