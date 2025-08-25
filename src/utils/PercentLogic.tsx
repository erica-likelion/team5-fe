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

/**
 * Calculates the user's current tier and the percentage of progress toward the next tier.
 * @param userPoints The user's current points.
 * @returns An object containing the current tier, the next tier, and the calculated fill percentage.
 */
export const calculateTierAndPercentage = (userPoints: number, tiers: typeof personalTiers) => {
  // Find the index of the current tier
  const currentTierIndex = tiers.findIndex(tier => userPoints < tier.minPoints) - 1;
  

  // Get the current and next tier objects, handling the case of the last tier
  const currentTier = tiers[currentTierIndex] || tiers[tiers.length - 1];
  const nextTier = tiers[currentTierIndex + 1];

  let percentage = 100;
  if (nextTier) {
    const progress = userPoints - currentTier.minPoints;
    const totalNeeded = nextTier.minPoints - currentTier.minPoints;
    percentage = 50 + (progress / totalNeeded) * 50;
  }

  // Ensure the percentage doesn't exceed 100
  const fillPercentage = Math.min(percentage, 100);

  return {
    currentTier,
    nextTier,
    fillPercentage,
  };
}