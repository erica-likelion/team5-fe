// RankingPage.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import ScoreBar from "@components/ranking/ScoreBar";
import RankingButtons, { type RankingType } from "@components/ranking/OptionButton";
import profileImg from "@assets/common/profile-pic.svg";
import * as S from "./RankingPage.style";

const user = [
    { name: '하은', points: 2000, school: '한양대학교 ERICA', department: '디자인대학' },
];

export function RankingPage() {

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [selectedRanking, setSelectedRanking] = useState<RankingType>('individual');
  const [rankingData, setRankingData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleSelectRanking = (option: RankingType) => {
      setSelectedRanking(option);
  };

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
            points: Number(r?.score ?? 0),
            rank: Number(r?.rank ?? 0),
            school: r?.campus ?? '',
            department: ''
          };
        } else if (selectedRanking === 'department') {
          return {
            userName: r?.college ?? '',
            points: Number(r?.points ?? r?.score ?? 0),
            rank: Number(r?.rank ?? 0),
            school: r?.campus ?? '',
            department: r?.college ?? ''
          };
        } else {
          // individual
          return {
            userName: r?.name ?? r?.username ?? '',
            points: Number(r?.points ?? r?.score ?? 0),
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

    return (
        <div>
            <S.ProfileSection>
              <S.ProfileImage src={profileImg} alt="Profile" />
              <S.ProfileInfo>
                <S.UserName>{user[0].name}</S.UserName>
                <S.NameSchool>
                  <S.UserSchool>{user[0].school}</S.UserSchool>
                  <S.UserSchool>{user[0].department}</S.UserSchool>
                </S.NameSchool>
              </S.ProfileInfo>
            </S.ProfileSection>
            <S.Container>
                <S.Title>다음 단계까지 {user[0].points}P 남았어요</S.Title>
                <ScoreBar
                    userName={user[0].name}
                    userPoints={user[0].points}
                    school={user[0].school}
                    department={user[0].department}
                    tierType={'individual'}
                    rank={0}
                    isUserBar = {true} 
                />
            </S.Container>
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
              isUserBar={false}
              tierType={selectedRanking}
              userName={item.userName}
              userPoints={item.points}              // number 보장
              school={item.school ?? ""}
              department={item.department ?? ""}
            />
          ))
        )}
      </S.RankingList>
    </div>
  );
}