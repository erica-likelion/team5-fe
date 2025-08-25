import { useState, useEffect } from "react";
import * as S from "./MainPage.style";
import profileImg from "@assets/common/profile-pic.svg";
import rightArrow from "@assets/common/rightArrow.svg";
import { personalTiers, calculateTierAndRemaining } from "../../utils/TierLogic";
import { useNavigate } from 'react-router-dom';
import { getUser, type User } from "../../api/user";
import { getRecentEarnedHistories, type PointHistory } from "../../api/history";
import { getRecentNews, type News } from "../../api/history";

// 더미 userId
const userId = 8;

// 더미 유저 데이터
// const userData = {
//   name: "하은",
//   level: 1, // 새싹
//   points: 70, // 현재 포인트
// };

// 더미 최근 내역 데이터 (2개)
// const recentHistories = [
//   {
//     id: 1,
//     time: "11:28",
//     type: "PET",
//     icon: "pet", // PET 아이콘(더미로 사용), 실제 구현시 SVG 등으로 교체
//     result: "Excellent",
//     earned: 250,
//     total: 18344,
//   },
//   {
//     id: 2,
//     time: "09:21",
//     type: "PET",
//     icon: "pet", // PET 아이콘
//     result: "Perfect",
//     earned: 200,
//     total: 18094,
//   },
// ];

// // 내 소식 더미 데이터
// const newsList = [
//   {
//     id: 1,
//     title: "토스가 발견했어요!",
//     desc: "투썸플레이스에서 소비한 일회용품을 재활용해요.",
//     icon: "tos", // 더미 아이콘
//   },
//   {
//     id: 2,
//     title: "'성실한 1.5도씨' 뱃지 획득!",
//     desc: "총 50회의 재활용으로 뱃지를 획득했어요.",
//     icon: "badge", // 더미 아이콘
//   },
// ];

export const MainPage = () => {
  const navigate = useNavigate();
<<<<<<< HEAD
  const [userData, setUserData] = useState<User | null>(null);
  const [recentHistories, setRecentHistories] = useState<PointHistory[]>([]);
  const [totalPoint, setTotalPoint] = useState<number>(0);
  const [recentNews, setRecentNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser(userId); // Fetch user with id 8 (dummy)
        setUserData(user);
      } catch (err: any) {
        setError(err.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    
    const fetchHistories = async () => {
      try {
        const result = await getRecentEarnedHistories(userId);
        // result는 { totalPoint, history: [...] } 형태이므로 분리
        setRecentHistories(result.history);
        setTotalPoint(result.totalPoint);
      } catch (err: any) {
        setError(err.message || "Failed to fetch histories");
      }
    };

    const fetchNews = async () => {
      try {
        const news = await getRecentNews(userId);
        setRecentNews(news);
      } catch (err) {
        console.error("최근 뉴스 조회 실패:", err);
      }
    };

    fetchUser();
    fetchHistories();
    fetchNews();
  }, []);

  if (loading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error: {error}</>;
  }

  if (!userData) {
    return <>No user data</>;
  }

  const { currentTier, nextTier, fillPercentage } = calculateTierAndPercentage(
    userData.pointsTotal,
=======
  const { currentTier, nextTier, fillpercentage } = calculateTierAndRemaining(
    userData.points,
>>>>>>> develop
    personalTiers
  );

  const pointsToNext = nextTier ? nextTier.minPoints - userData.pointsTotal : 0;


  return (
    <S.Container>
      {/* 상단 프로필 영역 */}
      <S.ProfileImg src={profileImg} alt="프로필 사진" />
      <S.ProfileSection>
        <S.ProfileInfo>
          <S.ProfileText>
            {currentTier.name} {userData.nickname}님{" "} {nextTier?.name}까지<br />
            {pointsToNext.toLocaleString()}p 남았어요.
          </S.ProfileText>

          {/* 게이지바 */}
          <S.ProgressBarContainer>
            <S.ProgressBar width={fillpercentage} color={nextTier?.color || currentTier.color} />
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
        <S.HistoryCard>
      {recentHistories.map((item) => (
          <div key={item.id} className="history-item">
            <S.HistoryTop>
              {/* HistoryLogo: 이미지 url */}
              <S.HistoryLogo src={item.image?.url ?? ""} />
              <S.HistoryBrandInfo>
                  {/* HistoryBrand: wasteType */}
                  <S.HistoryBrand>{item.wasteType.toLocaleString()}</S.HistoryBrand>
                  {/* HistoryMeta: createdAt 날짜 */}
                  <S.HistoryMeta>{new Date(item.createdAt).toLocaleString()}</S.HistoryMeta>
              </S.HistoryBrandInfo>
            </S.HistoryTop>
            <S.HistoryMid>
              {/* HistoryResult: points */}
              <S.HistoryResult>{"+"}{item.points}{"p"}</S.HistoryResult>
            </S.HistoryMid>
            <S.HistoryBottom>
              {/* HistoryTotal: totalPoint */}
              <S.HistoryTotal>{totalPoint.toLocaleString()}{"p"}</S.HistoryTotal>
            </S.HistoryBottom>
          </div>
        ))}
        </S.HistoryCard >
</S.HistoryList>


  <S.SectionTitle>내 소식</S.SectionTitle>
  {recentNews.length === 0 ? (
    <div>불러올 소식 없음</div>
  ) : (
    <S.NewsList>
      {recentNews.map((n) => (
        <S.NewsItem as="li" key={n.id}>
          <S.NewsTitle>{n.description}</S.NewsTitle>
          <S.NewsDesc>{new Date(n.createdAt).toLocaleString()}</S.NewsDesc>
        </S.NewsItem>
      ))}
    </S.NewsList>
  )}


  </S.Container>
  );
};

export default MainPage;