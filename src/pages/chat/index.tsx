import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { RoomInfoMap, roomInfoMapState } from '@/recoil/chatRoomIdState';
import { RoomInfo, requestSocketSession } from '@/apis/chat';

import ChatRoomList from '@/components/chat/ChatRoomList';
import RoomMessageList from '@/components/chat/RoomMessageList';
import Loader from '@/components/common/Loader';

import * as S from './Chat.styles';

function convertToMap(roomInfos: RoomInfo[]): RoomInfoMap {
  const roomInfoMap: RoomInfoMap = {};

  roomInfos.forEach((roomInfo) => {
    roomInfoMap[roomInfo.chatRoomId] = roomInfo;
  });

  return roomInfoMap;
}

function Chat() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [rooms, setRooms] = useRecoilState(roomInfoMapState);

  useEffect(() => {
    const closeSession = requestSocketSession((rooms) => {
      setRooms(convertToMap(rooms));
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
