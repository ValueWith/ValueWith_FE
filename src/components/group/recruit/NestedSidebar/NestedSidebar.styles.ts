import styled from '@emotion/styled';
import theme from '@/assets/styles/theme';

export const NestedSidebarContainer = styled.div`
  position: absolute;
  top: 0;
  left: calc(100% + 1px);
  width: 450px;
  height: 100%;
  padding: 28px;
  background-color: #fcfcfc;
  z-index: 2;
`;

export const NestedSidebarHeading = styled.h2`
  font-size: 28px;
`;
