import {
  LastMessage,
  Message,
  RoomInfo,
  addOnMessageListener,
  removeOnMessageListener,
} from '@/apis/chat';

import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { chatRoomIdState } from '@/recoil/chatRoomIdState';

import * as S from './ChatRoomCard.styles';

interface ChatRoomCardProps {
  room: RoomInfo;
}

function convertToMessage(lastMessage: LastMessage | null) {
  return {
    content: lastMessage?.content,
    createdAt: lastMessage?.createdAt,
    memberEmail: lastMessage?.memberIdDto.memberEmail,
    memberId: lastMessage?.memberIdDto.memberId,
    memberNickname: lastMessage?.memberIdDto.memberNickname,
    memberProfileUrl: lastMessage?.memberIdDto.memberProfileUrl,
  };
}

function ChatRoomCard({ room }: ChatRoomCardProps) {
  const [roomId, setRoomId] = useRecoilState(chatRoomIdState);

  const [lastMessage, setLastMessage] = useState(
    convertToMessage(room.lastMessage)
  );

  useEffect(() => {
    function messageHandler(message: Message) {
      setLastMessage(message);
    }

    addOnMessageListener(room.chatRoomId, messageHandler);
    return () => removeOnMessageListener(room.chatRoomId, messageHandler);
  }, [room.chatRoomId]);

  const handleClickRoom = () => {
    setRoomId(room.chatRoomId);
  };

  const cardStyleType = () => {
    if (room.chatRoomId === roomId) {
      return '#fafafa';
    } else return '';
  };

  return (
    <S.ChatRoomCardContainer
      onClick={handleClickRoom}
      style={{ backgroundColor: cardStyleType() }}
    >
      <div>
        <S.ChatRoomTitle>{room.title}</S.ChatRoomTitle>
        <S.ChatRoomLastMessage>{lastMessage.content}</S.ChatRoomLastMessage>
      </div>
    </S.ChatRoomCardContainer>
  );
}

export default ChatRoomCard;
