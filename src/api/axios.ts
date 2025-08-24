// src/api/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.myapp.com", // 공통 URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
