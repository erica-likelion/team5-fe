import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Layout } from '@components/common/Layout';
import { Splash } from '@components/common/Splash';
import { Navigator } from '@components/common/Navigator';

import { MainPage } from '@pages/home/MainPage';
import { CameraPage } from '@pages/camera/CameraPage';
import { HistoryPage } from '@pages/history/HistoryPage';
import { RankingPage } from '@pages/ranking/RankingPage';
import { MyPage } from '@pages/my/MyPage';
import { SuccessPage } from '@pages/camera/SuccessPage';
import { FailurePage } from '@pages/camera/FailurePage';

function AppContent() {
  const location = useLocation();

  // 네비게이터 숨길 경로
  const hideNavigatorPaths = ['/Camera', '/Success', '/Failure'];
  // 위아래 패딩 없앨 경로
  const noVerticalPaddingPaths = ['/Camera', '/Success', '/Failure'];
  const noVerticalPadding = noVerticalPaddingPaths.includes(location.pathname);

  return (
    <>
      <Layout noVerticalPadding={noVerticalPadding}>
        <Routes>
          <Route path="/Home" element={<MainPage />} />
          <Route path="/Camera" element={<CameraPage />} />
          <Route path="/History" element={<HistoryPage />} />
          <Route path="/Ranking" element={<RankingPage />} />
          <Route path="/My" element={<MyPage />} />
          <Route path="/Success" element={<SuccessPage />} />
          <Route path="/Failure" element={<FailurePage />} />
        </Routes>
      </Layout>
      {!hideNavigatorPaths.includes(location.pathname) && <Navigator />}
    </>
  );
}

function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const checkFirstVisit = () => {
      const isFirstVisit = !sessionStorage.getItem('visited');
      if (isFirstVisit) {
        setTimeout(() => {
          setIsSplashVisible(false);
          sessionStorage.setItem('visited', 'true');
        }, 2000);
      } else {
        setIsSplashVisible(false);
      }
    };

    checkFirstVisit();
  }, []);

  return (
    <>
      {isSplashVisible ? <Splash /> : <BrowserRouter><AppContent /></BrowserRouter>}
    </>
  );
}

export default App;
