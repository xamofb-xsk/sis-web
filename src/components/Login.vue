<template>
  <div id="Welcome">
    <div id="center">

      <div id="login">
        <div class="input-group input-group-lg">
          <label>
            <input type="text" class="form-control" v-model="username" placeholder="Username" aria-describedby="basic-addon1">
          </label>
        </div>
        <div class="input-group input-group-lg">
          <label>
            <input type="text" class="form-control" v-model="password" placeholder="Password" aria-describedby="basic-addon1">
          </label>
        </div>
        <div>
          <table>
            <tr>
              <td>
                <label>
                  <input type="checkbox" style="vertical-align:middle;margin-top: 0;" value="记住用户名" name="username"/>记住用户名
                </label>
              </td>
              <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
              <td>
                <label>
                  <input type="checkbox" style="vertical-align:middle;margin-top: 0;margin-right: 0;" value="记住用户名" name="password">记住密码
                </label>
              </td>
            </tr>
          </table>

          <div class="btn-group" role="group" aria-label="..." id="btn" style="margin-top:10px;">
            <button type="button" class="btn btn-default" @click="onLogin">登录</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods:{
    onLogin(){
      this.$axios.post('/api/auth/',{username:this.username, password:this.password}).then(function (res) {
        console.log(res);}).catch(function (res) {
        console.log(res);
      });
    },
    post(){
      let data = new URLSearchParams()
      data.append('username', this.username)
      data.append('password', this.password)
      this.$axios
        .post('http://127.0.0.1:8000/api/auth', data)
        .then(function(response){
          console.log(response)
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#Welcome{
  color:black;
}
#center{
  text-align:center;
  border:2px solid black;
  margin: 0 auto;
  /*padding:10px 40px;*/
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
