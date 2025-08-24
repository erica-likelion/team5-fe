// history.ts
// 최근 내역 관련 API 호출 함수 모음

export interface RecentHistory {
  brand: string; // 브랜드명
  time: string; // 사용 시간 및 PET 구분 등
  type: string; // 등급(Excellent, Perfect 등)
  rating: string; // 등급 상세
  points: number; // 획득 포인트
  totalPoints: number; // 누적 포인트
}

export async function fetchRecentHistories(): Promise<RecentHistory[]> {
  // TODO: 실제 API 엔드포인트로 변경 필요
  const response = await fetch('/api/history/recent');
  if (!response.ok) {
    throw new Error('최근 내역 조회 실패');
  }
  return response.json();
}
