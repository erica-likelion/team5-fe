// Layout.styled.ts
import styled from "styled-components";

export const LayoutContainer = styled.div<{ noVerticalPadding?: boolean }>`
  min-width: 360px;
  max-width: 400px;
  height: 100vh;
  background: #F7F8F9;
  padding-top: ${({ noVerticalPadding }) => (noVerticalPadding ? '0' : '49px')};
  padding-bottom: ${({ noVerticalPadding }) => (noVerticalPadding ? '0' : '90px')};
  margin: 0 auto; /* 가로 가운데 정렬 */
  overflow: auto;
  padding-left: 21px;
  padding-right: 21px;
`;
