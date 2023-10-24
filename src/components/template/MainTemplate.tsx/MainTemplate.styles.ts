import styled from '@emotion/styled';

export const TemplateContainer = styled.div`
  width: 100%;
  height: ${(props) =>
    `calc(100% - ${props.theme.layoutComponent.header_height}px - ${props.theme.layoutComponent.footer_height}px)`};
`;
