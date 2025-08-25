// src/components/history/WeeklyReport.tsx
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import styles from './WeeklyReport.module.css';
import { personalTiers, calculateTierAndRemaining } from '@utils/TierLogic';
import { useMemo } from 'react';

// 공용 타입
import type { WeeklyData } from '../../pages/history/types';

type WeeklyReportProps = {
  data: WeeklyData;
  /** 현재 사용자 총 포인트 (히스토리 페이지에서 전달) */
  totalPoints: number;
};

const mintPalette = ['#bfeee0', '#13c29a', '#10b089', '#a4e3d3'];

const WeeklyReport = ({ data, totalPoints }: WeeklyReportProps) => {
  // ✅ 여기서 totalPoints로 다음 티어/잔여 포인트 계산
  const { nextTier, remainingPoints } = useMemo(
    () => calculateTierAndRemaining(totalPoints, personalTiers),
    [totalPoints]
  );

  // 라인도 같은 값을 사용해 '추이' 느낌만 살림
  const chartData = (data.rewardsByDay ?? []).map(d => ({ ...d, trend: d.reward }));
  
  return (
    <div className={styles.container}>
      {/* 상단 포인트 바 */}
      <div className={styles.topAccent} />

      {/* 월/주차 헤더 */}
      <h2 className={styles.header}>
        {data.month}월 {data.week}주차
      </h2>

      {/* 그래프 영역 */}
      <div className={styles.graphSection}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 10, right: 8, left: 8, bottom: 12 }}
            barCategoryGap={0}
            barGap={0}
          >
            <XAxis
              dataKey="day"
              axisLine={{ stroke: '#cfcfcf', strokeWidth: 2 }}
              tickLine={false}
              tick={false}
              tickMargin={0}
            />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: 'rgba(0,0,0,0.04)' }}
              formatter={(v: unknown) => [`${Number(v ?? 0).toLocaleString()}P`, '포인트']}
              labelStyle={{ color: '#444' }}
              contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }}
            />
            <Bar dataKey="reward" barSize={32} radius={0} maxBarSize={32}>
              {chartData.map((_, i) => (
                <Cell key={`bar-${i}`} fill={mintPalette[i % mintPalette.length]} />
              ))}
            </Bar>
            <Line
              type="monotone"
              dataKey="trend"
              stroke="#159b80"
              strokeWidth={1.2}
              dot={false}
              activeDot={{ r: 3 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* 리포트 요약 */}
      <div className={styles.reportSummary}>
        <div className={styles.summaryItem}>
          <div className={styles.dot}></div>
          <p>
            {/* ✅ 주간 데이터에 있던 nextTierName/remainingToNext 대신 계산값 사용 */}
            다음 단계{nextTier ? `(${nextTier.name})` : ''}까지{' '}
            {Math.max(0, remainingPoints).toLocaleString()}P 남았어요.
          </p>
        </div>
        <div className={styles.summaryItem}>
          <div className={styles.dot}></div>
          <p>총 {data.recyclingCount}회의 분리수거를 성공했어요.</p>
        </div>
        <div className={styles.summaryItem}>
          <div className={styles.dot}></div>
          <p>{data.newBadge} 뱃지를 획득했어요.</p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyReport;
