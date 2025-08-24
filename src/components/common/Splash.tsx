import recycle from "@assets/common/recycle.svg";
import Pickle from "@assets/common/Pickle.svg";
import Pickrecycle from "@assets/common/Pickrecycle.svg";

import { SplashContainer, LogoImage } from "./Splash.styled";

export const Splash = () => {
  return (
    <SplashContainer>
      <LogoImage src={recycle} alt="logo-image" />
      <LogoImage src={Pickle} alt="logo-image" />
      <LogoImage src={Pickrecycle} alt="logo-image" />
    </SplashContainer>
  );
};
