import styled from '@emotion/styled';
import { DefaultModalTemplateCSSProps } from '.';

export const DefaultModalContainer = styled.div<DefaultModalTemplateCSSProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
  width: 100%;
  height: ${(props) => props.modalHeight || 'auto'};
  max-width: ${(props) => props.modalWidth || '500px'};
  background-color: white;
  border-radius: 10px;
  padding: 30px 24px;
  box-sizing: border-box;
  overflow-y: ${(props) => (props.isScroll ? 'overlay' : 'auto')};

  .closeButton {
    position: absolute;
    top: 13px;
    right: 13px;
    min-width: auto;
    padding: 0;
    color: #000;
  }

  &.calendarDetailInfo {
    padding: 46px 20px 20px;
    width: 470px;
    height: 434px;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
