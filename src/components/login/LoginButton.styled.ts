import styled from 'styled-components';

export const Button = styled.button`
  width: 100%;
  padding: 16px;
  background-color: #26c485;
  color: white;
  border: none;
  border-radius: 11px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1a9c68;
  }
`;