// RankingPage.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import ScoreBar from "@components/ranking/ScoreBar";
import RankingButtons, { type RankingType } from "@components/ranking/OptionButton";
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

            let url = '';
            // 랭킹 타입에 따라 다른 API 엔드포인트 설정
            switch (selectedRanking) {
                case 'individual':
                    // 개인 랭킹 API
                    url = `${API_BASE_URL}/api/rankings/individual/top?limit=30`;
                    break;
                case 'campus':
                    // 캠퍼스 랭킹 API
                    // 사용자 제공 명세서에 따르면 'college' 랭킹과 'department' 랭킹의 URL이 동일합니다.
                    // 임시로 'campus' 랭킹에 해당 URL을 사용했습니다.
                    url = `${API_BASE_URL}/api/rankings/college/top?limit=30`;
                    break;
                case 'department':
                    // 학과 랭킹 API
                    // 사용자 제공 명세서에 따르면 'department' 랭킹과 'college' 랭킹의 URL이 동일합니다.
                    // 임시로 'department' 랭킹에 해당 URL을 사용했습니다.
                    url = `${API_BASE_URL}/api/rankings/college/top?limit=30`;
                    break;
                default:
                    // 기본값은 'individual'
                    url = `${API_BASE_URL}/api/rankings/individual/top?limit=30`;
            }

            try {
                const response = await axios.get(url);
                const fetchedData = response.data;
                // 포인트를 기준으로 내림차순 정렬
                const sortedData = [...fetchedData].sort((a, b) => b.points - a.points);
                setRankingData(sortedData);
            } catch (err) {
                console.error("Failed to fetch ranking data:", err);
                setError("랭킹 데이터를 가져오는 데 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRankingData();
    }, [selectedRanking]); // selectedRanking이 변경될 때마다 데이터를 다시 가져옵니다.

    return (
      <div>
        <S.Container>
          <S.Title>다음 단계까지 {user[0].points}P 남았어요</S.Title>
          <ScoreBar
              userName={user[0].name}
              userPoints={user[0].points}
              school={user[0].school}
              department={user[0].department}
              tierType={'individual'}
              rank={0}
              isUserBar={true}
          />
        </S.Container>
        <RankingButtons selectedOption={selectedRanking} onSelect={handleSelectRanking} />

        <S.RankingList>
          {/* 데이터 로딩 및 오류 상태에 따른 조건부 렌더링 */}
          {isLoading ? (
              <p>로딩 중...</p>
          ) : error ? (
              <p>{error}</p>
          ) : (
            rankingData.map((item, index) => {
                const scoreBarProps = {
                    key: index,
                    rank: index + 1,
                    isUserBar: false,
                    tierType: selectedRanking,
                    userName: '',
                    userPoints: 0,
                    school: '',
                    department: ''
                };

                // 랭킹 타입에 따라 userName과 userPoints 설정
                if (selectedRanking === 'individual') {
                    scoreBarProps.userName = item.name;
                    scoreBarProps.userPoints = item.points;
                    scoreBarProps.school = item.campus;
                    scoreBarProps.department = item.college;
                } else if (selectedRanking === 'campus') {
                    scoreBarProps.userName = item.campus;
                    scoreBarProps.userPoints = item.score;
                } else if (selectedRanking === 'department') {
                    scoreBarProps.userName = item.college;
                    scoreBarProps.userPoints = item.score;
                }

                return <ScoreBar {...scoreBarProps} />;
              })
          )}
        </S.RankingList>
      </div>
    )
}
