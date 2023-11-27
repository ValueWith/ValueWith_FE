import { FormEvent, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { Message, postMessage, postWelcomeMessage } from '@/apis/chat';
import { chatRoomIdState, roomInfoMapState } from '@/recoil/chatRoomState';

import Input from '@/components/Input';
import Button from '@/components/Button';
import RoomMessageCard from '../RoomMessageCard';

import * as S from './RoomMessageList.styles';

function RoomMessageList() {
  const [inputValue, setInputValue] = useState('');
  const chatListContainerRef = useRef<HTMLDivElement>(null);

  const storedData = localStorage.getItem('userInfo');
  const userInfo = storedData && JSON.parse(storedData);

  const roomId = useRecoilValue(chatRoomIdState);
  const roomInfo = useRecoilValue(roomInfoMapState);

  const messageForRoom = (roomInfo[roomId] && roomInfo[roomId].messages) || [];

  function isWelcome() {
    if (messageForRoom) {
      for (const message of messageForRoom) {
        if (message.memberIdDto.memberId === userInfo.memberId) {
          return false;
        }
      }
    }
    return false;
  }

  useEffect(() => {
    isWelcome() ? postWelcomeMessage(roomId, userInfo.memberId) : null;
  }, [roomInfo]);

  useEffect(() => {
    const chatListContainer = chatListContainerRef.current;

    if (chatListContainer) {
      // 스크롤을 항상 아래에 유지
      chatListContainer.scrollTop = chatListContainer.scrollHeight;
    }
  }, [roomId, roomInfo]);

  const handleSubmitMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue.trim() !== '') {
      const newMessage: Message = {
        content: inputValue,
        memberIdDto: {
          memberEmail: userInfo.memberEmail,
          memberId: userInfo.memberId,
          memberNickname: userInfo.memberNickname,
          memberProfileUrl: userInfo.memberProfileUrl,
        },
      };
      postMessage(roomId, newMessage);
      setInputValue('');
    }
  };

  if (roomId === 0) {
    return <S.RoomMessageListContainer />;
  }

  return (
    <S.RoomMessageListContainer>
      <S.ChatListContainer ref={chatListContainerRef}>
        {messageForRoom &&
          messageForRoom.map((message, index) => (
            <RoomMessageCard message={message} key={index} />
          ))}
      </S.ChatListContainer>
      <div className='relative'>
        <form
          onSubmit={handleSubmitMessage}
          className='flex items-center border-solid border-t border-[#e0e0e0] bg-white chatInputForm'
        >
          <Input
            inputType='input'
            name='inputMessage'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              borderRadius: 0,
              border: 'none',
              borderTop: 0,
              height: '130px',
              fontSize: '15px',
            }}
          />
          <Button
            type='submit'
            styleType='solid'
            style={{ marginRight: '12px', borderTop: 0 }}
          >
            전송
          </Button>
        </form>
      </div>
    </S.RoomMessageListContainer>
  );
}

export default RoomMessageList;
