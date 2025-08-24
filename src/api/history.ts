// // history.ts
// // 최근 내역 관련 API 호출 함수 모음

// export interface RecentHistory {
//   brand: string; // 브랜드명
//   time: string; // 사용 시간 및 PET 구분 등
//   type: string; // 등급(Excellent, Perfect 등)
//   rating: string; // 등급 상세
//   points: number; // 획득 포인트
//   totalPoints: number; // 누적 포인트
// }

// export async function fetchRecentHistories(): Promise<RecentHistory[]> {
//   // TODO: 실제 API 엔드포인트로 변경 필요
//   const response = await fetch('/api/history/recent');
//   if (!response.ok) {
//     throw new Error('최근 내역 조회 실패');
//   }
//   return response.json();
// }

// src/api/history.ts
// 최근 내역 관련 API 호출 함수 모음 (MainPage에서 사용)
import api from "./axios";

export interface RecentHistory {
  brand: string;      // 브랜드/장소명 (백엔드 title 매핑)
  time: string;       // 'HH:mm'
  type: string;       // photo | badge (또는 등급 문자열로 커스텀)
  rating: string;     // 등급 상세(필요 없으면 빈 문자열)
  points: number;     // 획득 포인트
  totalPoints: number;// 누적 포인트
}

// ✅ 백엔드 응답 아이템 (필드명은 실제 스펙에 맞게 필요 시 수정)
type BackendHistoryItem = {
  id: number;
  userId: number;
  type: "photo" | "badge";
  title: string;
  createdAt: string;     // ISO
  points: number;
  totalPoints: number;
  // rating, icon 등 추가 필드가 있으면 여기에 확장
};

// 단일 아이템 매핑 (백엔드 → RecentHistory)
function mapBackendToRecentHistory(it: BackendHistoryItem): RecentHistory {
  const d = new Date(it.createdAt);
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");

  return {
    brand: it.title ?? "",
    time: `${hh}:${mi}`,
    type: it.type,
    rating: "",                 // 서버가 주면 여기 매핑 규칙 추가
    points: it.points ?? 0,
    totalPoints: it.totalPoints ?? 0,
  };
}

/**
 * 최근 내역 조회 (MainPage에서 카드 리스트로 사용)
 * @param userId - 기본 1 (필요 시 호출부에서 주입)
 * @param limit  - 최근 n개만 필요하면 제한
 */
export async function fetchRecentHistories(
  userId: number = 1,
  limit?: number
): Promise<RecentHistory[]> {
  const { data } = await api.get<BackendHistoryItem[]>(
    `/api/points/user/${userId}/type/all`
  );

  const mapped = (data ?? []).map(mapBackendToRecentHistory);

  // createdAt 기반 “정확한” 최신순이 필요하면 백엔드에서 정렬해 오거나,
  // 여기서 data를 createdAt으로 먼저 sort한 뒤 map하세요.
  // 지금은 시각만 쓰는 카드이므로 그대로 사용.
  return typeof limit === "number" ? mapped.slice(0, limit) : mapped;
}
