import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { chatRoomIdState } from '@/recoil/chatRoomIdState';
import {
  Message,
  RoomInfo,
  addOnMessageListener,
  removeOnMessageListener,
} from '@/apis/chat';

import * as S from './ChatRoomCard.styles';

interface ChatRoomCardProps {
  room: RoomInfo;
}

function ChatRoomCard({ room }: ChatRoomCardProps) {
  const [roomId, setRoomId] = useRecoilState(chatRoomIdState);

  const [lastMessage, setLastMessage] = useState(
    room?.lastMessage?.content || ''
  );

  useEffect(() => {
    function messageHandler(message: Message) {
      setLastMessage(message.content);
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
        <S.ChatRoomLastMessage>{lastMessage}</S.ChatRoomLastMessage>
      </div>
    </S.ChatRoomCardContainer>
  );
}

export default ChatRoomCard;
