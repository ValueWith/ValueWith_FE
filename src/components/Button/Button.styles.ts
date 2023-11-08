import styled from '@emotion/styled';
import { css } from '@emotion/react';

import theme from '@/assets/styles/theme';
import { ButtonCSSProps } from '.';

const handleButtonSize = (props: ButtonCSSProps) => {
  switch (props.size) {
    case 'sm':
      return css`
        min-width: 82px;
        height: 36px;
        font-size: 14px;
        font-size: 1.4rem;
      `;
    case 'md':
      return css`
        min-width: 96px;
        height: 42px;
        font-size: 16px;
        font-size: 1.6rem;
      `;
    case 'lg':
      return css`
        min-width: 278px;
        height: 56px;
        font-size: 18px;
        font-size: 1.8rem;
        font-weight: 600;
      `;
    default:
      return '';
  }
};

const handleButtonType = (props: ButtonCSSProps) => {
  switch (props.styleType) {
    case 'solid':
      return css`
        background-color: ${theme.color.primary};
        color: ${theme.color.white};
        border: 1px solid ${theme.color.primary};
      `;
    case 'outline':
      return css`
        background-color: ${theme.color.white};
        color: ${theme.color.primary};
        border: 1px solid ${theme.color.primary};
      `;
    case 'outline-disabled':
      return css`
        background-color: ${theme.color.white};
        color: ${theme.color.gray500};
        border: 1px solid ${theme.color.gray100};
        pointer-events: none;
        cursor: default;
      `;
    case 'disabled':
      return css`
        background-color: ${theme.color.gray100};
        color: ${theme.color.gray500};
        pointer-events: none;
        cursor: default;
      `;
    case 'warning':
      return css`
        background-color: ${theme.color.red200};
        color: ${theme.color.white};
        border: 1px solid ${theme.color.red200};
      `;
    case 'text':
      return css`
        height: auto;
        padding: 0;
        color: ${theme.color.primary};
      `;
    case 'basic':
      return css`
        background-color: ${theme.color.white};
        border: 1px solid ${theme.color.gray100};
        color: ${theme.color.fontgray};
      `;
  }
};

export const Button = styled.button<ButtonCSSProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: ${(props) => (props.fullWidth ? '100%' : 'fit-content')};
  padding: 0 16px;
  border-radius: 4px;
  border: 1px solid transparent;
  white-space: nowrap;
  appearance: none;

  ${(props) => handleButtonSize(props)}
  ${(props) => handleButtonType(props)}
`;
