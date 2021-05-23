import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loginUserInfo: "", //学号
    select_c_status: false, //选修课状态
    select_r_status: false,//选重修课状态
    select_s_status: false,//选体育课状态
  },
  getters: {//获取值的方法
    loginUserInfo: state => {
      return state.loginUserInfo;
    },
    select_c_status: state =>{
      return state.select_c_status;
    },
    select_r_status: state =>{
      return state.select_r_status;
    },
    select_s_status: state =>{
      return state.select_s_status;
    },
  },
  mutations: {//设置值的方法
    setUserInfo: (state, userInfo) => {
      //获取登陆用户信息
      state.loginUserInfo = userInfo;
      sessionStorage.setItem("loginUserInfo", JSON.stringify(userInfo));//以session保存
    },
    setSelectCStatus: (state, selected) =>{
      state.select_c_status = selected;
      localStorage.setItem("select_c_status", JSON.stringify(selected))//永久保存
    },
    setSelectRStatus: (state, selected) =>{
      state.select_r_status = selected;
      localStorage.setItem("select_r_status", JSON.stringify(selected))//永久保存
    },
    setSelectSStatus: (state, selected) =>{
      state.select_s_status = selected;
      localStorage.setItem("select_s_status", JSON.stringify(selected))//永久保存
    },
  },
  actions: {}
});

export default store

