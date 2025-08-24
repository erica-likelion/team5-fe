import recycle from "@assets/common/recycle.svg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SplashContainer, LogoImage, PickleTitle, PickleSubTitle } from "./Splash.styled";

export const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/Home");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <SplashContainer>
      <LogoImage src={recycle} alt="logo-image" />
      <PickleSubTitle>Pick, Recycle!</PickleSubTitle>
      <PickleTitle>Pickle</PickleTitle>
    </SplashContainer>
  );
};
