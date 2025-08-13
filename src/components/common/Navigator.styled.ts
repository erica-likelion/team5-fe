import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavBar = styled.nav`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-around;
  align-items: center;

  background: #FBFCFE;
  width: 100%;
  min-width: 360px;
  max-width: 393px;
  height: 90px;

  border-top: 1px solid #f0f0f0;
  z-index: 50;
`;

export const NavItem = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 49px;
  height: 40px;
  text-decoration: none;
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  align-items: center;
  margin-bottom: 13px;
`;

export const Label = styled.strong<{ $active?: boolean }>`
  font-size: 12px;
  font-weight: ${({ $active }) => ($active ? 500 : 300)};
  color: ${({ $active }) => ($active ? "#3F3F45" : "#DADBDE")};
`;

export const Camera = styled(Link)`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, -45%); 
  width: 44px;
  height: 44px;           
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 80; /* NavBar 위로 */
`;

export const CameraIcon = styled.img`
  width: 44px;
  height: 44px;
`;