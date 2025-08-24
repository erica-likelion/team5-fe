import { useRef, useState, useEffect } from 'react';
import * as S from './ScoreBar.styled';
import { calculateTierAndPercentage, personalTiers, campusTiers, departmentTiers } from '@utils/TierLogic';

interface ScoreBarProps {
  userName: string;
  userPoints: number;
  school: string;
  department: string;
  tierType: 'individual' | 'campus' | 'department';
  rank: number;
  isUserBar: boolean;
}

const ScoreBar = ({ userName, userPoints, school, department, tierType, rank, isUserBar }: ScoreBarProps) => {
  const tiers = tierType === 'campus' ? campusTiers : tierType === 'department' ? departmentTiers : personalTiers;
  const { currentTier, fillPercentage } = calculateTierAndPercentage(userPoints, tiers);


  return (
    <S.Container rank={rank} isUserBar={isUserBar}>
      <S.Box fillPercentage={fillPercentage}>
        <S.TextInfo>
          <S.Name>
            {userName}
          </S.Name>
          <S.Detail>
            {school}
            <br />
            {department}
          </S.Detail>
        </S.TextInfo>
        <S.ScoreInfo>
          {tierType === 'individual' && <S.TierName>{currentTier.name}</S.TierName>}
          <S.Points>{userPoints.toLocaleString()}P</S.Points>
        </S.ScoreInfo>
      </S.Box>
      <S.ProgressBar fillPercentage={fillPercentage} />
    </S.Container>
  );
};

export default ScoreBar;
