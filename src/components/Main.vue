<template>
<div id="id">
  <el-container style="border: 1px solid #eee; height:100%;">
    <el-aside width="200px" height="100%" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']" :unique-opened="true" >
        <el-menu-item index="1" @click="tabChange('notice')">
          <i class="el-icon-location"></i>
          <span slot="title">主页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-s-order"></i>活动</template>
          <el-menu-item-group>
            <el-menu-item index="2-1" name="push" @click="tabChange('ActivityPublish')">活动发布</el-menu-item>
            <el-menu-item index="2-2" name="Inquire" @click="tabChange('ActivityInquire')">活动查询</el-menu-item>
            <el-menu-item index="2-3" name="MyActivity" @click="tabChange('MyActivity')">我的活动</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="3">
          <i class="el-icon-menu"></i>
          <span slot="title">文件</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-user-solid"></i>
          <span slot="title">我的</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main style="height:100%">
      <div :is="currentView">

      </div>
    </el-main>
  </el-container>

</div>
</template>

<script>
import notice from "./notice";
import { mapGetters} from "vuex";
import ActivityPublish from "./ActivityPublish.vue"
import ActivityInquire from "./ActivityInquire";
import MyActivity from "./MyActivity";
export default {
  components: {
    ActivityPublish,
    notice,
    ActivityInquire,
    MyActivity,
    },
  name: "Main.vue",
  data() {
    return {
      activeIndex: '1',
      currentView: 'notice',
      user: JSON.parse(sessionStorage.getItem("loginUserInfo")),
      data: '',
      tableData: [{

      }],
    }
  },
  computed: {
    ...mapGetters(["loginUserInfo"])
  },mounted() {
    this.userInfo = this.loginUserInfo;
  },
  methods: {

    // goActivityp() {
    //   this.$router.replace('/activity')
    // },
    // changvue(ActivityPublish){
    //   this.currentView = ActivityPublish;
    // },
    tabChange(tabItem) {
      this.currentView = tabItem;
    },
  }
};
</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
#id{
height:100%;
}
.black_title,.left_title{
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #ccc;
}
.black_title{
  background-color: #fff2cc;
}

.bottom_border{
  background-color: #bdd7ee;
  border: 1px solid #000;
}
</style>
