import { Message } from '@/apis/chat';
import * as S from './RoomMessageCard.styles';

interface RoomMessageCardProps {
  message: Message;
}

function RoomMessageCard({ message }: RoomMessageCardProps) {
  // userId 가 현재 user와 동일한지 식별하기 위한 임시 변수
  const currentUserId = 'userId1';

  return (
    <>
      {message.isWelcome ? (
        <S.UserWelcome>
          '{message.nickName}' 님이 그룹에 참여하셨습니다.
        </S.UserWelcome>
      ) : (
        <>
          {currentUserId === message.userId ? (
            <S.MyMessageCardContainer>
              <S.UserChatContainer>
                <S.UserName>나</S.UserName>
                <S.MyMessage>{message.messageContent}</S.MyMessage>
              </S.UserChatContainer>
            </S.MyMessageCardContainer>
          ) : (
            <S.OtherMessageCardContainer>
              <S.UserProfileImg src={message.profileUrl} />
              <S.UserChatContainer>
                <S.UserName>{message.nickName}</S.UserName>
                <S.UserMessage>{message.messageContent}</S.UserMessage>
              </S.UserChatContainer>
            </S.OtherMessageCardContainer>
          )}
        </>
      )}
    </>
  );
}

export default RoomMessageCard;
