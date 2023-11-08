import styled from '@emotion/styled';
import theme from '@assets/styles/theme';

export const RecruitSidebarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 110px;
  min-width: 110px;
  height: 100%;
  padding: 16px 10px;
  border-right: 1px solid #e3e3e3;
`;

export const RecruitSidebarNavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;

  &.active {
    background-color: ${theme.color.gray000};
  }
`;

export const RecruitNav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 13px 14px 15px;
  text-align: center;
  color: #aaa;
  font-weight: 600;
  cursor: pointer;

  .active & {
    color: ${theme.color.primary};
  }
`;

export const RecruitNavHeading = styled.h2`
  font-size: 21px;
  white-space: nowrap;
`;
