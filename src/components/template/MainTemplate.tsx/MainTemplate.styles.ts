import styled from '@emotion/styled';

export const TemplateContainer = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  height: ${(props) =>
    `calc(100% - ${props.theme.layoutComponent.header_height}px - ${props.theme.layoutComponent.footer_height}px)`};
`;
