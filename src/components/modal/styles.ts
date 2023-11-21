import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '@/assets/styles/theme.ts';
import { ModalCSSProps } from '@/recoil/modalState';

export const ModalOverlay = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContainer = styled.div<ModalCSSProps>`
  position: fixed;
  z-index: 10000;
  width: 100%;
  max-width: 500px;
  background-color: white;
  border-radius: 10px;
  padding: 30px 24px;
  box-sizing: border-box;

  ${(props) => {
    switch (props.alignType) {
      case 'center':
        return `
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
      `;
      case 'top':
        return `
            top: 180px;
            left: 50%;
            transform: translateX(-50%);
        `;
      default:
        return `
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        `;
    }
  }}
`;

export const ModalHeader = styled.h2`
  font-size: 21px;
  font-weight: 500;
  margin-bottom: 14px;
`;

export const ModalContent = styled.div``;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const ConfirmButton = styled.button<ModalCSSProps>`
  width: fit-content;
  min-width: 80px;
  margin-left: 10px;
  padding: 10px;
  border-radius: 5px;
  color: #fff;
  font-weight: 600;
  border: none;
  cursor: pointer;

  ${(props) => {
    switch (props.confirmType) {
      case 'confirm':
        return css`
          background-color: ${theme.color.primary};
        `;
      case 'warning':
        return css`
          background-color: ${theme.color.red300};
          color: #fff;
        `;
      default:
        return css`
          background-color: ${theme.color.primary};
        `;
    }
  }}
`;

export const CancelButton = styled.button`
  width: fit-content;
  min-width: 80px;
  padding: 10px;
  border-radius: 5px;
  background-color: #f0f0f0;
  font-weight: 600;
  border: none;
  cursor: pointer;
`;
