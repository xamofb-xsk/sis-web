<template>
<div id="id">
  <el-container style="border: 1px solid #eee; height:100%;">
    <el-aside width="200px" height="100%" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '3']" :unique-opened="true" >
        <el-menu-item index="1" @click="tabChange('About_Me_T')">
          <i class="el-icon-location"></i>
          <span slot="title">主页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-s-order"></i>活动</template>
          <el-menu-item-group>
            <el-menu-item index="2-1" name="push" @click="tabChange('NoticePublish')">通知发布</el-menu-item>
            <el-menu-item index="2-2" name="push" @click="tabChange('ActivityPublish')">活动发布</el-menu-item>
            <el-menu-item index="2-3" name="Inquire" @click="tabChange('ActivityInquire')">活动查询</el-menu-item>
            <el-menu-item index="2-4" name="MyActivity" @click="tabChange('Check')">小红本审核</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title"><i class="el-icon-s-order"></i>课程</template>
          <el-menu-item-group>
            <el-menu-item index="3-1" name="Course_contral" @click="tabChange('Course_contral')">选修</el-menu-item>
            <el-menu-item index="3-2" name="SCourse_contral" @click="tabChange('SCourse_contral')">体育选修</el-menu-item>
            <el-menu-item index="3-3" name="RCourse_contral" @click="tabChange('RCourse_contral')">重修</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
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
import { mapGetters} from "vuex";
import ActivityPublish from "./ActivityPublish.vue"
import ActivityInquire from "./ActivityInquire";
import MyActivity from "./MyActivity";
import NoticePublish from "./NoticePublish";
import Check from "./Check"
import Course_contral from "./Course_contral"
import RCourse_contral from "./RCourse_contral"
import SCourse_contral from "./SCourse_contral"
import About_Me from "./About_Me"
import About_Me_T from "./About_Me_T"
export default {
  components: {
    ActivityPublish, //活动创建页
    ActivityInquire,  //活动查询页
    MyActivity,  //我的活动页
    NoticePublish,  //通知创建页
    Check,  //小红本分数添加页
    Course_contral,  //选修教师端页
    RCourse_contral,  //重修教师端页
    SCourse_contral,  //体育课可教师端页
    About_Me,  //首页页
    About_Me_T
    },
  name: "Main.vue",
  data() {
    return {
      activeIndex: '1',
      currentView: 'About_Me_T',
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
    tabChange(tabItem) {
      this.currentView = tabItem;
    },
  }
};
</script>

<style scoped>

</style>
