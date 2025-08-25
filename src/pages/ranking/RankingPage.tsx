// src/pages/ranking/RankingPage.tsx
import { useState, useEffect, useMemo } from 'react';
import ScoreBar from "@components/ranking/ScoreBar";
import RankingButtons, { type RankingType } from "@components/ranking/OptionButton";
import { personalTiers, calculateTierAndRemaining } from '@utils/TierLogic';
import profileImg from "@assets/common/profile-pic.svg";
import * as S from "./RankingPage.style";
import apiClient from '../../api/axios'; // ✅ 공통 axios 인스턴스 사용

type UserInfo = {
  id: number;
  name: string;
  points: number;
  rank: number;
  campus: string;
  college: string;
};

export function RankingPage() {
  const [selectedRanking, setSelectedRanking] = useState<RankingType>('individual');
  const [rankingData, setRankingData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const handleSelectRanking = (option: RankingType) => {
    setSelectedRanking(option);
  };

  // 사용자 정보
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await apiClient.get('/api/users/7'); // ✅ baseURL 자동 적용
        const data = res.data?.data ?? res.data;
        setUserInfo({
          id: data.id,
          name: data.name,
          points: Number(data.pointsTotal ?? 0),
          rank: Number(data.level ?? 0),
          campus: data.campus ?? "",
          college: data.college ?? "",
        });
      } catch {
        setError('사용자 정보를 불러오는 데 실패했습니다.');
      }
    };
    fetchUserInfo();
  }, []);

  // 랭킹 데이터
  useEffect(() => {
    const fetchRankingData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let path = '';
        switch (selectedRanking) {
          case 'campus':
            path = '/api/rankings/campus/top';
            break;
          case 'department':
            path = '/api/rankings/college/top';
            break;
          case 'individual':
          default:
            path = '/api/rankings/individual/top';
        }

        // ✅ params로 limit 전달
        const res = await apiClient.get(path, { params: { limit: 30 } });
        const rows = res?.data?.data?.rankings ?? [];

        const normalized = rows.map((r: any) => {
          if (selectedRanking === 'campus') {
            return {
              userName: r?.campus ?? '',
              points: Number(r?.accumulatedTotal ?? 0),
              rank: Number(r?.rank ?? 0),
              school: r?.campus ?? '',
              department: ''
            };
          } else if (selectedRanking === 'department') {
            return {
              userName: r?.college ?? '',
              points: Number(r?.accumulatedTotal ?? 0),
              rank: Number(r?.rank ?? 0),
              school: r?.campus ?? '',
              department: r?.college ?? ''
            };
          } else {
            // individual
            return {
              userName: r?.name ?? r?.username ?? '',
              points: Number(r?.accumulatedTotal ?? 0),
              rank: Number(r?.rank ?? 0),
              school: r?.campus ?? '',
              department: r?.college ?? ''
            };
          }
        });

        setRankingData(normalized);
      } catch (e) {
        console.error(e);
        setError('랭킹 데이터를 가져오는 데 실패했습니다.');
        setRankingData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRankingData();
  }, [selectedRanking]);

  // 등급/잔여 포인트 계산
  const myPoints = Number(userInfo?.points ?? 0);
  const { currentTier, remainingPoints } = useMemo(
    () => calculateTierAndRemaining(myPoints, personalTiers),
    [myPoints]
  );

  return (
    <div>
      {userInfo ? (
        <>
          <S.ProfileSection>
            <S.ProfileImage src={profileImg} alt="Profile" />
            <S.ProfileInfo>
              <S.UserName>{currentTier.name} {userInfo.name}님</S.UserName>
              <S.NameSchool>
                <S.UserSchool>{userInfo.campus}</S.UserSchool>
                <S.UserSchool>{userInfo.college}</S.UserSchool>
              </S.NameSchool>
            </S.ProfileInfo>
          </S.ProfileSection>

          <S.Container>
            <S.Title>
              다음 단계까지 {remainingPoints}P 남았어요
            </S.Title>

            <ScoreBar
              userName={userInfo.name}
              userPoints={userInfo.points}
              school={userInfo.campus}
              department={userInfo.college}
              tierType={"individual"}
              rank={2}
              isuserbar={true}
            />
          </S.Container>
        </>
      ) : (
        <S.Container>
          <S.Title>사용자 정보를 불러오는 중...</S.Title>
        </S.Container>
      )}

      <RankingButtons selectedOption={selectedRanking} onSelect={handleSelectRanking} />

      <S.RankingList>
        {isLoading ? (
          <p>로딩 중...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          (rankingData ?? []).map((item, idx) => (
            <ScoreBar
              key={idx}
              rank={item.rank}
              isuserbar={false}
              tierType={selectedRanking}
              userName={item.userName}
              userPoints={item.points}
              school={item.school ?? ""}
              department={item.department ?? ""}
            />
          ))
        )}
      </S.RankingList>
    </div>
  );
}

export default RankingPage;
