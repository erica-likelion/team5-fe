// ScoreBar.tsx
import * as S from './ScoreBar.styled';
import { calculateTierAndPercentage } from '@utils/TierLogic';

interface ScoreBarProps {
  userName: string;
  userPoints: number;
  school: string;
  department: string;
}


const ScoreBar = ({ userName, userPoints, school, department }: ScoreBarProps) => {
  // Use the imported logic to calculate tier and percentage
  const { currentTier, fillPercentage } = calculateTierAndPercentage(userPoints);

  return (
    <S.Container color={currentTier.color}>
      <S.Box fillPercentage={fillPercentage}>
        <S.TextInfo>
          <S.Name>{userName}</S.Name>
          <S.Detail>
            {school}
            <br />
            {department}
          </S.Detail>
        </S.TextInfo>
        <S.ScoreInfo>
          <S.TierName>{currentTier.name}</S.TierName>
          <S.Points>{userPoints.toLocaleString()}P</S.Points>
        </S.ScoreInfo>
      </S.Box>
      <S.ProgressBar fillPercentage={fillPercentage} />
    </S.Container>
  );
};

export default ScoreBar;