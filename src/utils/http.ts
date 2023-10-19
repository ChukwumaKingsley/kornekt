import axios from "axios";

axios.defaults.headers.common["x-auth-token"] = `Bearer ${localStorage.getItem("token") ?? ""}`;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token") ?? " "}`;

const http = axios.create({
	baseURL: "http://127.0.0.1:8000",
	timeout: 10000,
});

export default http;