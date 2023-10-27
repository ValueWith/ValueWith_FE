import styled from '@emotion/styled';
import theme from '@assets/styles/theme';

export const HeaderContainer = styled.header`
  width: 100%;
  height: ${theme.layoutComponent.header_height}px;
  border-bottom: 1px solid ${theme.color.gray200};
`;

export const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: calc(1180px + 32px);
  padding: 0 16px;
  height: 100%;
  margin: 0 auto;
`;

export const HeaderLogo = styled.div`
  cursor: pointer;
`;

export const HeaderMenu = styled.nav`
  display: inline-flex;
  align-items: center;
  margin-left: 68px;

  .header__menu-list {
    display: inline-flex;
    align-items: center;
    height: 100%;
  }
`;

export const HeaderMenuItem = styled.li`
  display: inline-flex;
  height: 100%;
  margin-right: 35px;
  font-size: 15px;
  font-weight: 500;
  color: ${theme.color.fontgray};
  cursor: pointer;

  &.active {
    color: ${theme.color.primary};
    font-weight: bold;
  }
`;

export const UserActionsWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  margin-left: auto;
`;

export const UserActions = styled.ul`
  display: inline-flex;
  align-items: center;
  color: ${theme.color.gray700};
`;

export const UserActionItem = styled.li`
  margin-left: 12px;

  &:first-of-type {
    margin-left: 0;
  }
`;
