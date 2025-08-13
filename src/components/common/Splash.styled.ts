import styled from "styled-components";

export const SplashContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background-color: white;
  position: relative; 
`;

export const LogoImage = styled.img`
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;