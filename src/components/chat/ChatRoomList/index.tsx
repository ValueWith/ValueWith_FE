import { RoomInfo } from '@/apis/chat';
import { RoomInfoMap } from '@/recoil/chatRoomIdState';

import ChatRoomCard from '../ChatRoomCard';

import * as S from './ChatRoomList.styles';

interface ChatRoomListProps {
  rooms: RoomInfoMap;
}

function ChatRoomList({ rooms }: ChatRoomListProps) {
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
