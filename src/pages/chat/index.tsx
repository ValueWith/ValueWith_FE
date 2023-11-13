import { useEffect, useState } from 'react';

import { RoomInfo, requestSocketSession } from '@/apis/chat';

import ChatRoomList from '@/components/chat/ChatRoomList';
import RoomMessageList from '@/components/chat/RoomMessageList';

import * as S from './Chat.styles';

function Chat() {
  const [rooms, setRooms] = useState<RoomInfo[]>([]);

  useEffect(() => {
    const closeSession = requestSocketSession((rooms) => {
      setRooms(rooms);
    });
    return closeSession();
  }, []);

  return (
    <S.ChatContainer>
      <ChatRoomList rooms={rooms} />
      <RoomMessageList />
    </S.ChatContainer>
  );
}

export default Chat;
