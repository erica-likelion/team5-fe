import React from 'react';
import * as S from './OptionButton.styled'

// 버튼의 종류를 정의합니다.
export type RankingType = 'individual' | 'campus' | 'department';

interface RankingButtonsProps {
  selectedOption: RankingType;
  onSelect: (option: RankingType) => void;
}

const RankingButtons: React.FC<RankingButtonsProps> = ({ selectedOption, onSelect }) => {
  return (
    <S.Container>
      <S.Button 
        $active={selectedOption === 'individual'} 
        onClick={() => onSelect('individual')}>
        개인
      </S.Button>
      <S.Button 
        $active={selectedOption === 'campus'} 
        onClick={() => onSelect('campus')}>
        캠퍼스
      </S.Button>
      <S.Button 
        $active={selectedOption === 'department'} 
        onClick={() => onSelect('department')}>
        단과대
      </S.Button>
    </S.Container>
  );
};

export default RankingButtons;