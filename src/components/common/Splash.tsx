import logo from "@assets/common/Recycle-symbol.png";
import { SplashContainer, LogoImage } from "./Splash.styled";

export const Splash = () => {
  return (
    <SplashContainer>
      <LogoImage src={logo} alt="logo-image" />
    </SplashContainer>
  );
};