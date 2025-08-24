import styled from "styled-components";

// 전체 컨테이너
export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

// 상단 제목 + backarrow wrapper
export const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 56px;
  padding: 90px 16px;
  box-sizing: border-box;
  margin-top: 0;
`;

// 좌측 backarrow 아이콘 영역 (아이콘 넣을 영역)
export const BackArrow = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 40px;
  background: none;
  border: none;
  padding: 0;
  /* pointer로 변경 */
  cursor: pointer;
  margin-right: 8px;

  img {
    width: 24px;
    height: 24px;
  }
`;

// 제목(텍스트) 영역
export const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  padding-left: 10px;
  color: #222;
  text-align: left;
`;

// 이미지 wrapper
export const ImageWrapper = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

// 실제 고양이 이미지(또는 일러스트)
export const StyledImage = styled.img`
  width: 291.3414611816406px;
  height: auto;
`;

// 하단 버튼 wrapper
export const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 36px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 16px;
`;

// 재촬영 버튼
export const RetryButton = styled.button`
  background: #42B68F;
  color: #fff;
  border-radius: 8px;
  border: none;
  width: 200px;
  height: 56px;
  font-size: 24px;
  font-weight: 500;
  cursor: pointer;
`;

// 취소 버튼
export const CancelButton = styled.button`
  background: #E6E6E6;
  color: #7D7D7D;
  border-radius: 8px;
  border: none;
  width: 120px;
  height: 56px;
  font-size: 24px;
  font-weight: 500;
  cursor: pointer;
`;
