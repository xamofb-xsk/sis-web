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
    newDeptFlag: false,
    select_c_status: false,
    select_r_status: false,
    select_s_status: false,
  },
  getters: {
    loginUserInfo: state => {
      if (!state.loginUserInfo) {
        console.log("state中UserInfo为空", state.loginUserInfo);
        return JSON.parse(sessionStorage.getItem("loginUserInfo"))
      }
      console.log("有值", state.loginUserInfo)
      return state.loginUserInfo;
    },
    select_c_status: state =>{
      return state.select_c_status
    },
    select_r_status: state =>{
      return state.select_r_status
    },
    select_s_status: state =>{
      return state.select_s_status
    },
  },
  mutations: {
    setUserInfo: (state, userInfo) => {
      //获取登陆用户信息
      state.loginUserInfo = userInfo;
      sessionStorage.setItem("loginUserInfo", JSON.stringify(userInfo));
    },
    setSelectCStatus: (state, selected) =>{
      state.select_c_status = selected;
      sessionStorage.setItem("select_c_status", JSON.stringify(selected))
    },
    setSelectRStatus: (state, selected) =>{
      state.select_r_status = selected;
      sessionStorage.setItem("select_r_status", JSON.stringify(selected))
    },
    setSelectSStatus: (state, selected) =>{
      state.select_s_status = selected;
      sessionStorage.setItem("select_s_status", JSON.stringify(selected))
    },
  },
  actions: {}
});

export default store

