import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginButton from '@components/login/LoginButton';
import * as S from './Login.styled';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

  const [form] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        { username: form.username, password: form.password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const token = res?.data?.data?.session?.token as string | undefined;
      const expiresAt = res?.data?.data?.session?.expiresAt as string | undefined;

      if (!token) throw new Error('토큰이 없습니다.');

      // ✅ 토큰 저장(임시: localStorage) + Axios 기본 헤더 설정
      localStorage.setItem('access_token', token);
      if (expiresAt) localStorage.setItem('access_token_expires_at', expiresAt);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // ✅ 성공 시 이동
      navigate('/home', { replace: true });
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        setError('비밀번호가 틀렸습니다.');
      } else {
        setError('로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Page>
      <S.Title>로그인</S.Title>
      <S.Greeting>
        안녕하세요.
        <br />
        <S.Grace>Pickle</S.Grace> 입니다.
      </S.Greeting>
      <S.SubLabel>회원 서비스 이용을 위해 로그인해 주세요.</S.SubLabel>

      {/* 폼으로 감싸면 Enter로도 제출됩니다 */}
      <S.FormContainer as="form" onSubmit={handleSubmit}>
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

        {error && <S.ErrorMsg>{error}</S.ErrorMsg>}

        {/* LoginButton이 실제 button 요소가 아니면 as="button"으로 지정 */}
        <LoginButton type="submit" disabled={loading}>
          {loading ? '로그인 중...' : '로그인'}
        </LoginButton>
      </S.FormContainer>
    </S.Page>
  );
};

export default Login;
