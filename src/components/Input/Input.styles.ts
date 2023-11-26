import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '@assets/styles/theme';
import { InputCSSProps } from '.';

export const commonInputStyle = css`
  width: 100%;
  height: 42px;
  border: 0;
  font: inherit;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid ${theme.color.gray200};

  &::placeholder {
    color: ${theme.color.gray700};
  }

  &:focus-within {
    border: 1px solid ${theme.color.primary};
  }

  &.error {
    border: 1px solid ${theme.color.red300};
  }

  ::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
`;

export const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 24px;

  .login & {
    margin-bottom: 12px;
  }

  .registGroup & {
    margin-bottom: 10px;
  }
`;

export const InputLabel = styled.label`
  display: block;
  margin-bottom: 4px;
`;

export const Input = styled.input<InputCSSProps>`
  ${commonInputStyle}
  padding:0 16px;

  ${(props) =>
    props.readOnly &&
    `
        color: ${theme.color.gray500};
        &:focus-within {
            border: 1px solid ${theme.color.gray200};
        }
  `}

  &.disabled {
    color: ${theme.color.gray600};
    background-color: #f8f8f8;
    pointer-events: none;
    cursor: default;
  }
`;

export const Textarea = styled.textarea`
  ${commonInputStyle}
  padding: 16px;
  min-height: 158px;
  resize: none;
  overflow-y: scroll;
  overflow-y: overlay;

  &::placeholder {
    white-space: pre-wrap;
  }
`;

export const InputErrorMessage = styled.p`
  margin-top: 4px;
  font-size: 14px;
  color: ${theme.color.red300};
`;
