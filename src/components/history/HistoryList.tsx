
// src/components/history/HistoryList.tsx

import React from 'react';
import HistoryItem from './HistoryItem';
import styles from './HistoryList.module.css';

// API 명세서에 맞춰 새로운 데이터 타입을 정의합니다.
interface ActivityItem {
  type: "photo" | "badge";
  title: string;
  time: string;
  points: number;
  totalPoints: number;
  icon: string;
}

interface DailyHistory {
  date: string;
  activities: ActivityItem[]; // 'items'를 'activities'로 변경
}

interface HistoryListProps {
  data: DailyHistory[];
}

// const HistoryList: React.FC<HistoryListProps> = ({ data }) => {
//   return (
//     <div className={styles.listContainer}>
//       {/* 데이터 배열을 map 함수로 순회하며 날짜별로 그룹화합니다. */}
//       {data.map((group) => (
//         <div key={group.date} className={styles.dayGroup}>
//           <h2 className={styles.date}>{group.date}</h2>
//           <div className={styles.itemsWrapper}>
//             {/* 각 날짜 그룹의 activities를 순회하며 HistoryItem을 렌더링합니다. */}
//             {group.activities.map((item, index) => (
//               <HistoryItem key={`${item.title}-${item.time}-${index}`} item={item} />
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default HistoryList;



const HistoryList: React.FC<HistoryListProps> = ({ data }) => {
  return (
    <div className={styles.listContainer}>
      <div className={styles.timelineWrapper}>
        {data.map((group) => (
          <div key={group.date} className={styles.dayGroup}>
            <div className={styles.date}>{group.date}</div>
            <div className={styles.itemsWrapper}>
              {group.activities.map((item, index) => (
                <HistoryItem key={`${item.title}-${item.time}-${index}`} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;