import type { ReactNode } from "react";
import { LayoutContainer } from "./Layout.styled";

interface LayoutProps {
  children: ReactNode;
  noVerticalPadding?: boolean;
}

export const Layout = ({ children, noVerticalPadding }: LayoutProps) => {
  return <LayoutContainer noVerticalPadding={noVerticalPadding}>{children}</LayoutContainer>;
};

