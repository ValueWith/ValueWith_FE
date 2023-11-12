import {
  Message,
  RoomInfo,
  addOnMessageListener,
  removeOnMessageListener,
} from '@/apis/chat';
import * as S from './ChatRoomCard.styles';
import { useEffect, useState } from 'react';

interface ChatRoomCardProps {
  room: RoomInfo;
}

function ChatRoomCard({ room }: ChatRoomCardProps) {
  const [lastMessage, setLastMessage] = useState<Message>(room.lastMessage);
  const [currentMemberCount, setCurrentMemberCount] = useState<number>(
    room.currentMemberCount
  );

  useEffect(() => {
    function messageHandler(message: Message) {
      setLastMessage(message);
      if (message.isWelcome) {
        setCurrentMemberCount((prev) => ++prev);
      }
    }

    addOnMessageListener(room.roomId, messageHandler);
    return () => removeOnMessageListener(room.roomId, messageHandler);
  }, [room.roomId]);

  return (
    <S.ChatRoomCardContainer>
      <div>
        {currentMemberCount}/{room.maxMemberCount}
        {room.title}
      </div>
      <div>
        {lastMessage.isWelcome
          ? `${lastMessage.nickName}님이 ${room.title} 그룹에 참여하셨습니다.`
          : lastMessage.messageContent}
      </div>
    </S.ChatRoomCardContainer>
  );
}

export default ChatRoomCard;
