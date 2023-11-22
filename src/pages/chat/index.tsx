import { useEffect, useState } from 'react';

import { RoomInfo, requestSocketSession } from '@/apis/chat';

import ChatRoomList from '@/components/chat/ChatRoomList';
import RoomMessageList from '@/components/chat/RoomMessageList';

import * as S from './Chat.styles';
import Loader from '@/components/Loader';

function Chat() {
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const closeSession = requestSocketSession((rooms) => {
      setRooms(rooms);
      setIsLoading(false);
    });
    return closeSession();
  }, []);

  return (
    <S.ChatContainer>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ChatRoomList rooms={rooms} />
          <RoomMessageList />
        </>
      )}
    </S.ChatContainer>
  );
}

export default Chat;
