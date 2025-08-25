// src/api/axios.ts
import axios from "axios";

// 개발 단계용 고정 토큰 (나중엔 로그인 인증 결과로 대체)
const ACCESS_TOKEN = "cc25e466-fc6c-4d24-8a63-6f3cba41cbd0";

// 공통 axios 인스턴스
const apiClient = axios.create({
  baseURL: "http://43.203.226.243:8080", // 실제 서버 주소 작성
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export default apiClient;
