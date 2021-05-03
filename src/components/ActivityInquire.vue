<!--活动查询-->
<template>
<div >
  <el-header>
      <el-form :model="form" ref="form"> <!--//:model="form"定义为表单， ref="form" 用于获取表单中的变量-->
        <el-form-item> <!--// 类似于tr-->
          <el-col :span="6" label="活动名称"> <!--//类似于td-->
          <el-input v-model="form.name" placeholder="活动名称">
          </el-input>
        </el-col>
        <el-col :span="6" label="发布人">
          <el-input v-model="form.user" placeholder="发布人">

          </el-input>
        </el-col>
        <el-col :span="3">
            <el-select v-model="value" placeholder="请选择级别"> <!--//一个带下拉选项的单元格-->
  <!--            // 遍历所有选项，label是显示的内容，value是具体的值，选中后提交时会传值-->
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-button @click="submit">查询</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </el-header>
  <el-main>
    <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
      <li v-for="(i, index) in count" class="infinite-list-item">
        <el-card class="box-card"><!--          //element-ui定义好的卡片形式的UI-->
          <div slot="header" class="clearfix"><!--            //slot 内容分发插槽，这里是以卡片头内容-->
            <span>{{'活动名称: ' + name[index] }}</span><!--            <el-button style="float: right; padding: 3px 0"  type="text">操作按钮</el-button>-->
          </div>
          <div class="text item">
            {{'活动时间: ' + date[index] }}
          </div>
          <div class="text item">
            {{'活动等级: ' + level[index] }}
          </div>
          <div class="text item">
            {{'活动时间: ' + local[index] }}
          </div>
          <div class="text item">
            {{'活动类型: ' + type[index] }}
          </div>
          <div class="text item">
            {{'活动详情: \n' + info[index] }}
          </div>
        </el-card>

      </li>
    </ul>

  </el-main>
</div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
name: "ActivityInquire",
  data () {
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
    form: {
      name: '',
      user: '',
      data: '',
    },
    options: [{ // 选项
      value: '班级',
      label: '班级'
    },
      {
        value: '年级',
        label: '年级'
      },
      {
        value: '学院',
        label: '学院'
    }],
    value: '',
  }
},computed: {
    ...mapGetters(["loginUserInfo"])
  }
,
  mounted () {
    this.userInfo = this.loginUserInfo
  }
  ,
  methods:{
    load () {
      if (this.count < this.counts){
        this.count += 1
        // alert(this.counts)
      }
    },
    submit(){
      if(this.value===''){
        alert('请选择级别')
      }else{
        this.$axios.post('/api/iquirdata/', {username: this.username, level: this.value, user: this.form.user,  name: this.form.name})
          .then((res) =>{ //当网页请求完后执行
            console.log(res)
            if(res.data.code === 201){
              this.count = res.data.counts //赋值
              this.date = res.data.date
              this.name = res.data.name
              this.level = res.data.level
              this.info = res.data.info
              this.local = res.data.local
              this.type = res.data.type
              alert('查询成功')
            // 读取到的数据做成卡片形式发送到无限滚动
            }
            else if(res.data.code === 204 || res.data.code === 203)
            {
                this.count = 0
                this.load()
                alert('查询失败，请检查活动名称或查询级别')
            }
          })
      }
    },
  }
}
</script>

<style scoped>

</style>
