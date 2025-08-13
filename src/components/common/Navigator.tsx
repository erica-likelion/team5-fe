import { useLocation } from "react-router-dom";
import {
  NavBar,
  NavItem,
  Icon,
  Label,
  Camera,
  CameraIcon
} from "./Navigator.styled";

import historyActive from "@assets/common/Nav/history-active.svg";
import historyUnactive from "@assets/common/Nav/history-unactive.svg";
import cameraActive from "@assets/common/Nav/camera.svg";
import homeActive from "@assets/common/Nav/home-active.svg";
import homeUnactive from "@assets/common/Nav/home-unactive.svg";
import myActive from "@assets/common/Nav/my-active.svg";
import myUnactive from "@assets/common/Nav/my-unactive.svg";
import rankActive from "@assets/common/Nav/rank-active.svg";
import rankUnactive from "@assets/common/Nav/rank-unactive.svg";

export const Navigator = () => {
  const { pathname } = useLocation();

  const isHistory = pathname === "/History";
  const isHome = pathname === "/Home";
  const isRanking = pathname === "/weekly-Ranking";
  const isMy = pathname === "/MY";

  return (
    <NavBar>
      <NavItem to="/History" aria-label="History">
        <Icon src={isHistory ? historyActive : historyUnactive} alt="history" />
        <Label $active={isHistory}>History</Label>
      </NavItem>

      <NavItem to="/Home" aria-label="Home">
        <Icon src={isHome ? homeActive : homeUnactive} alt="home" />
        <Label $active={isHome}>Home</Label>
      </NavItem>

      <Camera to="/Camera" aria-label="Camera">
        <CameraIcon src={cameraActive} alt="camera" />
        <Label></Label>
      </Camera>

      <NavItem to="/weekly-Ranking" aria-label="Ranking">
        <Icon src={isRanking ? rankActive : rankUnactive} alt="rank" />
        <Label $active={isRanking}>Rank</Label>
      </NavItem>

      <NavItem to="/MY" aria-label="My">
        <Icon src={isMy ? myActive : myUnactive} alt="my" />
        <Label $active={isMy}>MY</Label>
      </NavItem>
    </NavBar>
  );
};
