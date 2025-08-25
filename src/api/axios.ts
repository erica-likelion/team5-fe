// src/api/axios.ts
import axios from "axios";

// 개발 단계용 고정 토큰 (나중엔 로그인 인증 결과로 대체)
const ACCESS_TOKEN = "550e8400-e29b-41d4-a716-446655440000";

// 공통 axios 인스턴스
const apiClient = axios.create({
  baseURL: "https://pickle-back.o-r.kr", // 실제 서버 주소 작성
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export default apiClient;
