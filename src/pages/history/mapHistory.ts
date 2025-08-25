// src/pages/history/mapHistory.ts
import { fetchDailyActivity } from "../../api/history"; // ✅ 추가
import type { HistoryActivity, HistoryByDate, WeeklyData } from "./types"; // ✅ WeeklyData 추가
import { calculateTierAndRemaining, personalTiers } from '@utils/TierLogic';

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
  const base = (import.meta as any)?.env?.VITE_API_BASE_URL ?? window.location.origin;
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
// ⬇️ 시그니처에 currentTotal 추가
export function mapToHistoryByDate(
  items: BackendPointItem[],
  currentTotal: number = 0
): HistoryByDate[] {
  // 최신 → 과거 정렬
  const sorted = [...(items ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  let running = Number(currentTotal) || 0; // 현재 전체 누적 포인트
  const byDate: Record<string, HistoryActivity[]> = {};

  for (const it of sorted) {
    const d = new Date(it.createdAt);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    const dateKey = `${mm}.${dd}`;

    // 포인트 증감 (적립=+, 사용=-) — 필요하면 규칙 조정
    let delta = Number(it.points ?? 0);
    // 예: 타입이 USED인데 points가 양수로 올 경우 강제 음수화
    if (it.type === "USED" && delta > 0) delta = -delta;

    const activity: HistoryActivity = {
      type: mapType(it.type),
      title: it.description ?? (it.type === "BADGE_EARNED" ? "뱃지 획득" : "활동"),
      time: `${hh}:${mi}`,
      points: delta,
      totalPoints: running,     // ✅ 이 이벤트까지 반영된 누적값
      icon: toAbsoluteUrl(it.image?.url),
    };

    // 다음(과거) 이벤트로 넘어가기 전에 누적값을 되감기
    running -= delta;

    (byDate[dateKey] ??= []).push(activity);
  }

  // 날짜(키) 역순 정렬
  return Object.keys(byDate)
    .sort((a, b) => {
      const [am, ad] = a.split(".").map(Number);
      const [bm, bd] = b.split(".").map(Number);
      if (am !== bm) return bm - am;
      return bd - ad;
    })
    .map((date) => ({ date, activities: byDate[date] }));
}

// 간단 날짜 유틸
function toISO(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// 요일 한국 표기
const DAY_LABELS = ["월", "화", "수", "목", "금", "토", "일"];

/** 기준 날짜가 포함된 주(월~일)의 날짜 배열 반환 */
export function getWeekDates(anchor: Date) {
  // 한국 기준: 주 시작을 '월요일'로 가정
  const day = anchor.getDay(); // 0=일,1=월,...6=토
  const offsetToMonday = day === 0 ? -6 : 1 - day; // 일요일이면 -6, 그 외 1-day
  const monday = new Date(anchor);
  monday.setDate(anchor.getDate() + offsetToMonday);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

// /** 다음 단계까지 남은 포인트 (유틸 사용) */
// export function calcPointsToNextStage(currentPoints: number): number {
//   const { remainingPoints } = calculateTierAndRemaining(currentPoints, personalTiers);
//   return remainingPoints; // 0 이상 보장
// }

// /** 주차 마지막 기록 기준 잔여 포인트 계산
//  * @param weekItems   그 주에 속한 활동들(해당 주의 createdAt으로 필터링된 배열)
//  * @param latestTotal 화면에서 알고 있는 '최신 계정 누적 포인트'(예: /api/users/{id}.pointsTotal)
//  * @returns { remainingPoints, nextTierName, lastTotalPoints }
//  */
// export function computeWeeklyRemainingFromActivities(
//   weekItems: BackendPointItem[],
//   latestTotal: number
// ) {
//   if (!Array.isArray(weekItems) || weekItems.length === 0) {
//     return { remainingPoints: 0, nextTierName: null, lastTotalPoints: 0 };
//   }

//   // 최신 → 과거 정렬 (가장 최근 기록부터)
//   const sorted = [...weekItems].sort(
//     (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//   );

//   // 최신 누적값(latestTotal)에서 주차 내 이벤트만큼 '되감기' 하며
//   // 주차 "마지막(=가장 과거) 기록"에서의 누적 포인트를 복원
//   let running = Number(latestTotal) || 0;

//   // 최신 기록부터 하나씩 되감기
//   for (const it of sorted) {
//     // 이 이벤트가 반영되기 '직전' 누적값으로 되돌리려면 delta를 빼야 하므로,
//     // 먼저 delta를 구한다.
//     let delta = Number(it.points ?? 0);
//     if (it.type === 'USED' && delta > 0) delta = -delta; // 사용이면 음수화
//     // 현재 running은 "이 이벤트까지 모두 반영된 값"이므로,
//     // 과거로 한 스텝 이동 = running -= delta
//     running -= delta;
//   }

//   // running은 이제 "그 주차 마지막(가장 과거) 기록 '직전' 값".
//   // 하지만 우리가 원하는 건 "그 주차 마지막 '기록 이후'의 누적값"이므로,
//   // 마지막 항목의 delta를 다시 더해 최종 누적을 만든다.
//   let lastDelta = Number(sorted[sorted.length - 1].points ?? 0);
//   if (sorted[sorted.length - 1].type === 'USED' && lastDelta > 0) lastDelta = -lastDelta;
//   const lastTotalPoints = running + lastDelta;

//   const { remainingPoints, nextTier } =
//     calculateTierAndRemaining(lastTotalPoints, personalTiers);

//   return {
//     remainingPoints,
//     nextTierName: nextTier?.name ?? null,
//     lastTotalPoints,
//   };
// }


/** n주차 계산 (간단 버전): 월 기준 n주차 */
export function getMonthWeekInfo(d: Date) {
  const year = d.getFullYear();
  const month = d.getMonth(); // 0-based
  const first = new Date(year, month, 1);
  const firstDay = first.getDay() || 7; // 일=0 → 7로
  const date = d.getDate();
  const week = Math.ceil((date + firstDay - 1) / 7);
  return { month: month + 1, week };
}



export async function buildWeeklyData(
  userId: number,
  anchorDate: Date,
  opts?: { restrictToMonth?: number }, 
): Promise<WeeklyData> {
  const weekDates = getWeekDates(anchorDate);

  const results = await Promise.all(
    weekDates.map(d => fetchDailyActivity(userId, toISO(d)).catch(() => null))
  );
  console.log('results', results);

  const restrictMonth = opts?.restrictToMonth; // 1~12

  const rewardsByDay = results.map((res, idx) => {
    const inMonth = weekDates[idx].getMonth() + 1;
    const reward = (restrictMonth && inMonth !== restrictMonth)
      ? 0
      : (res?.totalPointsEarned ?? 0);
    return { day: DAY_LABELS[idx], reward };
  });

  console.log('rewardsByDay', rewardsByDay);
  const totalRewards = rewardsByDay.reduce((s, r) => s + r.reward, 0);

  const recyclingCount = results.reduce((s, r, idx) => {
  const inMonth = weekDates[idx].getMonth() + 1;
  const add = (restrictMonth && inMonth !== restrictMonth)
    ? 0
    : (r?.recyclingCount ?? 0);
  return s + add;
}, 0);

  console.log('totalrecyclingCount', recyclingCount);

  // ✅ 주차 '마지막 기록'의 totalPoints 찾기 (restrictMonth 적용)
  let lastTotalPoints = 0;
  for (let i = results.length - 1; i >= 0; i--) {
    const inMonth = weekDates[i].getMonth() + 1;
    if (restrictMonth && inMonth !== restrictMonth) continue;
    if (results[i]?.totalPoints != null) {
      lastTotalPoints = results[i]!.totalPoints;
      break;
    }
  }

  // ✅ 그 누적포인트로 잔여 포인트 계산
  const { remainingPoints, nextTier } =
    calculateTierAndRemaining(lastTotalPoints, personalTiers);

  const label = opts?.restrictToMonth
    ? getMonthWeekInfoStrict(anchorDate, anchorDate.getFullYear(), opts.restrictToMonth)
    : getMonthWeekInfoStrict(anchorDate);

  return {
    month: label.month,
    week: label.week,
    rewardsByDay,
    totalRewards,
    recyclingCount,
    newBadge: "그린 루키",
    remainingToNext: remainingPoints,
    nextTierName: nextTier?.name ?? null,
  };
}

/** 해당 monthDate(그 달 아무 날짜) 기준, 그 달에 속한 모든 주의 '월요일 앵커' 목록 */
/** 주의 월요일 반환 (이미 아래에 있음) */
// function getMonday(...) { ... }

/** 해당 달의 모든 '주(월요일 앵커)' 목록 — 4일 규칙 반영 */
export function getMonthWeekAnchorsFor(monthDate: Date): Date[] {
  const y = monthDate.getFullYear();
  const m = monthDate.getMonth() + 1; // 1~12

  const monthFirst = new Date(y, m - 1, 1);
  const monthLast  = new Date(y, m, 0);

  let firstMonday = getMonday(monthFirst);

  // 후보 주가 그 달에 포함되는 일수 세기
  const countDaysInMonth = (monday: Date) => {
    let cnt = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      if (d.getMonth() + 1 === m) cnt++;
    }
    return cnt;
  };

  // ✅ 포함 일수가 4일 미만이면 다음 주가 1주차
  if (countDaysInMonth(firstMonday) < 4) {
    firstMonday.setDate(firstMonday.getDate() + 7);
  }

  // 첫째주 월요일부터 monthLast까지 7일 간격으로 수집
  const anchors: Date[] = [];
  let cur = new Date(firstMonday);
  while (cur <= monthLast) {
    anchors.push(new Date(cur));
    cur.setDate(cur.getDate() + 7);
  }
  return anchors;
}


/** 주의 월요일 반환 */
function getMonday(d: Date) {
  const day = d.getDay(); // 0=일,1=월,...6=토
  const offsetToMonday = day === 0 ? -6 : 1 - day;
  const m = new Date(d);
  m.setDate(d.getDate() + offsetToMonday);
  m.setHours(0,0,0,0);
  return m;
}

/** 월요일 시작 + "그 달 날짜가 4일 이상 포함" 규칙으로 n주차 계산 */
export function getMonthWeekInfoStrict(
  anchor: Date,
  targetYear = anchor.getFullYear(),
  targetMonth = anchor.getMonth() + 1 // 1~12
) {
  const monthFirst = new Date(targetYear, targetMonth - 1, 1);

  // 후보 1주차(달의 첫날이 속한 주)의 월요일
  let firstMonday = getMonday(monthFirst);

  // 후보 주가 그 달에 포함되는 일수 계산
  const countDaysInMonth = (monday: Date) => {
    let cnt = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      if (d.getMonth() + 1 === targetMonth) cnt++;
    }
    return cnt;
  };

  // 규칙: 포함 일수가 4일 미만이면 다음 주가 1주차
  if (countDaysInMonth(firstMonday) < 4) {
    firstMonday.setDate(firstMonday.getDate() + 7);
  }

  const monday = getMonday(anchor);
  const diffDays = Math.floor((monday.getTime() - firstMonday.getTime()) / 86400000);
  const week = Math.floor(diffDays / 7) + 1;

  return { month: targetMonth, week: Math.max(1, week) };
}
