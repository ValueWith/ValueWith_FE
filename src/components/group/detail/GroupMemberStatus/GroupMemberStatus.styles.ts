import theme from '@/assets/styles/theme';
import styled from '@emotion/styled';

export const GroupMemberStatusContainer = styled.div`
  width: 100%;
  height: 138px;
  background-color: #fafafa;
  border-radius: 4px;
  padding: 24px 21px;
  margin-top: 42px;
`;

export const ContentDiv = styled.div`
  display: flex;
  gap: 21px;
  letter-spacing: -0.8px;
  margin-bottom: 8px;
  font-size: 15px;
  position: relative;
`;

export const Title = styled.span`
  color: #1c1c1c;
  font-weight: 500;
`;

export const Content = styled.span`
  color: #707070;
`;

export const Dimmed = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: default;
  z-index: 3;
`;

export const GroupMemberStatusModal = styled.div`
  position: absolute;
  left: 0;
  top: 27px;
  width: 232px;
  padding: 22px 27px;
  background-color: ${theme.color.white};
  box-shadow: 0 2px 4px ${theme.color.gray100};
  border-radius: 4px;
  z-index: 4;
`;

export const ModalTitle = styled.p`
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.8px;
  color: #1c1c1c;
  margin-bottom: 14px;
`;

export const ModalNoContent = styled.p`
  font-size: 13px;
  color: #707070;
  letter-spacing: -0.8px;
`;
