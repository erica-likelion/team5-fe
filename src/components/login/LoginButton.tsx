import React from 'react';
import { Button } from './LoginButton.styled'

interface LoginButtonProps {
  children: React.ReactNode;
}

const LoginButton: React.FC<LoginButtonProps> = ({ children }) => {
  return <Button>{children}</Button>;
};

export default LoginButton;