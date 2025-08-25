import React from 'react';
import styles from './HistoryHeader.module.css';

export interface UserProps {
  id: number;
  username: string;
  email: string;
  name: string;
  level: number;
  pointsTotal: number;
  college: string;
  campus: string;
  createdAt: string;
  updatedAt: string;
}

interface HistoryHeaderProps {
  user: UserProps;
  badges?: number;
  onBadgeClick: () => void;
}

const levelMap: { [key: number]: string } = {
  0: '씨앗',
  1: '새싹',
  2: '떡잎',
  3: '어린나무',
  4: '큰 나무',
  5: '숲',
  6: '울창한 숲',
};

const HistoryHeader: React.FC<HistoryHeaderProps> = ({ user, badges = 0, onBadgeClick }) => {
  const userLevelName = levelMap[user.level] || '알 수 없음';
  
  return (
    <header className={styles.header}>
      {/* 사용자 프로필 섹션 */}
      <div className={styles.profileSection}>
        {/* API 응답에 profileImageUrl이 없으므로 임시 이미지 사용 */}
        <img
          src="src/assets/profile.png" 
          alt={`${user.name} 프로필`}
          className={styles.profileImage}
        />
        <div className={styles.userInfo}>
          <div className={styles.userNameRank}>
            <span className={styles.userRank}>{userLevelName}{' '}</span>
            <span className={styles.userName}>{user.name}{' 님'}</span>
          </div>
          <p className={styles.userUniversity}>{user.campus}{' '}{user.college} </p>
        </div>
        <button onClick={onBadgeClick} className={styles.badgeButton}>
          {/* <RightArrow /> */}
        </button>
      </div>

      {/* 획득 캐시 및 뱃지 섹션 */}
      <div className={styles.statsSection}>
        <div className={styles.statBox}>
          <p className={styles.statTitle}>획득 캐시</p>
          <span className={styles.statValue}>{user.pointsTotal.toLocaleString()}</span>
        </div>
        <div className={styles.statBox} onClick={onBadgeClick}>
          <p className={styles.statTitle}>획득 뱃지</p>
          {/* props로 받은 뱃지 개수를 표시 */}
          <span className={styles.statValue}>{badges}개</span> 
        </div>
      </div>
    </header>
  );
};

export default HistoryHeader;