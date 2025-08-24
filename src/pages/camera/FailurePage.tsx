import React from 'react';
import {
  Container,
  TitleWrapper,
  BackArrow,
  Title,
  ImageWrapper,
  StyledImage,
  ButtonWrapper,
  RetryButton,
  CancelButton
} from './FailurePage.styled';

import failureImg from "@assets/camera/failure.svg";
import backarrow from "@assets/common/leftarrow.svg";
import { useNavigate } from 'react-router-dom';

export const FailurePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <TitleWrapper>
        <BackArrow onClick={() => navigate(-1)}>
          <img src={backarrow} alt="뒤로가기" />
        </BackArrow>
        <Title>재촬영이 필요해요.</Title>
      </TitleWrapper>

      <ImageWrapper>
        <StyledImage src={failureImg} alt="실패 이미지" />
      </ImageWrapper>

      <ButtonWrapper>
        <RetryButton onClick={() => navigate('/Camera')}>재촬영하기</RetryButton>
        <CancelButton onClick={() => navigate('/Home')}>취소</CancelButton>
      </ButtonWrapper>
    </Container>
  );
};
