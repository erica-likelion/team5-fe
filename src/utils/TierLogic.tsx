// TierLogic.ts

// Define the tier information
export const tiers = [
  { name: '씨앗', minPoints: 0, color: '#8BC34A' },
  { name: '새싹', minPoints: 20, color: '#FFC107' },
  { name: '떡잎', minPoints: 100, color: '#4CAF50' },
  { name: '어린나무', minPoints: 800, color: '#673AB7' },
  { name: '숲', minPoints: 1600, color: '#5a69ecff' },
  { name: '울창한 숲', minPoints: 2400, color: '#003a15ff' },
];

/**
 * Calculates the user's current tier and the percentage of progress toward the next tier.
 * @param userPoints The user's current points.
 * @returns An object containing the current tier, the next tier, and the calculated fill percentage.
 */
export const calculateTierAndPercentage = (userPoints: number) => {
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
};