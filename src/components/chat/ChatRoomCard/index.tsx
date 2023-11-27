import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import {
  Message,
  RoomInfo,
  addOnMessageListener,
  removeOnMessageListener,
} from '@/apis/chat';
import { chatRoomIdState, roomInfoMapState } from '@/recoil/chatRoomState';

import * as S from './ChatRoomCard.styles';

interface ChatRoomCardProps {
  room: RoomInfo;
}

function ChatRoomCard({ room }: ChatRoomCardProps) {
  const setRoom = useSetRecoilState(roomInfoMapState);

  const [roomId, setRoomId] = useRecoilState(chatRoomIdState);

  const [newMessageCount, setNewMessageCount] = useState(0);

  const lastMessage =
    room.messages.length > 0
      ? room.messages[room.messages.length - 1].content
      : '';

  useEffect(() => {
    function messageHandler(message: Message) {
      setRoom((prevRoomInfoMap) => ({
        ...prevRoomInfoMap,
        [room.chatRoomId]: {
          ...prevRoomInfoMap[room.chatRoomId],
          messages: [
            ...(prevRoomInfoMap[room.chatRoomId]?.messages || []),
            message,
          ],
        },
      }));
      if (roomId !== room.chatRoomId) {
        setNewMessageCount(newMessageCount + 1);
      }
    }

    addOnMessageListener(room.chatRoomId, messageHandler);
    return () => removeOnMessageListener(room.chatRoomId, messageHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room, roomId, newMessageCount]);

  const handleClickRoom = () => {
    setRoomId(room.chatRoomId);
    setNewMessageCount(0);
  };

  const cardStyleType = () => {
    if (roomId === room.chatRoomId) {
      return '#fafafa';
    } else return '';
  };

  return (
    <S.ChatRoomCardContainer
      onClick={handleClickRoom}
      style={{ backgroundColor: cardStyleType() }}
    >
      <div className='w-[100%]'>
        <S.ChatRoomTitle>{room.title}</S.ChatRoomTitle>
        <S.ChatRoomLastMessage>
          {lastMessage}
          {newMessageCount > 0 && (
            <S.NewMessageCount>{newMessageCount}</S.NewMessageCount>
          )}
        </S.ChatRoomLastMessage>
      </div>
    </S.ChatRoomCardContainer>
  );
}

export default ChatRoomCard;
