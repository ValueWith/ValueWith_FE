import styled from '@emotion/styled';
import theme from '@assets/styles/theme';

export const HeaderContainer = styled.header`
  position: relative;
  width: 100%;
  height: ${theme.layoutComponent.header_height}px;
  border-bottom: 1px solid ${theme.color.gray200};
  z-index: 3;
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

  .list {
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
  cursor: pointer;

  &:first-of-type {
    margin-left: 0;
  }

  &.userProfile {
    margin-left: 20px;
  }
`;

// 프로필 드롭다운
export const ProfileDropdownContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 15px;
`;

export const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export const ProfileNickname = styled.span`
  margin-left: 5px;
  color: #000;
`;

//  서브 메뉴
export const SubMenuContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 46px;
  border-bottom: 1px solid ${theme.color.gray200};
`;

export const SubMenuList = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const SubMenuItem = styled.li`
  display: inline-flex;
  align-items: center;
  height: 100%;
  margin-left: 12px;
  font-size: 13px;
  padding: 3px 10px 0;
  border-bottom: 3px solid transparent;
  color: ${theme.color.gray700};
  cursor: pointer;

  &:first-of-type {
    margin-left: 0;
  }

  &.active {
    color: ${theme.color.primary};
    border-bottom: 3px solid ${theme.color.primary};
  }
`;
