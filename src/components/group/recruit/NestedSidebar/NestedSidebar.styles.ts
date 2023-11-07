import styled from '@emotion/styled';
import theme from '@/assets/styles/theme';

export const NestedSidebarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 100%;
  width: 450px;
  height: 100%;
  padding: 28px;
  background-color: #fcfcfc;
  border-right: 1px solid #e3e3e3;
  z-index: 2;
  overflow-y: auto;
  overflow-y: overlay;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const NestedSidebarHeading = styled.h2`
  font-size: 28px;
`;

export const GroupItemCardContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 28px;
`;
