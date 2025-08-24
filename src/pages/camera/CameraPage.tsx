import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Video,
  Canvas,
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
import cameraIcon from '@assets/camera/camera.svg';

interface CameraPageProps {}

export const CameraPage: React.FC<CameraPageProps> = () => {
  const [showWarningPopup, setShowWarningPopup] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

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
    // 7일간 다시 보지 않기 로직 구현 시 localStorage 등에 상태 저장
    setShowWarningPopup(false);
    // localStorage.setItem('hideCameraTip', Date.now() + 7 * 24 * 60 * 60 * 1000);
  };

  // 사진 촬영 및 백엔드 전송
  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsLoading(true);

    try {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');

      if (!context) return;

      // 캔버스에 비디오 프레임 그리기
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);

      // 캔버스를 Blob으로 변환
      canvas.toBlob(async (blob) => {
        if (!blob) return;

        // FormData 생성
        const formData = new FormData();
        formData.append('photo', blob, 'camera-photo.jpg');

        try {
          // TODO: 백엔드 엔드포인트 URL 설정
          // AWS 서버 또는 로컬 서버에 따라 URL 변경 필요
          // 예시:
          // AWS: 'https://your-api-gateway-url/upload'
          const BACKEND_URL = 'http://localhost:3001/api/upload'; // 수정 필요
          
          const response = await fetch(BACKEND_URL, {
            method: 'POST',
            body: formData,
            // headers에 Content-Type을 설정하지 않음 (FormData가 자동으로 설정)
          });

          const result = await response.json();

          // 백엔드 응답에 따른 페이지 이동
          if (response.ok && result.success) {
            navigate('/Success');
          } else {
            navigate('/Failure');
          }
        } catch (error) {
          console.error('사진 업로드 오류:', error);
          navigate('/Failure'); // 네트워크 오류 시도 navigate 사용
        }
      }, 'image/jpeg', 0.8);
    } catch (error) {
      console.error('사진 촬영 오류:', error);
      alert('사진 촬영에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      {/* 비디오(카메라 화면) */}
      <Video ref={videoRef} autoPlay playsInline muted />

      {/* 캔버스 */}
      <Canvas ref={canvasRef} style={{ display: 'none' }} />

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
  );
};

export default CameraPage;
