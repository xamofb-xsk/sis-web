<template>
<div id="id">
  <el-container style="border: 1px solid #eee; height:100%;">
    <el-aside width="200px" height="100%" style="background-color: rgb(238, 241, 246)"> <!--//el-aside侧边栏-->
      <el-menu :default-openeds="['1', '3']" :unique-opened="true" > <!--//菜单栏-->
        <el-menu-item index="1" @click="tabChange('About_Me')"> <!--第一个菜单-->
          <i class="el-icon-location"></i>
          <span slot="title">主页</span>
        </el-menu-item>
            <el-menu-item index="2-3" name="MyActivity" @click="tabChange('MyActivity')"><i class="el-icon-menu"></i>我的活动</el-menu-item>
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
            <el-menu-item index="6-2" name="Course" @click="tabChange('Course')">选修课</el-menu-item>
            <el-menu-item index="6-3" name="SCourse" @click="tabChange('SCourse')">体育选修</el-menu-item>
            <el-menu-item index="6-4" name="RCourse" @click="tabChange('RCourse')">重修</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="7" @click="tabChange('File')">
          <i class="el-icon-menu"></i>
          <span slot="title">文件</span>
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
import ActivityPublish from "./ActivityPublish.vue" //导入活动创建页
import ActivityInquire from "./ActivityInquire"; //导入活动查询页
import MyActivity from "./MyActivity"; //导入我的活动页
import NoticePublish from "./NoticePublish"; //导入通知创建页
import NoticeGet from "./Notice_get"; //导入获取活动页
import Litte from "./litteredbook"; //导入小红本页
import Schedule from "./Schedule"; //导入课表页
import About_Me from "./About_Me" //导入关于我页
import File from "./File"; //导入文件页
import Course from "./Course"; //导入选修课页
import SCourse from "./SCourse"; //导入体育课页
import RCourse from "./RCourse"; //导入重修页
export default {
  components: { // 声明有哪些组件
    ActivityPublish,
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
    RCourse,
    },
  name: "Main.vue",
  data() {
    return {
      activeIndex: '1', //当前页标
      currentView: 'About_Me', //当前页
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
    tabChange(tabItem) {//改变页面
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
