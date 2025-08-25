import type { ReactNode } from "react";
import { LayoutContainer } from "./Layout.styled";

interface LayoutProps {
  children: ReactNode;
  noVerticalPadding?: boolean;
  noHorizontalPadding?: boolean;
}

export const Layout = ({
  children,
  noVerticalPadding,
  noHorizontalPadding,
}: LayoutProps) => {
  return (
    <LayoutContainer
      $noVerticalPadding={noVerticalPadding}
      $noHorizontalPadding={noHorizontalPadding}
    >
      {children}
    </LayoutContainer>
  );
};
