import { RoomInfo } from '@/apis/chat';
import ChatRoomCard from '../ChatRoomCard';

import * as S from './ChatRoomList.styles';
import { RoomInfoMap } from '@/recoil/chatRoomIdState';

interface ChatRoomListProps {
  rooms: RoomInfoMap;
}

function ChatRoomList({ rooms }: ChatRoomListProps) {
  console.log('rooms', rooms);
  return (
    <S.ChatRoomListContainer>
      {Object.values(rooms)
        .reverse()
        .map((room: RoomInfo) => (
          <ChatRoomCard key={room.chatRoomId} room={room} />
        ))}
    </S.ChatRoomListContainer>
  );
}

export default ChatRoomList;
