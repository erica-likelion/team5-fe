// news.ts
// 내 소식(알림) 관련 API 호출 함수 모음

export interface News {
  icon: string; // 아이콘 정보 (URL 또는 아이콘명)
  title: string; // 소식 제목
  description: string; // 소식 내용/설명
}

export async function fetchNewsList(): Promise<News[]> {
  // TODO: 실제 API 엔드포인트로 변경 필요
  const response = await fetch('/api/news/list');
  if (!response.ok) {
    throw new Error('내 소식 조회 실패');
  }
  return response.json();
}
