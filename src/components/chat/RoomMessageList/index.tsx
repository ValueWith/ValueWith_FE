import { FormEvent, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { Message, postMessage } from '@/apis/chat';
import { chatRoomState } from '@/recoil/chatRoomState';
import { chatMessagesState } from '@/recoil/chatRoomState';

import Input from '@/components/Input';
import Button from '@/components/Button';
import RoomMessageCard from '../RoomMessageCard';

import * as S from './RoomMessageList.styles';

function RoomMessageList() {
  const [inputValue, setInputValue] = useState('');
  const roomInfo = useRecoilValue(chatRoomState);
  const chatListContainerRef = useRef<HTMLDivElement>(null);

  const storedData = localStorage.getItem('userInfo');
  const userInfo = storedData && JSON.parse(storedData);

  const chatMessages = useRecoilValue(chatMessagesState);
  const messageForRoom = chatMessages[roomInfo.chatRoomId] || [];

  useEffect(() => {
    const chatListContainer = chatListContainerRef.current;

    if (chatListContainer) {
      // 스크롤을 항상 아래에 유지
      chatListContainer.scrollTop = chatListContainer.scrollHeight;
    }
  }, [chatMessages]);

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
      postMessage(roomInfo.chatRoomId, newMessage);
      setInputValue('');
    }
  };

  if (roomInfo.chatRoomId === 0) {
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
        <form onSubmit={handleSubmitMessage}>
          <Input
            inputType='input'
            name='inputMessage'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              borderRadius: 0,
              border: 0,
              borderTop: '1px solid #e0e0e0',
              height: '130px',
              fontSize: '15px',
            }}
          />
          <Button
            type='submit'
            styleType='solid'
            style={{ position: 'absolute', right: '19px', bottom: 0 }}
          >
            전송
          </Button>
        </form>
      </div>
    </S.RoomMessageListContainer>
  );
}

export default RoomMessageList;
