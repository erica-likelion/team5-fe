import * as S from './ScoreBar.styled';
import { calculateTierAndRemaining, personalTiers, campusTiers, departmentTiers } from '@utils/TierLogic';

interface ScoreBarProps {
  userName: string;
  userPoints: number;
  school: string;
  department: string;
  tierType: 'individual' | 'campus' | 'department';
  rank: number;
  isuserbar: boolean;
}

const ScoreBar = ({ userName, userPoints, school, department, tierType, rank, isuserbar }: ScoreBarProps) => {

  const tiers = tierType === 'campus' ? campusTiers : tierType === 'department' ? departmentTiers : personalTiers;
  const { currentTier} = calculateTierAndRemaining(userPoints, tiers);

  const fillpercentage = rank === 1 ? 90 : rank === 2 ? 80 : rank === 3 ? 70 : 60;


  return (
    <S.Container $rank={rank} $isuserbar={isuserbar}>
      <S.Box $fillPercentage={fillpercentage}>
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
          {tierType === "individual" && <S.TierName>{currentTier.name}</S.TierName>}
          <S.Points>{userPoints.toLocaleString()}P</S.Points>
        </S.ScoreInfo>
      </S.Box>
      <S.ProgressBar $fillPercentage={fillpercentage} />
    </S.Container>
  );
};

export default ScoreBar;