// RankingPage.tsx
import { useState } from 'react';
import ScoreBar from "@components/ranking/ScoreBar";
import RankingButtons, { type RankingType } from "@components/ranking/OptionButton";
import * as S from "./RankingPage.style";

const users = [
    { name: 'Minji', points: 3000, school: '한양대학교 ERICA', department: '공학대학' },
    { name: 'Hyun', points: 2000, school: '한양대학교 ERICA', department: '경상대학' },
    { name: 'Yujin', points: 1000, school: '한양대학교 ERICA', department: '소프트웨어융합대학' },
    { name: 'SeoHyun', points: 500, school: '한양대학교 ERICA', department: '첨단융합대학' },
];

const campus = [
    { school: '한양대학교 ERICA', points: 10000 },
    { school: '서울대학교', points: 19000 },
    { school: '연세대학교', points: 1900 },
    { school: '고려대학교', points: 8000 },
    { school: '성균관대학교', points: 7000 },
    { school: '인하대학교', points: 11000 },
    { school: '중앙대학교', points: 1000 },
];

const department = [
    { school: '소프트웨어융합대학', points: 10000 },
    { school: '디자인대학', points: 75000 },
    { school: '경상대학', points: 6000 },
    { school: '공학대학', points: 4000 },
    { school: '약학대학', points: 3500 },
    { school: '첨단융합대학', points: 9000 },
    { school: '글로벌문화통상대학', points: 6500 },
    { school: '커뮤니케이션&컬쳐대학', points: 5000 },
    { school: '예체능대학', points: 3000 },
    { school: 'LIONS칼리지', points: 1000 },
];

const user = [
    { name: '하은', points: 2000, school: '한양대학교 ERICA', department: '디자인대학' },
];

export function RankingPage() {
    const [selectedRanking, setSelectedRanking] = useState<RankingType>('individual');

    const handleSelectRanking = (option: RankingType) => {
        setSelectedRanking(option);
    };

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
                    isUserBar = {true} 
                />
            </S.Container>
            <RankingButtons selectedOption={selectedRanking} onSelect={handleSelectRanking} />

            <S.RankingList>
            {/* Conditional rendering based on selectedRanking */}
            {selectedRanking === 'individual' ? (
                users.map((user, index) => (
                    <ScoreBar
                        key={user.name}
                        userName={user.name}
                        userPoints={user.points}
                        school={user.school}
                        department={user.department}
                        tierType={'individual'}
                        rank={index + 1} // Pass the rank (1-based index)
                        isUserBar = {false} 
                    />
                ))
            ) : selectedRanking === 'campus' ? (
                campus.map((camp, index) => (
                    <ScoreBar
                        key={camp.school}
                        userName={camp.school}
                        userPoints={camp.points}
                        school={''}
                        department={''}
                        tierType={'campus'}
                        rank={index + 1} // Pass the rank (1-based index)
                        isUserBar = {false} 
                    />
                ))
            ) : (
                department.map((dept, index) => (
                    <ScoreBar
                        key={dept.school}
                        userName={dept.school}
                        userPoints={dept.points}
                        school={''}
                        department={''}
                        tierType={'department'} // Pass department tier type
                        rank={index + 1} // Pass the rank (1-based index)
                        isUserBar = {false} 
                    />
                ))
            )}
            </S.RankingList>
        </div>
    )
}