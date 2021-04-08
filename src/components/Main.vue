<template>
<div id="id">
  <el-container style="border: 1px solid #eee; height:100%;">
    <el-aside width="200px" height="100%" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']" :unique-opened="true" >
        <el-menu-item index="1" @click="tabChange('Notice')">
          <i class="el-icon-location"></i>
          <span slot="title">主页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-s-order"></i>活动</template>
          <el-menu-item-group>
<!--            <el-menu-item index="2-1" name="push" @click="tabChange('ActivityPublish')">活动发布</el-menu-item>-->
            <el-menu-item index="2-2" name="Inquire" @click="tabChange('ActivityInquire')">活动查询</el-menu-item>
            <el-menu-item index="2-3" name="MyActivity" @click="tabChange('MyActivity')">我的活动</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
<!--        <el-submenu index="3">-->
<!--          <template slot="title" @click="tabChange('Notice_get')"><i class="el-icon-s-order"></i>通知</template>-->
<!--        </el-submenu>-->
        <el-menu-item index="3" @click="tabChange('NoticeGet')">
          <i class="el-icon-menu"></i>
          <span slot="title">通知</span>
        </el-menu-item>
        <el-menu-item index="4" @click="tabChange('Litte')">
          <i class="el-icon-menu"></i>
          <span slot="title">小红本</span>
        </el-menu-item>
        <el-menu-item index="5" @click="tabChange('Schedule')">
          <i class="el-icon-menu"></i>
          <span slot="title">课表</span>
        </el-menu-item>


        <el-submenu index="6">
          <template slot="title"><i class="el-icon-s-order"></i>课程</template>
          <el-menu-item-group>
            <!--            <el-menu-item index="2-1" name="push" @click="tabChange('ActivityPublish')">活动发布</el-menu-item>-->
            <el-menu-item index="6-2" name="Course" @click="tabChange('Course')">选修课</el-menu-item>
            <el-menu-item index="6-3" name="SCourse" @click="tabChange('SCourse')">体育选修</el-menu-item>
            <el-menu-item index="6-4" name="RCourse" @click="tabChange('RCourse')">重修</el-menu-item>
          </el-menu-item-group>
        </el-submenu>


<!--        <el-menu-item index="6" @click="tabChange('Course')">-->
<!--          <i class="el-icon-menu"></i>-->
<!--          <span slot="title">课程</span>-->
<!--        </el-menu-item>-->
        <el-menu-item index="7" @click="tabChange('File')">
          <i class="el-icon-menu"></i>
          <span slot="title">文件</span>
        </el-menu-item>
        <el-menu-item index="8" @click="tabChange('About_Me')">
          <i class="el-icon-user-solid"></i>
          <span slot="title">我的</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main style="height:100%;padding:0">
      <div :is="currentView">

      </div>
    </el-main>
  </el-container>

</div>
</template>

<script>
import { mapGetters} from "vuex";
import ActivityPublish from "./ActivityPublish.vue"
import ActivityInquire from "./ActivityInquire";
import MyActivity from "./MyActivity";
import NoticePublish from "./NoticePublish";
import Notice from "./Notice";
import NoticeGet from "./Notice_get";
import Litte from "./litteredbook";
import Schedule from "./Schedule";
import About_Me from "./About_Me"
import File from "./File";
import Course from "./Course";
import SCourse from "./SCourse";
import RCourse from "./RCourse";
export default {
  components: {
    ActivityPublish,
    Notice,
    ActivityInquire,
    MyActivity,
    NoticePublish,
    NoticeGet,
    Litte,
    Schedule,
    About_Me,
    File,
    Course,
    SCourse,
    RCourse
    },
  name: "Main.vue",
  data() {
    return {
      activeIndex: '1',
      currentView: 'Notice',
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
