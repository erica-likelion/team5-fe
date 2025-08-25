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
  id: number; // 히스토리 식별자
  userId: number; // 사용자 식별자
  type: string; // "AI_ANALYSIS" 등
  points: number; // 적립 포인트
  description?: string; // 설명
  imageId?: number | null; // 이미지 식별자, null 허용
  createdAt: string; // 생성일시
  updatedAt?: string; // 수정일시
  image?: PointImage; // 이미지 정보 (없어도 가능)
  wasteType?: string; // 폐기물 종류 (예: "PLASTIC")
}

export interface EarnedHistoryResponse {
  totalPoint: number;
  history: PointHistory[];
}

export interface News {
  id: number;
  userId: number;
  type: string;
  points: number;
  description: string;
  createdAt: string;
  updatedAt?: string;
}

/**
 * 특정 사용자의 포인트 적립(EARNED) 내역 중 최신 2건을 가져오기
 */
export const getRecentEarnedHistories = async (
  userId: number
): Promise<EarnedHistoryResponse> => {
  try {
    const response = await apiClient.get(`/api/points/user/${userId}/type/all`);
    console.log("전체 히스토리:", response.data.history);
    // history 배열 최신 2개만 필터링
    const earnedHistoryList = response.data.history
      .filter((item: PointHistory) => item.type === "AI_ANALYSIS")
      .sort(
        (a: PointHistory, b: PointHistory) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 2);
      console.log("AI_ANALYSIS 타입 필터 후:", earnedHistoryList);
    return {
      totalPoint: response.data.totalPoint,
      history: earnedHistoryList,
    };
  } catch (error) {
    console.error("포인트 히스토리 조회 실패:", error);
    throw error;
  }
};


export const getRecentNews = async (userId: number): Promise<News[]> => {
  try {
    const response = await apiClient.get(`/api/points/user/${userId}/type/all`);

    // BADGE_EARNED, PRODUCT_PURCHASE 타입 필터 후 생성일 기준 최신순 정렬
    const recentNews = response.data.history
  .filter((item: News) => item.type === "BADGE_EARNED" || item.type === "PRODUCT_PURCHASE")
  .sort((a: News, b: News) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  .slice(0, 2);


    return recentNews;
  } catch (error) {
    console.error("최근 뉴스 조회 실패:", error);
    throw error;
  }
};
