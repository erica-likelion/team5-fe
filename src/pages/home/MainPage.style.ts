import styled from "styled-components";

// 전체 컨테이너
export const Container = styled.div`
  padding: 0px 21px 0px 21px;
  min-height: calc(100vh - 100px); // 네비게이션바 높이만큼 빼기
`;

// 상단 프로필 영역
export const ProfileSection = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

export const ProfileImg = styled.img`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  margin-top: 49px;
  margin-right: 16px;
  margin-bottom: 2px;
  background: #eee;
`;

// 프로필 정보
export const ProfileInfo = styled.div`
  flex: 1;
`;

export const ProfileText = styled.div`
  font-size: 28px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 8px;
  letter-spacing: -1.12px;
`;

// 회원 등급명
export const TierName = styled.span`
`;

// 남은 포인트
export const PointSpan = styled.span`
`;

// 게이지 바 컨테이너
export const ProgressBarContainer = styled.div`
  width: 100%;
  background: #FBFBFB;
  height: 10px;
  border-radius: 6px;
  overflow: hidden;
`;

export const ProgressBar = styled.div<{ width: number; color: string }>`
  width: ${(props) => props.width}%;
  background: ${(props) => props.color};
  height: 100%;
  transition: width 0.3s;
`;

// 섹션 제목
export const SectionTitle = styled.h2`
  font-size: 24px;
font-style: normal;
font-weight: 500;
line-height: 140%; /* 33.6px */
letter-spacing: -0.72px;  
`;

// 더보기
export const MoreButton = styled.button`
  background: none;
  border: none;
  color: #777777;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 0 0 210px;
`;

export const ArrowIcon = styled.img`
  width: 14px;
  height: 14px;
`;

// 최근 내역 리스트
export const HistoryList = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
`;

// 최근 내역 카드
export const HistoryCard = styled.div`
  flex: 1;
  width: 170px;
  height: 190px;
  background: #F0F1F3;
  border-radius: 21px;
  padding: 14px 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 135px;
`;

// 내역 아이콘
export const HistoryIcon = styled.div<{ type?: string }>`
  width: 48px;
  height: 48px;
  margin-bottom: 7px;
  background: #dde;
  border-radius: 50%;
  /* 실 아이콘 추가 필요 */
`;

export const HistoryTop = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 13px;
`;

export const HistoryLogo = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 9px;
`;

export const HistoryBrandInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const HistoryBrand = styled.div`
  font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: 140%; /* 25.2px */
letter-spacing: -0.54px;
  color: #212529;
  margin-bottom: 2px;
`;

export const HistoryMeta = styled.div`
  font-size: 10px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 14px */
letter-spacing: -0.3px;
  color: #919192;
`;

export const HistoryMid = styled.div`
  margin: 0px 0 8px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const HistoryResult = styled.div`
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 33.6px */
  letter-spacing: -0.72px;
  color: #15181c;
`;

export const HistoryEarned = styled.div`
  font-size: 24px;
  font-weight: 400;
  color: #121212;
`;

export const HistoryBottom = styled.div`
  margin-top: auto;
  align-items: flex-end;
  width: 100%;
  display: flex;
`;

export const HistoryTotal = styled.span`
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 25.2px */
    letter-spacing: -0.54px;
    color: #777777;
`;

// 내 소식 리스트
export const NewsList = styled.ul`
  margin: 12px 0px 12px 0px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const NewsItem = styled.li`
  display: flex;
  align-items: center;
  background: #F0F1F3;
  border-radius: 12px;
  padding: 12px 12px;
  height: 77px;
`;

// 소식 아이콘
export const NewsIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background: #fff;
  margin-right: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 소식 내용
export const NewsContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NewsTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

export const NewsDesc = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: #777777;
`;

