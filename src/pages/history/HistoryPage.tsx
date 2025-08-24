import React, { useState } from 'react';
import HistoryHeader from '../../components/history/HistoryHeader';
import HistoryList from '../../components/history/HistoryList';
import ViewToggle from '../../components/history/ViewToggle';
import WeeklyReport from '../../components/history/WeeklyReport'; 
import styles from './HistoryPage.module.css';

export function HistoryPage() {

  const [view, setView] = useState<'day' | 'week'>('day');

  // API 응답에 맞춰 수정된 userData 더미 데이터
  const userData = {
    id: 1,
    username: "김지수",
    email: "jane@example.com",
    name: "지수",
    level: 3,
    pointsTotal: 1250,
    college: "소프트웨어융합대학",
    campus: "한양대학교 ERICA",
    createdAt: "2025-08-20T12:34:56",
    updatedAt: "2025-08-21T01:00:00"
  };

const historyData: {
  date: string;
  activities: {
    type: "photo" | "badge";
    title: string;
    time: string;
    points: number;
    totalPoints: number;
    icon: string;
  }[];
}[] = [
  {
    date: '08.11',
    activities: [
      { type: "photo", title: '블루포트', time: '11:28', points: 250, totalPoints: 19344, icon: 'https://images.unsplash.com/photo-1534528736688-6c84c4786411?w=800&q=80' },
      { type: "badge", title: '성실한 1.5도씨 획득', time: '09:30', points: 1000, totalPoints: 18344, icon: 'https://images.unsplash.com/photo-1534528736688-6c84c4786411?w=800&q=80' },
      { type: "photo", title: '스타벅스', time: '09:21', points: 200, totalPoints: 18094, icon: 'https://images.unsplash.com/photo-1534528736688-6c84c4786411?w=800&q=80' },
    ],
  },
  {
    date: '08.10',
    activities: [
      { type: "photo", title: '투썸플레이스', time: '21:47', points: 250, totalPoints: 17884, icon: 'https://images.unsplash.com/photo-1534528736688-6c84c4786411?w=800&q=80' },
      { type: "photo", title: 'GS25', time: '20:08', points: 250, totalPoints: 17594, icon: 'https://images.unsplash.com/photo-1534528736688-6c84c4786411?w=800&q=80' },
      { type: "photo", title: 'GS25', time: '20:08', points: 200, totalPoints: 17394, icon: 'https://images.unsplash.com/photo-1534528736688-6c84c4786411?w=800&q=80' },
    ],
  },
  {
    date: '08.09',
    activities: [
      { type: "photo", title: '투썸플레이스', time: '21:47', points: 250, totalPoints: 17884, icon: 'https://images.unsplash.com/photo-1534528736688-6c84c4786411?w=800&q=80' },
      { type: "photo", title: 'GS25', time: '20:08', points: 250, totalPoints: 17594, icon: 'https://images.unsplash.com/photo-1534528736688-6c84c4786411?w=800&q=80' },
      { type: "photo", title: 'GS25', time: '20:08', points: 200, totalPoints: 17394, icon: 'https://images.unsplash.com/photo-1534528736688-6c84c4786411?w=800&q=80' },
    ],
  },
];

  // 주간 리포트 더미 데이터
  const weeklyData = {
    month: 8,
    week: 1,
    rewardsByDay: [
      { day: '일', reward: 1200 },
      { day: '월', reward: 300 },
      { day: '화', reward: 1500 },
      { day: '수', reward: 1800 },
      { day: '목', reward: 800 },
      { day: '금', reward: 2200 },
      { day: '토', reward: 1000 },
    ],
    totalRewards: 6839,
    totalCollections: 24,
    newBadge: '성실한 수호자',
  };

  const handleBadgeClick = () => {
    console.log("뱃지 화면으로 이동!");
  };

  const handleViewToggle = (selectedView: 'day' | 'week') => {
    setView(selectedView);
  };

  return (
    <div className={styles.container}>
      <HistoryHeader user={userData} onBadgeClick={handleBadgeClick} />
      
      <div className={styles.historySection}>
        <h2 className={styles.sectionTitle}>히스토리</h2>
        <ViewToggle currentView={view} onToggle={handleViewToggle} />
      </div>

      {view === 'day' ? (
        <HistoryList data={historyData} />
        // <WeeklyReport data={weeklyData} />
      ) : (
        <WeeklyReport data={weeklyData} />
      )}
    </div>
  );
};
