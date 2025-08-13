import { BrowserRouter,Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import { Layout } from "@components/common/Layout";
import { Splash } from "@components/common/Splash";
import { Navigator } from "@components/common/Navigator"

import { MainPage } from "@pages/home/MainPage";
import { CameraPage } from "@pages/camera/CameraPage";
import { HistoryPage } from "@pages/history/HistoryPage";
import { RankingPage } from "@pages/ranking/RankingPage";
import { MyPage } from "@pages/my/MyPage";

function App() {
  const [isSplashVisible, setIsSplashVisible] = useState<boolean>(true);

  useEffect(() => {
    const checkFirstVisit = () => {
      const isFirstVisit = !sessionStorage.getItem("visited");

      if (isFirstVisit) {
        setTimeout(() => {
          setIsSplashVisible(false);
          sessionStorage.setItem("visited", "true");
        }, 2000);
      } else {
        setIsSplashVisible(false);
      }
    };
    checkFirstVisit();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        {isSplashVisible ? (
          <Splash />
        ) : (
          <>
            <Routes>
              {/* main page */}
              <Route path="/home" element={<MainPage />} />

              {/* login page */}

              {/* signup page */}

              {/*camera page */}
              <Route path="/camera" element={<CameraPage />} />


              {/* history page */}
              <Route path="/history" element={<HistoryPage />} />

              {/* ranking page */}
              <Route path="/ranking" element={<RankingPage />} />

              {/* my page */}
              <Route path="/my" element={<MyPage />} />

              {/* error page */}

            </Routes>
            <Navigator />
          </>
        )}
      </Layout>
    </BrowserRouter>
  );
}

export default App;
