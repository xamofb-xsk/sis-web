<template>
<div>
  <el-main>
    <el-row>
      <el-col :span="8">
        <ul class="infinite-list" v-infinite-scroll="loadclass" style="overflow:auto">
          <li class="infinite-list-item">{{ data }}</li>
        </ul>
      </el-col>
      <el-col :span="8">
        <ul class="infinite-list" v-infinite-scroll="loadclass" style="overflow:auto">
          <li>{{ user }}</li>
        </ul>
      </el-col>
      <el-col :span="8">
        <ul class="infinite-list" v-infinite-scroll="loadclass" style="overflow:auto">
          <li>aaaaaaaaaaaaaaa</li>
        </ul>
      </el-col>
    </el-row>
  </el-main>
</div>
</template>

<script>
import { mapGetters} from "vuex";
export default
{
name: "notice",
  data(){
    return {
      user: JSON.parse(sessionStorage.getItem("loginUserInfo")),
      data: '',
    }},
  computed: {
    ...mapGetters(["loginUserInfo"])
  },
  mounted() {
  this.userInfo = this.loginUserInfo;
},
  methods:{
    loadclass () {
      this.$axios.post('/api/data/', {username: this.user, token: this.token})
        .then((res) => {
          console.log(res)
          this.data = res.data.data
        })
    },
  }
}
</script>

<style scoped>

</style>
