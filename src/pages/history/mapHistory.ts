// src/pages/history/mapHistory.ts
import type { HistoryActivity, HistoryByDate } from "./types";

// ✅ 백엔드 응답(실제 스키마)
type BackendPointItem = {
  id: number;
  userId: number;
  type: "AI_ANALYSIS" | "BADGE_EARNED" | "PRODUCT_PURCHASE" | "EARNED" | "USED" | string;
  points: number;            // 양수=적립, 음수=사용
  description?: string;      // 타이틀 대용
  imageId?: number | null;
  createdAt: string;         // "2025-08-24T15:30:00"
  updatedAt?: string;
  image?: {
    id: number;
    filename: string;
    contentType: string;
    size: number;
    url: string;             // 예: "/api/points/images/file/123"
  };
};

// 서버 상대경로 → 절대경로로 보정
function toAbsoluteUrl(url?: string): string {
  if (!url) return "https://placehold.co/80x80";
  if (/^https?:\/\//i.test(url)) return url;
  // .env에 VITE_API_BASE가 있으면 사용, 없으면 현재 origin을 기본값으로
  const base = (import.meta as any)?.env?.VITE_API_BASE ?? window.location.origin;
  return `${base}${url.startsWith("/") ? url : `/${url}`}`;
}

// 백엔드 type → 화면 type 매핑
function mapType(t: BackendPointItem["type"]): "photo" | "badge" {
  if (t === "BADGE_EARNED") return "badge";
  return "photo"; // 그 외는 일단 활동(사진) 카테고리로
}

/**
 * 백엔드 배열 → 화면용 데이터(날짜별 그룹, 시간 포맷, 최신순 정렬)로 변환
 * - description → title
 * - createdAt → 'MM.DD' / 'HH:mm'
 * - image.url → 절대 URL 보정
 * - totalPoints: 응답에 없으므로 생략(옵션)
 */
export function mapToHistoryByDate(items: BackendPointItem[]): HistoryByDate[] {
  const byDate: Record<string, HistoryActivity[]> = {};

  for (const it of items ?? []) {
    const d = new Date(it.createdAt);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    const dateKey = `${mm}.${dd}`;

    const activity: HistoryActivity = {
      type: mapType(it.type),
      title: it.description ?? (it.type === "BADGE_EARNED" ? "뱃지 획득" : "활동"),
      time: `${hh}:${mi}`,
      points: it.points,
      totalPoints: 0, // 응답에 totalPoints가 없으므로 0으로 설정하거나 옵션 처리
      icon: toAbsoluteUrl(it.image?.url),
    };

    (byDate[dateKey] ??= []).push(activity);
  }

  // 날짜 역순 정렬 (최근일자 먼저)
  return Object.keys(byDate)
    .sort((a, b) => {
      const [am, ad] = a.split(".").map(Number);
      const [bm, bd] = b.split(".").map(Number);
      if (am !== bm) return bm - am;
      return bd - ad;
    })
    .map((date) => ({ date, activities: byDate[date] }));
}
