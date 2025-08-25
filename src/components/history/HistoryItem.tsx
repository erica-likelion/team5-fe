


// src/components/history/HistoryItem.tsx
import React from 'react';
import styles from './HistoryItem.module.css';
import badgeIcon from '../../assets/badge.svg';

// 새로운 API 응답에 맞춰 아이템 데이터의 타입을 정의합니다.
interface ActivityItem {
  type: 'photo' | 'badge';
  title: string;
  time: string;
  points: number;
  totalPoints: number;
  icon: string; // API 명세서에 'imageUrl'로 변경될 수 있으니 확인이 필요합니다.
}

interface HistoryItemProps {
  item: ActivityItem;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => {
  return (
    <div className={styles.itemContainer}>
      <img
        src={badgeIcon}
        alt={`${item.title} 아이콘`} // alt 텍스트도 shopName에서 title로 변경
        className={styles.itemIcon}
      />
      <div className={styles.infoSection}>
        {/* <h3 className={styles.shopName}>{item.title}</h3> shopName에서 title로 변경 */}
        <h3 className={styles.shopName} title={item.title}>
          {item.title}
        </h3>

        <p className={styles.time}>{item.time}</p>
      </div>
      <div className={styles.pointSection}>
        <span className={styles.points}>+{item.points.toLocaleString()}P</span>
        <span className={styles.totalPoints}>{item.totalPoints.toLocaleString()}P</span>
      </div>
    </div>
  );
};

export default HistoryItem;