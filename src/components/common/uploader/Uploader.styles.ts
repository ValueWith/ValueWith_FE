import styled from '@emotion/styled';
import theme from '@assets/styles/theme';
import { css } from '@emotion/react';

export const FileUploaderContainer = styled.div`
  margin-bottom: 24px;

  &.loading {
    pointer-events: none;

    div {
      background-color: #f6f6f6;
      color: ${theme.color.gray200};
    }
  }

  &.profile {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const FileUploadInput = styled.input`
  display: none;
`;

export const FileFunctionContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 700px;
  gap: 0 10px;
`;

export const FileUploaderLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  border-radius: 4px;
  border: 1px solid ${theme.color.gray200};
  font-size: 14px;
  background-color: #fff;
  padding: 5px 10px;
  color: ${theme.color.fontgray};
  cursor: pointer;

  // uploadType
  .profile & {
    position: absolute;
    right: 11px;
    bottom: 9px;
    width: 25px;
    height: 25px;
    padding: 0;
    background-color: #5c5c5c;
    border-radius: 50%;
    font-size: 18px;
  }
`;

export const FileDeleteButton = styled.button`
  font-size: 14px;

  // uploadType
  .profile & {
    width: fit-content;
    margin-top: 14px;
    border-radius: 4px;
    border: 1px solid ${theme.color.gray200};
    font-size: 14px;
    background-color: #fff;
    padding: 5px 10px;
    color: ${theme.color.fontgray};
  }
`;

export const FileDropZone = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 160px;
  max-width: 700px;
  height: 160px;
  margin-bottom: 4px;
  border-radius: 4px;
  border: 1px solid ${theme.color.gray200};
  background-color: #f1f8fe;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    min-height: 160px;
    object-fit: cover;
  }

  .dragIcon {
    width: 24px;
    height: 24px;
    margin-right: 7px;
  }

  &.hover {
    border: 1px solid ${theme.color.primary};
  }

  // uploadType
  .profile & {
    max-width: 160px;
    border-radius: 50%;
  }

  .error & {
    border: 1px solid ${theme.color.red300};
  }
`;
