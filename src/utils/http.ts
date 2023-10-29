import axios from "axios";

axios.defaults.headers.common["x-auth-token"] = `Bearer ${localStorage.getItem("accessToken") || ""}`;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("accessToken") || ""}`;

const http = axios.create({
  baseURL: "https://fastapi-2.onrender.com",
  timeout: 10000,
});

export default http;