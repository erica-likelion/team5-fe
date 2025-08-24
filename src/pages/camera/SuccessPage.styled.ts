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

// 제목(텍스트) 영역
export const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #222;
  text-align: left;
  margin-top: 90px;
  width: 319px;
  white-space: pre-line; /* 줄바꿈 반영 */
`;


// 배경 + 메인 이미지를 감싸는 영역
export const ImageWrapper = styled.div`
  width: 260px;
  height: 280px;
  margin: 0 auto;
  margin-top: 28px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 배경 이미지
export const SuccessBackgroundImg = styled.img`
  position: absolute;
  width: 348px;
  height: 518.412353515625px;
  left: 50%;
  top: 90%;
  transform: translate(-50%, -50%);
  z-index: 1;
  object-fit: contain;
`;

// 중앙 동물 이미지
export const SuccessImg = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -26%);
  width: 297.773193359375px;
  height: auto;
  z-index: 2;
`;

// 하단 버튼 wrapper
export const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 32px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

// 적립하기 버튼
export const SaveButton = styled.button`
  background: #42B68F;
  color: #fff;
  border-radius: 8px;
  border: none;
  width: 348px;
  height: 56px;
  font-size: 24px;
  font-weight: 500;
  cursor: pointer;
`;