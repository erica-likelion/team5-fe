import React, { useEffect, useState } from 'react';

import type { UserData } from '../../api/user';
import { fetchUserData } from '../../api/user';

import type { RecentHistory } from '../../api/history';
import { fetchRecentHistories } from '../../api/history';

import type { News } from '../../api/news';
import { fetchNewsList } from '../../api/news';

export const MainPage: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [recentHistories, setRecentHistories] = useState<RecentHistory[]>([]);
  const [newsList, setNewsList] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        // 각각 다른 API에서 데이터 병렬 요청 가능
        const [user, histories, news] = await Promise.all([
          fetchUserData(),
          fetchRecentHistories(),
          fetchNewsList(),
        ]);
        setUserData(user);
        setRecentHistories(histories);
        setNewsList(news);
      } catch (err: any) {
        setError(err.message || '데이터 로딩 오류');
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
  if (!userData) return <div>유저 데이터 없음</div>;

  return (
    <div className="homepage-container">
      {/* 프로필 & 등급 */}
      <div className="profile-section">
        <div className="grade">{userData.grade} {userData.nickname}님</div>
        <div className="points">{userData.remainPoints.toLocaleString()}p 남았어요.</div>
        <div className="progress-bar" />
      </div>

      {/* 최근 내역 */}
      <div className="recent-history-section">
        <div className="section-header">
          <span>최근 내역</span>
          <button className="more-btn" onClick={() => window.location.href = '/History'}>
            더보기 &gt;
          </button>
        </div>
        <div className="history-list">
          {recentHistories.map((item, index) => (
            <div className="history-item" key={index}>
              <div className="history-brand">{item.brand}</div>
              <div className="history-detail">
                <span className="history-type">{item.type}</span>
                <span className="history-rating">{item.rating}</span>
                <span className="history-points">{item.points}P</span>
              </div>
              <div className="history-total">{item.totalPoints.toLocaleString()}P</div>
            </div>
          ))}
        </div>
      </div>

      {/* 내 소식 */}
      <div className="news-section">
        <div className="section-header">내 소식</div>
        <div className="news-list">
          {newsList.map((news, index) => (
            <div className="news-item" key={index}>
              <div className="news-icon">{/* 아이콘 또는 이미지 삽입 */}</div>
              <div className="news-text">
                <div className="news-title">{news.title}</div>
                <div className="news-desc">{news.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
