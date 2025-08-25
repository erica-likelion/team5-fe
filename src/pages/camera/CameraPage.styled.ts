import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  
`;

export const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Canvas = styled.canvas`
  display: none;
`;

export const FrameOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
`;

export const Corner = styled.div<{ top?: boolean; left?: boolean; right?: boolean; bottom?: boolean }>`
  position: absolute;
  width: 60px;
  height: 60px;
  border-style: solid;
  border-color: white;
  /* 네 귀퉁이 방향별로 보더 적용 */
  ${(props) =>
    props.top && props.left && `
      top: 164px;
      left: 23px;
      border-top-width: 2px;
      border-left-width: 2px;
      border-right-width: 0px;
      border-bottom-width: 0px;
    `
  }
  ${(props) =>
    props.top && props.right && `
      top: 164px;
      right: 25px;
      border-top-width: 2px;
      border-left-width: 0px;
      border-right-width: 2px;
      border-bottom-width: 0px;
    `
  }
  ${(props) =>
    props.bottom && props.left && `
      bottom: 130px;
      left: 23px;
      border-top-width: 0px;
      border-left-width: 2px;
      border-right-width: 0px;
      border-bottom-width: 2px;
    `
  }
  ${(props) =>
    props.bottom && props.right && `
      bottom: 130px;
      right: 25px;
      border-top-width: 0px;
      border-left-width: 0px;
      border-right-width: 2px;
      border-bottom-width: 2px;
    `
  }
`;

export const FrameText = styled.div`
  position: absolute;
  top: 59px;
  left: 23px;
  width: 100%;
  text-align: left;
  z-index: 3;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
  color: #FFFFFF;
  line-height: 140%; /* 39.2px */
  letter-spacing: -1.12px;
`;

export const CupImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 340px;  // 원하는 크기대로 조정
  height: auto;
  transform: translate(-50%, -50%);
  z-index: 2;
  pointer-events: none;
`;

export const CaptureButton = styled.button`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #ffffff;
  border: none;
  cursor: pointer;
  padding: 0;
  outline: none;

  /* 겹쳐진 흰색 원들 스타일 */
  &:before, 
  &:after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &:before {
    width: 66px;
    height: 66px;
    opacity: 0.4;
  }

  &:after {
    width: 56px;
    height: 56px;
    opacity: 1;
    border: 2px solid black; /* 여기에 테두리 추가 */
  }
`;


export const WarningPopup = styled.div`
  position: absolute;
  top: 35%;
  left: 0;
  right: 0;
  max-height: 65vh; /* 팝업 최대 높이 제한 */
  background-color: #FCFCFC;
  border-radius: 25px 25px 0 0;
  padding: 38px 20px;
  z-index: 100;
  text-align: center;
  overflow-y: auto;
`;



export const PopupHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 16px;
`;

export const PopupCameraIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
  background-color: #42B68F;
  padding: 8px;
  border-radius: 8px;
`;

export const PopupTitle = styled.div`
  font-weight: 700;
  font-size: 28px;
`;

export const TipList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 40px 0 28px 0;
  text-align: left;
`;

export const TipItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 18px;
`;

export const TipIcon = styled.img`
  width: 28px;
  height: 28px;
  margin-right: 14px;
  margin-top: 1px;
`;

export const TipContent = styled.div`
  font-size: 16px;
  color: #121212;
  line-height: 1.4;
`;

export const SubText = styled.div`
  font-size: 12px;
  color: #777777;
  margin-left: 0px;
  margin-top: 2px;
`;

export const PopupCloseButton = styled.button`
  width: 100%;
  height: 54px;
  padding: 12px;
  background-color: #42B68F;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 12px;
`;

export const PopupNoShowButton = styled.button`
  width: 100%;
  height: 54px;
  padding: 12px;
  background-color: #F0F1F3;
  border: none;
  border-radius: 8px;
  color: #777777;
  font-weight: 500;
  font-size: 18px;
  cursor: pointer;
`;
