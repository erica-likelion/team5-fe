import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
`;


export const RankingList = styled.div`
  overflow-y: auto;
  max-height: 500px; /* Adjust this value as needed */
  -webkit-overflow-scrolling: touch; /* For smoother scrolling on iOS */

  /* Optional: Hide scrollbar for aesthetics */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;