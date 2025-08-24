import styled from "styled-components";

// 전체 컨테이너
export const Container = styled.div`
  min-height: calc(100vh - 100px); // 네비게이션바 높이만큼 빼기
`;


// 프로필 영역
export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  letter-spacing: -1.12px;
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
`;

export const UserDesc = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #777;
`;

export const RightArrowIcon = styled.img`
  width: 12px;
  height: 26px;
  flex-shrink: 0;
`;

export const CoinSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
  font-size: 24px;
  font-weight: 500;
  color: #222;
  gap: 8px;
  letter-spacing: -1.12px;
`;

export const CoinIcon = styled.img`
  width: 32px;
  height: 32px;
`;

export const CoinValue = styled.span`
font-size: 28px;
font-weight: 500;
`;

// 쿠폰/적립내역 카드 섹션
export const CardSection = styled.div`
  display: flex;
  background: #F0F1F3;
  border-radius: 17px;
  margin-top: 10px;
`;

export const Card = styled.div`
  flex: 1;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export const CardIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-bottom: 8px;
`;

export const CardLabel = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #444;
  letter-spacing: -0.72px;
`;

export const CardValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #222;
  letter-spacing: -0.8px;
`;

export const Divider = styled.div`
  width: 1.3px;
  background: #121212;
  margin: 50px 0 17px 0;
`;

// 메뉴 리스트
export const MenuList = styled.div`
  margin-top: 32px;
`;

export const MenuItem = styled.div`
  padding: 10px;
  font-size: 24px;
  font-weight: 500;
  color: #222;
  border-bottom: 1px solid #777;

  &:last-child {
    border-bottom: none;
  }
`;