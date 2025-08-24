// src/components/history/WeeklyReport.tsx
import React from 'react';
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

interface WeeklyData {
  month: number;
  week: number;
  rewardsByDay: { day: string; reward: number }[];
  totalRewards: number;
  totalCollections: number;
  newBadge: string;
}

interface WeeklyReportProps {
  data: WeeklyData;
}

const mintPalette = ['#bfeee0', '#13c29a', '#10b089', '#a4e3d3']; // 연~진 민트 4톤

const WeeklyReport = ({ data }: WeeklyReportProps) => {
  // 라인도 같은 값을 사용해 '추이' 느낌만 살림
  const chartData = data.rewardsByDay.map(d => ({ ...d, trend: d.reward }));

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
            {/* X축: 아래 라인만, 눈금/축 라벨 최소화 */}
            <XAxis
              dataKey="day"
              axisLine={{ stroke: '#cfcfcf', strokeWidth: 2 }}
              tickLine={false}
              tick={false}
              tickMargin={0}
            />
            
            {/* Y축 숨김 (값 숫자는 안 보여줌) */}
            <YAxis hide />

            <Tooltip
              cursor={{ fill: 'rgba(0,0,0,0.04)' }}
              formatter={(v: number) => [`${v.toLocaleString()}P`, '포인트']}
              labelStyle={{ color: '#444' }}
              contentStyle={{
                borderRadius: 8,
                border: '1px solid #e5e7eb',
              }}
            />

            {/* 막대: 라운드, 간격 좁게, 파레트 순환 */}
            <Bar
              dataKey="reward"
              barSize={32}
              radius={0}
              maxBarSize={32}
              
            >
              {chartData.map((_, i) => (
                <Cell key={`bar-${i}`} fill={mintPalette[i % mintPalette.length]} />
              ))}
            </Bar>

            {/* 라인: 점 없이 얇은 선으로 추이만 */}
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
          <p>다음 단계까지 6,839P 남았어요.</p>
        </div>
        <div className={styles.summaryItem}>
          <div className={styles.dot}></div>
          <p>총 {data.totalCollections}회의 분리수거를 성공했어요.</p>
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
