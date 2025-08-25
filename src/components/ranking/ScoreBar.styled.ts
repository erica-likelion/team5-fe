import styled, { css } from 'styled-components';

const rankColors = {
  1: '#31BED6',
  2: '#EBC230',
  3: '#BBD631',
  default: '#F0F1F3',
};

const userBarColor = '#42B68F';

export const Container = styled.div<{ $rank: number; $isuserbar?: boolean }>`
  height: 90px;
  border-radius: 9px;
  position: relative;
  background-color: ${props => {
    if (props.$isuserbar) {
      return userBarColor; // Use the fixed color for the user bar
    }
    if (props.$rank === 1) return rankColors[1];
    if (props.$rank === 2) return rankColors[2];
    if (props.$rank === 3) return rankColors[3];
    return rankColors.default;
  }};
  color: ${props => (props.$rank < 4 ? 'white' : '#757575')};
  margin-bottom: 9px;
`;

export const Box = styled.div<{ $fillPercentage: number }>`
  width: ${props => props.$fillPercentage}%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px
`;

export const ProgressBar = styled.div<{ $fillPercentage: number }>`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: ${props => 100 - props.$fillPercentage}%;
  background-color: rgba(255, 255, 255, 0.2);
  z-index: 0;

  ${props =>
    props.$fillPercentage < 100 &&
      css`
        background-image: linear-gradient(
          -45deg,
          rgba(255, 255, 255, 0.2) 25%,
          transparent 25%,
          transparent 50%,
          rgba(255, 255, 255, 0.2) 50%,
          rgba(255, 255, 255, 0.2) 75%,
          transparent 75%,
          transparent
        );
        background-size: 20px 20px;
      `}
`;

export const TextInfo = styled.div`
  bottom: 10px;
  left: 15px;
  z-index: 1;
`;

export const ScoreInfo = styled.div`
  position: absolute;
  bottom: 10px;
  right: 12px;
  z-index: 1;
  text-align: right;
`;

export const Name = styled.div`
  font-size: 25px;
  font-weight: 500;
  letter-spacing: -1.44px;
  margin-bottom: 5px;
  line-height: 110%;
`;

export const Detail = styled.div`
  margin-top: 15px;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: -0.4px;
  line-height: 122%;
`;

export const TierName = styled.div`
  font-size: 20px;
  font-weight: 400;
`;

export const Points = styled.div`
  font-size: 20px;
  font-weight: 400;
`
