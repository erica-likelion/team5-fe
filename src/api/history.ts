// src/api/history.ts
import apiClient from "./axios";

export interface PointImage {
  id: number;
  filename: string;
  contentType: string;
  size: number;
  url: string;
}

export interface PointHistory {
  id: number;
  userId: number;
  type: string; // "AI_ANALYSIS" | "BADGE_EARNED" | "EARNED" | "USED" | ...
  points: number;
  description?: string;
  imageId?: number | null;
  createdAt: string; // ISO-8601
  updatedAt?: string;
  image?: PointImage;
}

/**
 * 특정 사용자의 포인트 적립(EARNED) 내역 중 최신 2건을 가져오기
 */
export const getRecentEarnedHistories = async (userId: number): Promise<PointHistory[]> => {
  try {
    const response = await apiClient.get<PointHistory[]>(
      `/api/points/user/${userId}/type/all`
    );

    // EARNED 타입만 필터 후 생성일 기준 최신순 정렬
    const earnedHistories = response.data
      .filter((item) => item.type === "EARNED")
      .sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 2); // 최신 2개만

    return earnedHistories;
  } catch (error) {
    console.error("포인트 히스토리 조회 실패:", error);
    throw error;
  }
};
