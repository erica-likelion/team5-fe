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

  const fillPercentage =
    rank === 1 ? 90 : rank === 2 ? 80 : rank === 3 ? 70 : 60;


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
          {tierType === "individual" && <S.TierName>개인</S.TierName>}
          <S.Points>{userPoints.toLocaleString()}P</S.Points>
        </S.ScoreInfo>
      </S.Box>
      <S.ProgressBar fillPercentage={fillPercentage} />
    </S.Container>
  );
};

export default ScoreBar;
