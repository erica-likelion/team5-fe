// RankingButtons.styled.ts
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px; /* 버튼 사이의 간격 */
  margin-top: 30px;
  margin-bottom: 19px;
`;


export const Button = styled.button<{ $active: boolean }>`
  padding: 8px 24px;
  border-radius: 25px; /* 둥근 모서리 */
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  
  /* 활성화 상태에 따른 스타일 */
  background-color: white;
  border: 1px solid ${({ $active }) => ($active ? '#222' : '#ccc')};
  color: ${({ $active }) => ($active ? '#222' : '#999')};
  
  /* 부드러운 전환 효과 */
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #222;
    color: #222;
  }
`;
