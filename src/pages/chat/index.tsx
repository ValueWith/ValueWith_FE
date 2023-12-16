import { useEffect, useState } from 'react';

import { RoomInfo, requestSocketSession } from '@/apis/chat';

import ChatRoomList from '@/components/chat/ChatRoomList';
import RoomMessageList from '@/components/chat/RoomMessageList';

import * as S from './Chat.styles';
import { RoomInfoMap, roomInfoMapState } from '@/recoil/chatRoomIdState';
import { useRecoilState } from 'recoil';
import Loader from '@/components/common/Loader';

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
          {/* <RoomMessageList /> */}
        </>
      )}
    </S.ChatContainer>
  );
}

export default Chat;
