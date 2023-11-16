import {
  Message,
  RoomInfo,
  addOnMessageListener,
  removeOnMessageListener,
} from '@/apis/chat';

import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { chatRoomIdState } from '@/recoil/chatRoomIdState';

import * as S from './ChatRoomCard.styles';

interface ChatRoomCardProps {
  room: RoomInfo;
}

function ChatRoomCard({ room }: ChatRoomCardProps) {
  const [roomId, setRoomId] = useRecoilState(chatRoomIdState);

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

  const handleClickRoom = () => {
    setRoomId(room.roomId);
  };

  const cardStyleType = () => {
    if (room.roomId === roomId) {
      return '#fafafa';
    } else return '';
  };

  return (
    <S.ChatRoomCardContainer
      onClick={handleClickRoom}
      style={{ backgroundColor: cardStyleType() }}
    >
      <div>
        <S.ChatRoomTitle>
          ({currentMemberCount}/{room.maxMemberCount}) {room.title}
        </S.ChatRoomTitle>
        <S.ChatRoomLastMessage>
          {lastMessage.isWelcome
            ? `'${lastMessage.nickName}' 님이 '${room.title}' 그룹에 참여하셨습니다.`
            : lastMessage.messageContent}
        </S.ChatRoomLastMessage>
      </div>
    </S.ChatRoomCardContainer>
  );
}

export default ChatRoomCard;
