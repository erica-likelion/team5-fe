import React from 'react';
import { Button } from './LoginButton.styled';

type LoginButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const LoginButton = React.forwardRef<HTMLButtonElement, LoginButtonProps>(
  ({ children, loading = false, disabled, ...rest }, ref) => (
    <Button
      ref={ref}
      disabled={loading || disabled}
      aria-busy={loading}
      {...rest}               // type, onClick, form, etc. 전달
    >
      {loading ? '로그인 중...' : children}
    </Button>
  )
);

LoginButton.displayName = 'LoginButton';
export default LoginButton;
