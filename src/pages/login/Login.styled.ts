import styled from 'styled-components';

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 98px;
`;

export const Greeting = styled.p`
  font-size: 36px;
  font-weight: 500;
  line-height: 140%;
`;

export const Grace = styled.span`
    font-family: 'Grace'; 
    font-size: 40px;
    font-weight: 400;
    letter-spacing: -1.6px;
  }
`;

export const SubLabel = styled.p`
  font-size: 18px;
  color: #777;
  margin-bottom: 100px;
  letter-spacing: -0.72px;
`;

export const FormContainer = styled.div`
  margin-bottom: 160px;
`;

export const InputGroup = styled.div`
  position: relative;
  margin-bottom: 28px;
  align-items: flex-end;
`;

export const Label = styled.div`
	position: absolute;
  font-size: 20px;
  font-weight: 400;
  color: #121212;
  
  display: block;
  letter-spacing: -0.9px;
`;

export const Input1 = styled.input`
  width: 100%;
  padding: 2px 100px 12px 67px; 
  border: none;
  border-bottom: 1px solid #121212;
  font-size: 20px;
  outline: none;
  transition: border-bottom-color 0.3s;
  background: transparent;

  &:focus {

    border-bottom-color: #26c485;
  }
`;

export const Input2 = styled.input`
  width: 100%;
  padding: 2px 100px 12px 80px; 
  border: none;
  border-bottom: 1px solid #121212;
  font-size: 20px;
  outline: none;
  transition: border-bottom-color 0.3s;
  background: transparent;

  &:focus {

    border-bottom-color: #26c485;
  }
`;


export const LinkButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 8px 16px;
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #333;
  cursor: pointer;
  
  &:hover {
    background: #e0e0e0;
  }
`;

export const ErrorMsg = styled.p`
  color: #e5484d;
  font-size: 0.9rem;
  margin: 8px 0 0;
`;