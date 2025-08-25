// RankingPage.tsx
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import ScoreBar from "@components/ranking/ScoreBar";
import RankingButtons, { type RankingType } from "@components/ranking/OptionButton";
import { personalTiers, calculateTierAndRemaining } from '@utils/TierLogic';
import profileImg from "@assets/common/profile-pic.svg";
import * as S from "./RankingPage.style";


type UserInfo = {
  id: number;
  name: string;
  points: number;
  rank: number;
  campus: string;
  college: string;
};

export function RankingPage() {

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [selectedRanking, setSelectedRanking] = useState<RankingType>('individual');
  const [rankingData, setRankingData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const handleSelectRanking = (option: RankingType) => {
      setSelectedRanking(option);
  };


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/users/2`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`, // 저장된 토큰 사용
          },
        });
        const data = res.data?.data ?? res.data; // API 응답 구조에 따라
        setUserInfo({
          id: data.id,
          name: data.name,
          points: Number(data.pointsTotal ?? 0),
          rank: Number(data.level ?? 0),
          campus: data.campus ?? "",
          college: data.college ?? "",
        });
      } catch (err) {
        console.error("사용자 정보 불러오기 실패:", err);
      }
    };
    fetchUserInfo();
  }, [API_BASE_URL]);

  useEffect(() => {
    const fetchRankingData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        let url = '';
        switch (selectedRanking) {
          case 'campus':
            url = `${API_BASE_URL}/api/rankings/campus/top?limit=30`;
            break;
          case 'department':
            url = `${API_BASE_URL}/api/rankings/college/top?limit=30`;
            break;
          case 'individual':
          default:
            url = `${API_BASE_URL}/api/rankings/individual/top?limit=30`;
        }

        const res = await axios.get(url);
        const rows = res?.data?.data?.rankings ?? [];

        // 공통 형태로 정규화
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

        setRankingData(normalized); // <— 여기서부터는 항상 동일 구조
      } catch (e) {
        console.error(e);
        setError('랭킹 데이터를 가져오는 데 실패했습니다.');
        setRankingData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRankingData();
  }, [selectedRanking, API_BASE_URL]); // selectedRanking이 변경될 때마다 데이터를 다시 가져옵니다.

    
    const myPoints = Number(userInfo?.points ?? 0);
    const { currentTier, remainingPoints } = useMemo(() => {return calculateTierAndRemaining(myPoints, personalTiers);}, [myPoints]);
  

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
                userPoints={userInfo.points}   // number 보장
                school={userInfo.campus}
                department={userInfo.college}
                tierType={"individual"}
                rank={2}
                isuserbar={true}
              />
            </S.Container>
          </>
        ) : (
          // 로딩/플레이스홀더(선택)
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
                userPoints={item.points}      // 이미 number로 정규화했다는 가정
                school={item.school ?? ""}
                department={item.department ?? ""}
              />
            ))
          )}
        </S.RankingList>
      </div>
    );
}