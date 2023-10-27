import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '@assets/styles/theme';

export const commonInputStyle = css`
  width: 100%;
  height: 42px;
  border: 0;
  font: inherit;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid ${theme.color.gray200};

  &::placeholder {
    color: rgba(128, 128, 128, 0.9);
  }

  &:focus-within {
    border: 1px solid ${theme.color.primary};
  }

  &.error {
    border: 1px solid ${theme.color.red300};
  }
`;

export const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

export const InputLabel = styled.label`
  display: block;
  margin-bottom: 4px;
`;

export const Input = styled.input`
  ${commonInputStyle}
  padding:0 16px;
`;

export const Textarea = styled.textarea`
  ${commonInputStyle}
  padding: 10px;
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
