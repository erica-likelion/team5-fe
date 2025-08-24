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
