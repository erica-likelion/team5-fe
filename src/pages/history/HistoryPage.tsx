

import { useEffect, useState } from 'react';
import HistoryHeader, { type UserProps } from '../../components/history/HistoryHeader';
import HistoryList from '../../components/history/HistoryList';
import ViewToggle from '../../components/history/ViewToggle';
import WeeklyReport from '../../components/history/WeeklyReport'; 
import styles from './HistoryPage.module.css';

import { mapToHistoryByDate } from "./mapHistory";
import { getMonthWeekAnchorsFor, buildWeeklyData} from "./mapHistory";
import type { HistoryByDate, ViewType, WeeklyData } from "./types";



import api from '../../api/axios';  

export function HistoryPage() {
  const [view, setView] = useState<ViewType>('day');

  // ✅ 유저 상태
  const [user, setUser] = useState<UserProps | null>(null);
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);

  // ✅ 히스토리 상태
  const [historyData, setHistoryData] = useState<HistoryByDate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ 주간 데이터 상태
  const [monthWeekly, setMonthWeekly] = useState<WeeklyData[]>([]);
  const [monthLoading, setMonthLoading] = useState(false);
  const [monthError, setMonthError] = useState<string|null>(null);

  const userId = 7; // TODO: 실제 로그인 사용자 ID로 대체

  

  // 1) 유저 API 호출 (/api/users/{id})
  useEffect(() => {
    const fetchUser = async () => {
      setUserLoading(true);
      setUserError(null);
      try {
        const res = await api.get<{ code:number; message:string; data:UserProps }>(
          `/api/users/${userId}`
        );
        setUser(res.data.data); // ✅ 응답 래퍼에서 data만 추출
        console.log("Fetched User:", res.data.data);
      } catch (e: any) {
        setUserError(e?.response?.data?.message || '사용자 정보 불러오기 실패');
      } finally {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  // 2) 히스토리 API 호출 (/api/points/user/{id}/type/all)
  useEffect(() => {
  if (view !== 'day' || !user) return; // ✅ user 로딩 후 실행

  const fetchHistory = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.get(`/api/points/user/${userId}/type/all`);
      // 총합 후보: pointsTotal → 없으면 points
      const currentTotal = Number((user as any).pointsTotal ?? (user as any).points ?? 0);

      const mapped = mapToHistoryByDate(res.data.history, currentTotal); // ✅ 전달
      setHistoryData(mapped);
    } catch (e: any) {
      setError(e?.response?.data?.message || '히스토리 불러오기 실패');
    } finally {
      setIsLoading(false);
    }
  };

  fetchHistory();
}, [view, userId, user]);


  // 3)

  useEffect(() => {
  if (view !== 'week') return;

  const run = async () => {
    setMonthLoading(true);
    setMonthError(null);
    try {
      const monthDate = new Date(); // 이번 달
      const anchors = getMonthWeekAnchorsFor(monthDate); // 월요일 앵커들 (과거→최근 순일 수 있음)
      const monthNum = monthDate.getMonth() + 1;

      // 앵커와 데이터를 같이 보관
      const pairs = await Promise.all(
        anchors.map(async (a) => {
          const data = await buildWeeklyData(userId, a, { restrictToMonth: monthNum });
          return { anchor: a, data };
          
        })
      );
      console.log("pairs:", pairs);

      // ✅ 최신이 위로: 앵커 날짜 내림차순
      pairs.sort((a, b) => b.anchor.getTime() - a.anchor.getTime());

      setMonthWeekly(pairs.map(p => p.data));
    } catch (e: any) {
      setMonthError(e?.response?.data?.message || "이번 달 주간 데이터 불러오기 실패");
    } finally {
      setMonthLoading(false);
    }
  };
  

  run();
}, [view, userId]);

// 컴포넌트 내부 어디 위쪽에 추가
const handleBadgeClick = () => {
  // TODO: 뱃지 화면 라우팅
  console.log("뱃지 화면으로 이동!");
};
  const safeTotalPoints = Number(user?.pointsTotal ?? user?.pointsTotal ?? 0);

  return (
    <div className={styles.container}>
      {/* ✅ 유저 헤더 */}
      {userLoading ? (
        <div className={styles.loading}>⏳ 사용자 불러오는 중…</div>
      ) : userError ? (
        <div className={styles.error}>⚠️ {userError}</div>
      ) : user ? (
        <HistoryHeader user={user} onBadgeClick={handleBadgeClick} />
      ) : null}

      <div className={styles.historySection}>
        <h2 className={styles.sectionTitle}>히스토리</h2>
        <ViewToggle currentView={view} onToggle={setView} />
      </div>

      {view === 'day' ? (
        isLoading ? (
          <div className={styles.loading}>⏳ 불러오는 중…</div>
        ) : error ? (
          <div className={styles.error}>⚠️ {error}</div>
        ) : (
          <HistoryList data={historyData} />
        )
      ) : (
        monthLoading ? (
          <div className={styles.loading}>⏳ 이번 달 주간 데이터를 불러오는 중…</div>
        ) : monthError ? (
          <div className={styles.error}>⚠️ {monthError}</div>
        ) : (
          <div className={styles.weekList}>
            {monthWeekly.map((wd, i) => (
              <WeeklyReport key={`${wd.month}-${wd.week}-${i}`} data={wd} totalPoints={safeTotalPoints} />
            ))}
          </div>
        )
      )}


    </div>
  );
}

export default HistoryPage;
