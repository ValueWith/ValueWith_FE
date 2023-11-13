import { RoomInfo } from '@/apis/chat';
import ChatRoomCard from '../ChatRoomCard';

import * as S from './ChatRoomList.styles';

interface ChatRoomListProps {
  rooms: RoomInfo[];
}

function ChatRoomList({ rooms }: ChatRoomListProps) {
  console.log('rooms', rooms);
  return (
    <S.ChatRoomListContainer>
      {rooms.map((room) => (
        <ChatRoomCard key={room.roomId} room={room} />
      ))}
    </S.ChatRoomListContainer>
  );
}

export default ChatRoomList;
