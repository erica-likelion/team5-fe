import styled, { css } from 'styled-components';

export const Container = styled.div<{ color: string }>`
  
  height: 90px;
  border-radius: 9px;
  align-items: center;
  position: relative;
  padding-left: 15px;
  background-color: ${props => props.color};
  color: white;
  margin-bottom: 9px;
`;

export const Box = styled.div<{ fillPercentage: number }>`
  
  width: ${props => props.fillPercentage}%;
  display: flex;
  justify-content: space-between;
  align-items: end;

`;

export const ProgressBar = styled.div<{ fillPercentage: number }>`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: ${props => 100 - props.fillPercentage}%; // 채워지지 않은 부분
  background-color: rgba(255, 255, 255, 0.2); // 빗금 배경
  z-index: 0; /* 텍스트 아래에 위치하도록 설정 */

  /* 빗금 패턴 */
  ${props =>
    props.fillPercentage < 100 &&
     css`
      background-image: linear-gradient(
       -45deg,
       rgba(255, 255, 255, 0.2) 25%, /* 투명도를 줘서 텍스트가 보이게 함 */
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
  z-index: 1; 
  flex: 1;
  margin-top: 3px;
`;

export const ScoreInfo = styled.div`
  z-index: 1; 
  text-align: right;
  justify-content: end;
  margin-right: 12px;
  line-height: 122%;
  letter-spacing: -0.8px;
`;

export const Name = styled.div`
  font-size: 36px;
  font-weight: 500;
  letter-spacing: -1.44px;
  margin-bottom: 17px;
  line-height: 110%;
`;

export const Detail = styled.div`
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