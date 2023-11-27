import styled from '@emotion/styled';
import theme from '@assets/styles/theme';

export const FooterContainer = styled.footer`
  width: 100%;
  height: ${(props) => props.theme.layoutComponent.footer_height}px;
  border-top: 1px solid ${theme.color.gray200};
`;

export const FooterInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: calc(1180px + 32px);
  padding: 0 16px;
  height: 100%;
  margin: 0 auto;
`;

export const FooterContext = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #767d82;
`;
