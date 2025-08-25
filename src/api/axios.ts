// src/api/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://43.203.226.243:8080", // 공통 URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
