// TierLogic.ts

// Define the tier information
export const personalTiers = [
  { name: '씨앗', minPoints: 0},
  { name: '새싹', minPoints: 20},
  { name: '떡잎', minPoints: 100},
  { name: '어린나무', minPoints: 800},
  { name: '숲', minPoints: 1600},
  { name: '울창한 숲', minPoints: 2400},
];

export const campusTiers = [
  { name: '씨앗', minPoints: 200},
  { name: '새싹', minPoints: 1000},
  { name: '떡잎', minPoints: 2000},
  { name: '어린나무', minPoints: 8000},
  { name: '숲', minPoints: 18000},
  { name: '울창한 숲', minPoints: 36000},
];

export const departmentTiers = [
  { name: '씨앗', minPoints: 100},
  { name: '새싹', minPoints: 5000},
  { name: '떡잎', minPoints: 1000},
  { name: '어린나무', minPoints: 4000},
  { name: '숲', minPoints: 9000},
  { name: '울창한 숲', minPoints:18000},
];

// ✅ 새 함수: 다음 티어까지 남은 포인트 계산
type Tier = { name: string; minPoints: number };

export const calculateTierAndRemaining = (
  userPoints: number,
  tiers: Tier[]
) => {
  // 방어적으로 복사 후 minPoints 오름차순 정렬 (tiers가 뒤섞여 있어도 안전)
  const sorted = [...tiers].sort((a, b) => a.minPoints - b.minPoints);

  // 현재 티어 index 찾기: userPoints 이상 가능한 최대 인덱스
  let currentIdx = 0;
  for (let i = 0; i < sorted.length; i++) {
    if (userPoints >= sorted[i].minPoints) currentIdx = i;
    else break;
  }

  const currentTier = sorted[currentIdx];
  const nextTier = sorted[currentIdx + 1] ?? null;

  // 다음 티어까지 남은 포인트 (최고 티어면 0)
  const remainingPoints = nextTier ? Math.max(0, nextTier.minPoints - userPoints) : 0;

  // (옵션) 다음 티어까지 총 필요 포인트
  const totalToNext = nextTier ? nextTier.minPoints - currentTier.minPoints : 0;

  return { currentTier, nextTier, remainingPoints, totalToNext };
};

// (원하면 숫자만 바로 받을 수 있게 헬퍼도 제공)
export const pointsToNextTier = (userPoints: number, tiers: Tier[]) => calculateTierAndRemaining(userPoints, tiers).remainingPoints;