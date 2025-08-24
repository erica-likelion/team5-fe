import * as S from "./MainPage.style";
import profileImg from "@assets/common/profile-pic.svg";
import rightArrow from "@assets/common/rightArrow.svg";
import { personalTiers, calculateTierAndPercentage } from "../../utils/TierLogic";
import { useNavigate } from 'react-router-dom';

// 더미 유저 데이터
const userData = {
  name: "하은",
  level: 1, // 새싹
  points: 70, // 현재 포인트
};

// 더미 최근 내역 데이터 (2개)
const recentHistories = [
  {
    id: 1,
    brand: "블루포트",
    time: "11:28",
    type: "PET",
    icon: "pet", // PET 아이콘(더미로 사용), 실제 구현시 SVG 등으로 교체
    result: "Excellent",
    earned: 250,
    total: 18344,
  },
  {
    id: 2,
    brand: "스타벅스",
    time: "09:21",
    type: "PET",
    icon: "pet", // PET 아이콘
    result: "Perfect",
    earned: 200,
    total: 18094,
  },
];

// 내 소식 더미 데이터
const newsList = [
  {
    id: 1,
    title: "토스가 발견했어요!",
    desc: "투썸플레이스에서 소비한 일회용품을 재활용해요.",
    icon: "tos", // 더미 아이콘
  },
  {
    id: 2,
    title: "'성실한 1.5도씨' 뱃지 획득!",
    desc: "총 50회의 재활용으로 뱃지를 획득했어요.",
    icon: "badge", // 더미 아이콘
  },
];

export const MainPage = () => {
  const navigate = useNavigate();
  const { currentTier, nextTier, fillPercentage } = calculateTierAndPercentage(
    userData.points,
    personalTiers
  );

  // 다음 등급까지 필요한 포인트 계산
  const pointsToNext = nextTier
    ? nextTier.minPoints - userData.points
    : 0;

  return (
    <S.Container>
      {/* 상단 프로필 영역 */}
      <S.ProfileImg src={profileImg} alt="프로필 사진" />
      <S.ProfileSection>
        <S.ProfileInfo>
          <S.ProfileText>
            {currentTier.name} {userData.name}님{" "} {nextTier?.name}까지<br />
            {pointsToNext.toLocaleString()}p 남았어요.
          </S.ProfileText>

          {/* 게이지바 */}
          <S.ProgressBarContainer>
            <S.ProgressBar width={fillPercentage} color={nextTier?.color || currentTier.color} />
          </S.ProgressBarContainer>
        </S.ProfileInfo>
      </S.ProfileSection>

      {/* 최근 내역 */}
      <S.SectionTitle>
        최근 내역{" "}
        <S.MoreButton type="button" onClick={() => navigate("/History")}>
          더보기 <S.ArrowIcon src={rightArrow} alt="화살표 아이콘" />
        </S.MoreButton>
      </S.SectionTitle>
      <S.HistoryList>
  {recentHistories.map((item) => (
    <S.HistoryCard key={item.id}>
      <S.HistoryTop>
        <S.HistoryLogo>
          {/* 브랜드 이미지 또는 아이콘 */}
          {/* 예시: <img src={BluepotLogo} alt="블루포트" /> */}
        </S.HistoryLogo>
        <S.HistoryBrandInfo>
          <S.HistoryBrand>{item.brand}</S.HistoryBrand>
          <S.HistoryMeta>
            {item.time} | {item.type}
          </S.HistoryMeta>
        </S.HistoryBrandInfo>
      </S.HistoryTop>

      <S.HistoryMid>
        <S.HistoryResult>{item.result}</S.HistoryResult>
        <S.HistoryEarned>{item.earned}P</S.HistoryEarned>
      </S.HistoryMid>

      <S.HistoryBottom>
        <S.HistoryTotal>{item.total.toLocaleString()}P</S.HistoryTotal>
      </S.HistoryBottom>
    </S.HistoryCard>
  ))}
</S.HistoryList>


      {/* 내 소식 */}
      <S.SectionTitle>내 소식</S.SectionTitle>
      <S.NewsList>
        {newsList.map((n) => (
          <S.NewsItem key={n.id}>
            {/* 더미 아이콘 (실제 구현시용) */}
            <S.NewsIcon>{/* {n.icon} */}</S.NewsIcon>
            <S.NewsContent>
              <S.NewsTitle>{n.title}</S.NewsTitle>
              <S.NewsDesc>{n.desc}</S.NewsDesc>
            </S.NewsContent>
          </S.NewsItem>
        ))}
      </S.NewsList>
    </S.Container>
  );
};

export default MainPage;
