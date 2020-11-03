<template>
<div>
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
              <el-menu-item index="2-2">活动查询</el-menu-item>
              <el-menu-item index="2-3">我的活动</el-menu-item>
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
</div>
</template>
<script>
import ActivityPublish from "./ActivityPublish";
import notice from "./notice";
export default {
name: "test",
  components:{ActivityPublish, notice},
  data() {
  return {
    activeIndex: '1',
    currentView: ''
  }
  },
  methods: {
    tabChange(tabItem) {
      this.currentView = tabItem;
      }
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
#id{

}
html,body,#app,.el-container{
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0;
  /*外部间距也是如此设置*/
  margin: 0;
  /*统一设置高度为100%*/
  height: 100%;}
</style>
