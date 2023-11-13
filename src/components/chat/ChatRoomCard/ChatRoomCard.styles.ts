import styled from '@emotion/styled';

export const ChatRoomCardContainer = styled.div`
  width: 100%;
  min-height: 97px;
  /* padding: 23px 0 0 19px; */
  padding: 0 19px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  &:hover {
    background-color: #fafafa;
  }
`;

export const ChatRoomTitle = styled.p`
  font-size: 16px;
  color: #222222;
  letter-spacing: -0.6px;
  font-weight: 500;
`;

export const ChatRoomLastMessage = styled.p`
  font-size: 13px;
  color: #707070;
  letter-spacing: -0.65px;
  margin-top: 9px;
`;
