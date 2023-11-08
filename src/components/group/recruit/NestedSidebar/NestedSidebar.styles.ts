import styled from '@emotion/styled';
import theme from '@/assets/styles/theme';

export const NestedSidebarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 100%;
  width: 450px;
  height: 100%;
  padding: 28px 0;
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
  padding: 0 28px;
  font-weight: 500;
`;
