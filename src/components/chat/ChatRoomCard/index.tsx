import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import {
  Message,
  RoomInfo,
  addOnMessageListener,
  removeOnMessageListener,
} from '@/apis/chat';
import { chatRoomState } from '@/recoil/chatRoomState';
import { chatMessagesState } from '@/recoil/chatRoomState';

import * as S from './ChatRoomCard.styles';

interface ChatRoomCardProps {
  room: RoomInfo;
}

function ChatRoomCard({ room }: ChatRoomCardProps) {
  const [roomInfo, setRoomInfo] = useRecoilState(chatRoomState);
  const [chatMessages, setChatMessages] = useRecoilState(chatMessagesState);

  const lastMessage =
    chatMessages[room.chatRoomId] && chatMessages[room.chatRoomId].length > 0
      ? chatMessages[room.chatRoomId][chatMessages[room.chatRoomId].length - 1]
          .content
      : null;

  useEffect(() => {
    function messageHandler(message: Message) {
      setChatMessages((prev) => ({
        ...prev,
        [room.chatRoomId]: [...(prev[room.chatRoomId] || []), message],
      }));
    }

    addOnMessageListener(room.chatRoomId, messageHandler);
    return () => removeOnMessageListener(room.chatRoomId, messageHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room]);

  const handleClickRoom = () => {
    setRoomInfo(room);
    // enterRoom(room.chatRoomId);
    // -> 오류메세지: 해당 그룹원이 아닙니다
  };

  const cardStyleType = () => {
    if (roomInfo.chatRoomId === room.chatRoomId) {
      return '#fafafa';
    } else return '';
  };

  return (
    <S.ChatRoomCardContainer
      onClick={handleClickRoom}
      style={{ backgroundColor: cardStyleType() }}
    >
      <div>
        <S.ChatRoomTitle>{room.title}</S.ChatRoomTitle>
        <S.ChatRoomLastMessage>{lastMessage}</S.ChatRoomLastMessage>
      </div>
    </S.ChatRoomCardContainer>
  );
}

export default ChatRoomCard;
