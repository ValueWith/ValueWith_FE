import ChatRoomList from '@/components/chat/ChatRoomList';
import * as S from './Chat.styles';
import { useEffect, useState } from 'react';
import { RoomInfo, requestSocketSession } from '@/apis/chat';

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
    </S.ChatContainer>
  );
}

export default Chat;
