// src/pages/history/types.ts
export type ViewType = 'day' | 'week';

export type HistoryActivityType = 'photo' | 'badge';

export interface HistoryActivity {
  type: HistoryActivityType;
  title: string;
  time: string;
  points: number;
  totalPoints: number;
  icon: string;
}

export interface HistoryByDate {
  date: string;
  activities: HistoryActivity[];
}

export interface DailyActivity {
  id: number;
  userId: number;
  activityDate: string; // 'YYYY-MM-DD'
  totalPoints: number;
  activitiesCount: number;
}

export interface WeeklyData {
  month: number;
  week: number;
  rewardsByDay: { day: string; reward: number }[]; // 그래프용
  totalRewards: number;      // 주간 포인트 합
  totalCollections: number;  // 주간 분리수거 횟수 합
  newBadge: string;          // 하드코딩
  remainingToNext: number;
  nextTierName?: string | null;
}


// (아무 곳이나 재사용 가능한 파일에—예: src/types/api.ts)
export type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};
