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

// 프로필 영역
export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  margin-bottom: 24px;
`;

export const ProfileImage = styled.img`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #eee;
`;

export const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const UserName = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: #222;
  letter-spacing: -1.12px;
`;

export const UserSchool = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #777;
`;

export const NameSchool = styled.div`
  display: flex;
  flex-direction: row;
  gap:4px;
  letter-spacing: -0.48px;
`;
