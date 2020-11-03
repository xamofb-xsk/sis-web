import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loginUserInfo: "",
    token: "",
    menuList:[
    ],
    currentMenu: "首页",
    newDeptFlag: false
  },
  getters: {
    loginUserInfo: state => {
      if (!state.loginUserInfo) {
        console.log("state中UserInfo为空", state.loginUserInfo);
        return JSON.parse(sessionStorage.getItem("loginUserInfo"))
      }
      console.log("有值", state.loginUserInfo)
      return state.loginUserInfo;
    }
  },
  mutations: {
    setUserInfo: (state, userInfo) => {
      //获取登陆用户信息
      state.loginUserInfo = userInfo;
      sessionStorage.setItem("loginUserInfo", JSON.stringify(userInfo));
    }
  },
  actions: {}
});

export default store

