// src/api/user.ts

import apiClient from "./axios";

export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  level: number;
  pointsTotal: number;
  college: string;
  campus: string;
  createdAt: string;
  updatedAt: string;
}

export const getUser = async (id: number): Promise<User> => {
  try {
    const response = await apiClient.get(`/api/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("API response:", response.data);

if (response.data && response.data.success === true && response.data.data) {
  return response.data.data;
} else {
  throw new Error("사용자 정보를 불러오는데 실패했습니다.");
}
} catch (error: any) {
    throw new Error(error.message || "사용자 API 요청중 오류가 발생했습니다.");
  }
};
