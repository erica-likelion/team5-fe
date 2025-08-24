import React, { useMemo } from 'react';
import {
  Container,
  Title,
  ImageWrapper,
  SuccessBackgroundImg,
  SuccessImg,
  ButtonWrapper,
  SaveButton,
} from './SuccessPage.styled.ts';

import BackgroundImg from '@assets/camera/successBackground.svg';
import SuccessImg1 from '@assets/camera/success1.svg';
import SuccessImg2 from '@assets/camera/success2.svg';
import SuccessImg3 from '@assets/camera/success3.svg';

import { useNavigate } from 'react-router-dom';

export const SuccessPage: React.FC = () => {
  const navigate = useNavigate();

  // 이미지 배열 및 문구 배열을 동일 인덱스 매칭
  const successImgs = [SuccessImg1, SuccessImg2, SuccessImg3];
  const successTexts = [
    `오늘 나의 재활용이\n해달의 서식지를 지켜주었어요.`,
    `오늘 나의 재활용이\n거북이의 서식지를 지켜주었어요.`,
    `오늘 나의 재활용이\n코끼리의 서식지를 지켜주었어요.`,
  ];

  const randomIndex = useMemo(() => Math.floor(Math.random() * successImgs.length), []);
  const pickedImg = successImgs[randomIndex];
  const pickedText = successTexts[randomIndex];

  return (
    <Container>
      <Title>{pickedText}</Title>
      <ImageWrapper>
        <SuccessBackgroundImg src={BackgroundImg} alt="우표 배경" />
        <SuccessImg src={pickedImg} alt="랜덤 이미지" />
      </ImageWrapper>
      <ButtonWrapper>
        <SaveButton onClick={() => navigate('/Home')}>적립하기</SaveButton>
      </ButtonWrapper>
    </Container>
  );
};
