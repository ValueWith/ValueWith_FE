// Radio.styles.ts
import theme from '@/assets/styles/theme';
import styled from '@emotion/styled';

export const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

export const RadioCard = styled.input`
  appearance: none;
  cursor: pointer;

  width: 94px;
  height: 40px;
  background-color: #f8f8f9;
  border-radius: 4px;

  &:checked {
    border: 1px solid ${theme.color.primary};
    background-color: ${theme.color.secondary};
    + span {
      color: ${theme.color.primary};
    }
  }
`;

export const Radio = styled.input`
  appearance: none;
  cursor: pointer;

  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid ${theme.color.gray100};
  background-color: white;
  margin-right: 10px;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: ${theme.color.primary};
  }

  &:checked::before {
    content: '';
    position: absolute;
    top: 40%;
    left: 30%;
    width: 8px;
    height: 4px;
    border: 1px solid white;
    border-top: 0;
    border-right: 0;
    transform: rotate(-45deg);
    transform-origin: 25% 25%;
  }
`;

export const RadioCardText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  margin: 0 auto;
  font-size: 16px;
  font-weight: 500;
  color: #5c5c5c;
`;

export const RadioText = styled.span`
  font-size: 14px;
  color: #333749;
`;
