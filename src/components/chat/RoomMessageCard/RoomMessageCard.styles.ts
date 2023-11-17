import theme from '@/assets/styles/theme';
import styled from '@emotion/styled';

export const OtherMessageCardContainer = styled.div`
  display: flex;
  gap: 14px;
  margin-bottom: 22px;
`;

export const MyMessageCardContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  text-align: right;
  gap: 14px;
  margin-bottom: 22px;
`;

export const UserWelcome = styled.div`
  width: 100%;
  font-size: 15px;
  color: #222222;
  text-align: center;
  padding: 10px 0;
`;

export const UserProfileImg = styled.img`
  width: 41px;
  height: 41px;
  object-fit: cover;
  border-radius: 50%;
`;

export const UserChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

export const UserName = styled.p`
  font-size: 15px;
  color: #222222;
`;

export const UserMessage = styled.div`
  padding: 8px 21px;
  font-size: 15px;
  color: #222222;
  background-color: #f1f9ff;
  box-shadow: 0px 1px 2px ${theme.color.gray100};
  border-radius: 4px;
`;

export const MyMessage = styled.div`
  padding: 8px 21px;
  font-size: 15px;
  color: #222222;
  background-color: #ffffff;
  box-shadow: 0px 1px 2px ${theme.color.gray100};
  border-radius: 4px;
`;
