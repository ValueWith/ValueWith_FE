import styled from '@emotion/styled';
import theme from '@assets/styles/theme';

export const TemplateContainer = styled.main`
  width: 100%;
  min-height: ${`calc(100% - ${theme.layoutComponent.header_height}px - ${theme.layoutComponent.footer_height}px)`};
  padding: 50px 0;
  position: relative;

  &.chat::before {
    content: '';
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #f1f9ff;
    z-index: -9;
  }
`;

export const TemplateInner = styled.div`
  width: 100%;
  max-width: calc(1180px + 32px);
  padding: 0 16px;
  margin: 0 auto;

  &.user {
    max-width: calc(450px + 32px);
  }
`;
