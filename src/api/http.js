import axios from "axios"
const querystring = require("querystring");

const http = axios.create({
  baseURL: "/api",
});

export default http;

export const login = param =>{
  return http.post("/api/auth/", param);
};
