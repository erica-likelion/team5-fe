// Layout.styled.ts
import styled from "styled-components";

export const LayoutContainer = styled.div<{ noVerticalPadding?: boolean }>`
  min-width: 360px;
  max-width: 400px;
  height: 100vh;
  background: #f6f7f9;
<<<<<<< HEAD
  padding-top: ${({ noVerticalPadding }) => (noVerticalPadding ? '0' : '49px')};
  padding-bottom: ${({ noVerticalPadding }) => (noVerticalPadding ? '0' : '49px')};
  margin: 0 auto; /* 가로 가운데 정렬 */
=======
  padding-top: 49px;
  padding-bottom: 95px;
  padding-left: 22px;
  padding-right: 22px;
  margin: 0 auto;       /* 가로 가운데 정렬 */
>>>>>>> develop
  overflow: auto;
`;
