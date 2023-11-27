import { RoomInfo } from '@/apis/chat';
import { RoomInfoMap } from '@/recoil/chatRoomState';

import ChatRoomCard from '../ChatRoomCard';

import * as S from './ChatRoomList.styles';

interface ChatRoomListProps {
  rooms: RoomInfoMap;
}

function ChatRoomList({ rooms }: ChatRoomListProps) {
  return (
    <S.ChatRoomListContainer>
      {Object.values(rooms).map((room: RoomInfo) => (
        <ChatRoomCard key={room.chatRoomId} room={room} />
      ))}
    </S.ChatRoomListContainer>
  );
}

export default ChatRoomList;
