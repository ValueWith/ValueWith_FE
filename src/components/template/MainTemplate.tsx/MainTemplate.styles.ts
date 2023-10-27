import styled from '@emotion/styled';
import theme from '@assets/styles/theme';

export const TemplateContainer = styled.main`
  width: 100%;
  min-height: ${`calc(100% - ${theme.layoutComponent.header_height}px - ${theme.layoutComponent.footer_height}px)`};
`;

export const TemplateInner = styled.div`
  width: 100%;
  max-width: calc(1080px + 32px);
  padding: 0 16px;
  margin: 0 auto;

  &.user {
    max-width: calc(450px + 32px);
  }
`;
