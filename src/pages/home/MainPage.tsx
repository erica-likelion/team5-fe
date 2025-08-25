// src/pages/MainPage/MainPage.tsx
import { useState, useEffect } from "react";
import * as S from "./MainPage.style";
import profileImg from "@assets/common/profile-pic.svg";
import rightArrow from "@assets/common/rightArrow.svg";
import { personalTiers, calculateTierAndPercentage } from "../../utils/PercentLogic";
import { useNavigate } from "react-router-dom";
import { getUser, type User } from "../../api/user";
import { getRecentEarnedHistories, type PointHistory } from "../../api/history";
import { getRecentNews, type News } from "../../api/history";

// 더미 userId (실서비스에서는 로그인 사용자 id로 교체)
const userId = 7;

export const MainPage = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<User | null>(null);
  const [recentHistories, setRecentHistories] = useState<PointHistory[]>([]);
  const [totalPoint, setTotalPoint] = useState<number>(0);
  const [recentNews, setRecentNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    (async () => {
      try {
        const [user, historiesRes, news] = await Promise.all([
          getUser(userId),
          getRecentEarnedHistories(userId), // { totalPoint, history: PointHistory[] }
          getRecentNews(userId),
        ]);

        setUserData(user);
        setRecentHistories(historiesRes?.history ?? []);
        setTotalPoint(historiesRes?.totalPoint ?? 0);
        setRecentNews(news ?? []);
      } catch (err: any) {
        setError(err?.message ?? "데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <>Loading...</>;
  if (error) return <>Error: {error}</>;
  if (!userData) return <>No user data</>;

  // 게이지/등급 계산은 PercentLogic 사용 (요청사항 반영)
  const basisPoints = Number.isFinite(totalPoint) ? totalPoint : (userData as any).points ?? 0;
  const { currentTier, nextTier, fillPercentage } = calculateTierAndPercentage(
    basisPoints,
    personalTiers
  );

  // 다음 등급까지 남은 포인트
  const pointsToNext = Math.max(0, nextTier ? nextTier.minPoints - basisPoints : 0);

  // 프로그레스바 색상: nextTier 있으면 강조색, 없으면 기본색
  const progressColor = (nextTier as any)?.color || (currentTier as any)?.color || "#42B68F";

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  return (
    <S.Container>
      {/* 상단 프로필 영역 */}
      <S.ProfileImg src={profileImg} alt="프로필 사진" />
      <S.ProfileSection>
        <S.ProfileInfo>
          <S.ProfileText>
            {currentTier.name} {(userData as any).nickname ?? (userData as any).name ?? "회원"}님{" "}
            {nextTier?.name}까지<br />
            {pointsToNext.toLocaleString()}p 남았어요.
          </S.ProfileText>

          {/* 게이지바 */}
          <S.ProgressBarContainer>
            <S.ProgressBar width={fillPercentage} color={nextTier ? progressColor : "#FBFBFB"} />
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
              {/* 히스토리 로고 (이미지 URL 제공 시 노출) */}
              <S.HistoryLogo 
                src={item.image?.url ? `${API_BASE_URL}${item.image.url}` : ""} 
                alt={item.wasteType ?? "logo"} 
              />

              <S.HistoryBrandInfo>
                {/* wasteType을 브랜드/타입 라벨로 사용 */}
                <S.HistoryBrand>{item.wasteType ?? "기타"}</S.HistoryBrand>
                {/* 생성시각 */}
                <S.HistoryMeta>
  {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
</S.HistoryMeta>
              </S.HistoryBrandInfo>
            </S.HistoryTop>

            <S.HistoryMid>
              {/* 적립 포인트 */}
              <S.HistoryResult>{`+${item.points}p`}</S.HistoryResult>
            </S.HistoryMid>

            <S.HistoryBottom>
              {/* 총 포인트(목록 공통) */}
              <S.HistoryTotal>{`${basisPoints.toLocaleString()}p`}</S.HistoryTotal>
            </S.HistoryBottom>
          </S.HistoryCard>
        ))}
      </S.HistoryList>

      {/* 내 소식 */}
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
