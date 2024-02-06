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
  const [newMessage, setNewMessage] = useState<boolean>(false);

  const [lastMessage, setLastMessage] = useState(
    room?.lastMessage?.content || ''
  );

  useEffect(() => {
    function messageHandler(message: Message) {
      setLastMessage(message.content);
      if (room.chatRoomId !== roomId) {
        setNewMessage(true);
      }
    }

    addOnMessageListener(room.chatRoomId, messageHandler);
    return () => removeOnMessageListener(room.chatRoomId, messageHandler);
  }, [room.chatRoomId, roomId]);

  const handleClickRoom = () => {
    setRoomId(room.chatRoomId);
    setNewMessage(false);
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
      <div className='w-[100%]'>
        <S.ChatRoomTitle>{room.title}</S.ChatRoomTitle>
        <S.ChatRoomLastMessage>
          {lastMessage}
          {newMessage && <S.NewMessage />}
        </S.ChatRoomLastMessage>
      </div>
    </S.ChatRoomCardContainer>
  );
}

export default ChatRoomCard;
