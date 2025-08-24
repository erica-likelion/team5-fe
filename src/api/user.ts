// api/user.ts
import api from './axios'; // './axios.ts' 경로에 유의

export interface UserData {
  nickname: string;
  grade: string;
  remainPoints: number;
}

export async function fetchUserData(): Promise<UserData> {
  try {
    // axios 인스턴스 사용, baseURL 자동 적용
    const response = await api.get('/user/info');
    return response.data;
  } catch (error) {
    throw new Error('유저 정보 조회 실패');
  }
}
