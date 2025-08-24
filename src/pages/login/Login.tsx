import React from 'react';
import LoginButton from '@components/login/LoginButton';
import * as S from './Login.styled';

const Login: React.FC = () => {
  return (
    <S.Page>
      <S.Title>로그인</S.Title>
      <S.Greeting>
        안녕하세요.
        <br />
        <S.Grace>Pickle</S.Grace> 입니다.
      </S.Greeting>
      <S.SubLabel>회원 서비스 이용을 위해 로그인해 주세요.</S.SubLabel>
      <S.FormContainer>
        <S.InputGroup>
          <S.Label>닉네임</S.Label>
          <S.Input1 type="text" placeholder="" />
        </S.InputGroup>
        <S.InputGroup>
          <S.Label>소속학교</S.Label>
          <S.Input2 type="text" placeholder="" />
        </S.InputGroup>
        <S.InputGroup>
          <S.Label>단과대학</S.Label>
          <S.Input2 type="text" placeholder="" />
        </S.InputGroup>
      </S.FormContainer>
      <LoginButton>로그인</LoginButton>
    </S.Page>
  );
};

export default Login;