import { Message } from '@/apis/chat';
import { formatTimeArray } from '@/utils/dateUtil';
import { getUserInfo } from '@/utils/localStorage';

import * as S from './RoomMessageCard.styles';

interface RoomMessageCardProps {
  message: Message;
}

function RoomMessageCard({ message }: RoomMessageCardProps) {
  const userInfo = getUserInfo();

  const isWelcome = message.content.includes('그룹에 참여하셨습니다.');
  const isExit = message.content.includes('그룹에서 나가셨습니다.');
  const createdAt = formatTimeArray(message.createdAt);

  return (
    <>
      {isWelcome || isExit ? (
        <S.UserWelcome>{message.content}</S.UserWelcome>
      ) : (
        <>
          {userInfo.memberId === message.memberId ? (
            <S.MyMessageCardContainer>
              <S.UserChatContainer>
                <S.UserName>나</S.UserName>
                <div className='flex items-end gap-3'>
                  <S.UserMessageDate>{createdAt}</S.UserMessageDate>
                  <S.MyMessage>{message.content}</S.MyMessage>
                </div>
              </S.UserChatContainer>
            </S.MyMessageCardContainer>
          ) : (
            <S.OtherMessageCardContainer>
              <S.UserProfileImg src={message.profileUrl} />
              <S.UserChatContainer>
                <S.UserName>{message.nickName}</S.UserName>
                <div className='flex items-end gap-3'>
                  <S.UserMessage>{message.content}</S.UserMessage>
                  <S.UserMessageDate>{createdAt}</S.UserMessageDate>
                </div>
              </S.UserChatContainer>
            </S.OtherMessageCardContainer>
          )}
        </>
      )}
    </>
  );
}

export default RoomMessageCard;
