<template>
  <div id="Welcome">
    <div id="center">
      <el-container>
        <el-header>Login</el-header>
        <el-main>
          <el-col :span="23">
            <el-input v-model="username" placeholder="用户名" type="username"></el-input>
            <el-input v-model="password" placeholder="密码" type="password"></el-input>
          </el-col>
        </el-main>
        <el-footer>
          <el-button type="primary" round @click="onLogin">登录</el-button>
        </el-footer>
      </el-container>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { login } from "../api/http.js"
export default {
  name: 'login',
  computed:{
    ...mapState(["loginUserId"])
  },
  data() {
    return {
      username: '',
      password: '',

    }
  },
  methods:{
    onLogin(){
      login({
        username: this.username,
        password: this.password
      }).then((res) => {
          console.log(res)
            if(res.data.code === 200){
              this.$store.commit("setUserInfo", this.username)
              if(res.data.limit === 'Student'){
                this.$router.replace('/main')
              }else if(res.data.limit === 'Teacher'){
                this.$router.replace('/manager')
              }
            }
          }, () => {
              alert("用户名或密码错误")
            }

          )
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#Welcome{
  color:black;
  text-align:center;
}
#center{
  text-align:center;
  border:2px solid black;
  margin: 150px auto;
  padding:20px;
  /*background-image: url("/assets/pic_57.jpg");*/
  width: 350px;
  height: 300px;
  border-radius:25px;
}
#login{
  text-align:center;
  width:100%;
  margin: 0 auto;
  padding:100px 60px;
  font-size: 13px;
}
#btn{
  color:black;
  background-color:deepskyblue;
  border-radius: 10px;
  margin: 0 auto;
}

</style>
