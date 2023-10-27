import styled from '@emotion/styled';
import { DropdownCSSProps } from '.';
import theme from '@/assets/styles/theme';

export const DropdownContainer = styled.div<DropdownCSSProps>`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  font-size: 14px;
`;

export const SelectedItem = styled.div<DropdownCSSProps>`
  width: 100%;
  height: ${(props) => props.height || '30px'};
`;
export const SelectedItemLabel = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2px 0;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;

  span {
    display: flex;
    align-items: center;
    width: 100%;
    padding-left: 16px;
  }

  .dropdownIcon {
    min-width: 15px;
    margin-right: 8px;
    margin-left: 2px;
  }
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: calc(100% - 2px);
  left: -1px;
  width: 100%;
  width: fit-content;
  min-width: calc(100% + 2px);
  padding: 10px 12px;
  background-color: #fff;
  border-radius: 0 0 4px 4px;
  border: 1px solid #e6e6e6;

  visibility: hidden;
  pointer-events: none;

  &.show {
    visibility: visible;
    pointer-events: auto;
  }
`;

export const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  min-width: fit-content;
  padding: 5px 25px 5px 10px;
  margin-bottom: 5px;
  border-radius: 4px;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background-color: ${theme.color.gray000};
  }
`;
