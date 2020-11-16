<template>
<div>
  <el-main>
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
      <li v-for="i in count" class="infinite-list-item">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{'活动名称: ' + name[i - 1] }}</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div class="text item">
            {{'活动时间: ' + date[i - 1] }}
          </div>
          <div class="text item">
            {{'活动等级: ' + level[i - 1] }}
          </div>
          <div class="text item">
            {{'活动时间: ' + local[i - 1] }}
          </div>
          <div class="text item">
            {{'活动类型: ' + type[i - 1] }}
          </div>
          <div class="text item">
            {{'活动详情: \n' + info[i - 1] }}
          </div>
        </el-card>

      </li>
    </ul>

  </el-main>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
name: "MyActivity",
  data() {
    return {
      count: 0,
      counts: 0,
      name: 0,
      date: 0,
      info: 0,
      level: 0,
      local: 0,
      type: 0,
      username : JSON.parse(sessionStorage.getItem('loginUserInfo')),
    }
  },
  computed: {
    ...mapGetters(["loginUserInfo"])
  },
  methods: {
    load (){
      this.$axios.post('/api/myactivity/', {username: this.username})
        .then((res) =>{
          console.log(res)
          if(res.data.code === 201){
            this.count = res.data.counts
            this.date = res.data.date
            this.name = res.data.name
            this.level = res.data.level
            this.info = res.data.info
            this.local = res.data.local
            this.type = res.data.type
            // 读取到的数据做成卡片形式发送到无限滚动
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
