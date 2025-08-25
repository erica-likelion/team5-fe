import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeImage } from '../../api/camera';
import {
  Overlay,
  Container,
  Video,
  Canvas,
  FrameOverlay,
  Corner,
  FrameText,
  CupImage,
  CaptureButton,
  WarningPopup,
  PopupHeader,
  PopupCameraIcon,
  PopupTitle,
  TipList,
  TipItem,
  TipIcon,
  TipContent,
  SubText,
  PopupCloseButton,
  PopupNoShowButton,
} from './CameraPage.styled';

import tipIcon1 from "@assets/camera/tip1.svg";
import tipIcon2 from '@assets/camera/tip2.svg';
import tipIcon3 from '@assets/camera/tip3.svg';
import tipIcon4 from '@assets/camera/tip4.svg';
import cupImg from '@assets/camera/cup.svg';
import cameraIcon from '@assets/camera/camera.svg';

interface CameraPageProps {}

export const CameraPage: React.FC<CameraPageProps> = () => {
  const [showWarningPopup, setShowWarningPopup] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();


  const dummyuserId = "7";


  // 카메라 스트림 시작
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user' } // 전면 카메라 사용
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('카메라 접근 오류:', error);
        alert('카메라에 접근할 수 없습니다. 카메라 권한을 확인해주세요.');
      }
    };

    startCamera();

    // 컴포넌트 언마운트 시 카메라 스트림 중지
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const closeWarningPopup = () => {
    setShowWarningPopup(false);
  };

  const noShowWarningPopup = () => {
  // 7일 후 만료 타임스탬프 저장
  const weekLater = Date.now() + 7 * 24 * 60 * 60 * 1000;
  localStorage.setItem('hideCameraTip', weekLater.toString());
  setShowWarningPopup(false);
  };

  useEffect(() => {
    const hideUntil = localStorage.getItem('hideCameraTip');
    if (hideUntil) {
      const hideUntilTime = parseInt(hideUntil, 10);
      if (Date.now() < hideUntilTime) {
        setShowWarningPopup(false);
      } else {
        localStorage.removeItem('hideCameraTip');
        setShowWarningPopup(true);
      }
    }
  }, []);

  // 사진 촬영 및 백엔드 전송
  const capturePhoto = async () => {
  if (!videoRef.current || !canvasRef.current) return;

  setIsLoading(true);

  try {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    // 비디오 프레임을 캔버스에 그림
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    // 캔버스를 Blob으로 변환 후 API 호출
    canvas.toBlob(async (blob) => {
      if (!blob) {
        setIsLoading(false);
        alert("이미지 생성 실패");
        return;
      }

      try {
        const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' });
        const result = await analyzeImage(file, dummyuserId);

        if (result.isRecyclable === true) {
          navigate("/Success");
        } else {
          navigate("/Failure");
        }

      } catch (error: any) {
        alert("분석 실패: " + error.message);
      } finally {
        setIsLoading(false);
      }
    }, 'image/jpeg', 0.8);

  } catch (error) {
    setIsLoading(false);
    alert("사진 촬영에 실패했습니다.");
  }
};

  return (
    <>
    {/* 팝업이 있을 때 어두운 배경 처리 */}
    <Overlay visible={showWarningPopup} />
      <Container>
        {/* 비디오(카메라 화면) */}
        <Video ref={videoRef} autoPlay playsInline muted />

        {/* 캔버스 */}
        <Canvas ref={canvasRef} style={{ display: 'none' }} />

        {/* 프레임 오버레이 */}
        <FrameOverlay>
          <FrameText>
            화면에 용기를<br />
            알맞게 맞춰주세요.
          </FrameText>
          <Corner top left />
          <Corner top right />
          <Corner bottom left />
          <Corner bottom right />
          <CupImage src={cupImg} alt="컵" />
        </FrameOverlay>

        {/* 촬영 버튼 */}
        <CaptureButton onClick={capturePhoto} disabled={isLoading} />

        {showWarningPopup && (
          <WarningPopup>
            <PopupHeader>
              <PopupCameraIcon src={cameraIcon} alt="촬영 팁" />
              <PopupTitle>촬영 전 Tip!</PopupTitle>
            </PopupHeader>
            <TipList>
              <TipItem>
                <TipIcon src={tipIcon1} alt="" />
                <div>
                  <TipContent>내용물을 완전히 비운 뒤 촬영해주세요.</TipContent>
                </div>
              </TipItem>
              <TipItem>
                <TipIcon src={tipIcon2} alt="" />
                <div>
                  <TipContent>자연광 혹은 조명이 있는 곳에서 촬영해 주세요.</TipContent>
                  <SubText>* 강한 직광이나 조명이 비치는 경우에는 비스듬히 찍어주세요.</SubText>
                </div>
              </TipItem>
              <TipItem>
                <TipIcon src={tipIcon3} alt="" />
                <div>
                  <TipContent>단색 배경 혹은 깔끔한 곳에서 촬영해 주세요.</TipContent>
                </div>
              </TipItem>
              <TipItem>
                <TipIcon src={tipIcon4} alt="" />
                <div>
                  <TipContent>물체 전체가 프레임 안에 들어오도록 해주세요.</TipContent>
                  <SubText>
                    * 정면 또는 살짝 위에서 45도 각도로 촬영하는 것이 가장 좋아요.
                  </SubText>
                </div>
              </TipItem>
            </TipList>
            <PopupCloseButton onClick={closeWarningPopup}>확인했어요.</PopupCloseButton>
            <PopupNoShowButton onClick={noShowWarningPopup}>7일간 다시 보지 않기</PopupNoShowButton>
          </WarningPopup>
        )}
      </Container>
    </>
  );
};

export default CameraPage;
