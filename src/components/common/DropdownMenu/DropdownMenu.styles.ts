import styled from '@emotion/styled';
import theme from '@assets/styles/theme';

export const DropdownMenuContainer = styled.div`
  position: relative;
`;

export const DropdownMenuList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  min-width: 100px;
  padding: 8px 6px;
  margin: 2px 0 0;
  font-size: 14px;
  text-align: left;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
`;

export const DropdownMenuItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  color: ${theme.color.fontgray};
  cursor: pointer;

  &:hover {
    background-color: ${theme.color.gray000};
  }
`;
