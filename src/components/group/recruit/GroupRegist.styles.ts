import styled from '@emotion/styled';
import theme from '@assets/styles/theme';

export const GroupRegistContainer = styled.div`
  position: relative;
  width: 450px;
  min-width: 450px;
  padding: 28px 28px 0;
`;

export const GroupRegistFormWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .calendarIcon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 14px;
    width: 24px;
    height: 24px;
  }
`;
