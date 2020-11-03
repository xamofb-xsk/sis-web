import axios from "axios"
const querystring = require("querystring");

const http = axios.create({
  baseURL: "/api",
  headers: { token: sessionStorage.getItem("token")}
});

export default http;

export const login = param =>{
  return http.post("/api/auth/", param, {headers: { token: ""}});
};

export const logout = () => {
  return http.get("/api/logout", {headers: {token: ""}});
};
