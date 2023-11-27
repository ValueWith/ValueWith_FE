import theme from '@/assets/styles/theme';
import styled from '@emotion/styled';

export const Dimmed = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: default;
  z-index: 1;
`;

export const AlarmModalContainer = styled.div`
  position: absolute;
  right: 0;
  top: 32px;
  width: 280px;
  height: 320px;
  padding: 14px 11px;
  background-color: ${theme.color.white};
  border: 1px solid #eaeaea;
  border-radius: 4px;
  cursor: default;
  z-index: 2;
  overflow-y: scroll;
`;

export const AlarmModalTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const AlarmModalTitle = styled.p`
  font-size: 18px;
  color: #222222;
`;

export const AlarmReadAll = styled.p`
  font-size: 13px;
  color: #595f63;
  cursor: pointer;
`;
