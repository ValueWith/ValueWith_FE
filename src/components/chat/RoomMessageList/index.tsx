import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { chatRoomIdState } from '@/recoil/chatRoomIdState';

import {
  Message,
  addOnMessageListener,
  removeOnMessageListener,
} from '@/apis/chat';

import Input from '@/components/Input';
import Button from '@/components/Button';
import useGetMessages from '@/hooks/useChat';
import Loader from '@/components/Loader';
import RoomMessageCard from '../RoomMessageCard';

import * as S from './RoomMessageList.styles';

function combineMessages(messages: Message[]): Message[] {
  const seenIds = new Set();

  const resultArray = messages.filter((message) => {
    // 현재 아이템의 messageId가 이미 나온 적이 있는지 확인
    const isDuplicate = seenIds.has(message.messageId);

    // 나온 적이 없으면 Set에 추가하고 true 반환 (유지)
    if (!isDuplicate) {
      seenIds.add(message.messageId);
    }

    // 나온 적이 있으면 false 반환 (필터링)
    return !isDuplicate;
  });

  // 시간순으로 데이터 정렬
  resultArray.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return resultArray;
}

function RoomMessageList() {
  const roomId = useRecoilValue(chatRoomIdState);
  const [liveMessageList, setLiveMessageList] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setLiveMessageList([]);
    function messageHandler(message: Message) {
      setLiveMessageList((prev) => [...prev, message]);
    }
    addOnMessageListener(roomId, messageHandler);
    return () => removeOnMessageListener(roomId, messageHandler);
  }, [roomId]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const untilDatetime = useMemo(() => new Date().toISOString(), [roomId]);
  const { data, isLoading, isError } = useGetMessages(roomId, untilDatetime, 1);

  const chatListContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatListContainer = chatListContainerRef.current;

    if (chatListContainer) {
      // 스크롤을 항상 아래에 유지
      chatListContainer.scrollTop = chatListContainer.scrollHeight;
    }
    // 현재는 새로운 채팅이 발생하면 아래로 강제 스크롤 됨
  }, [data, liveMessageList]);

  const handleSubmitMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue.trim() !== '') {
      // TODO: message POST
      console.log('input message', inputValue);
      window.__LIVE_TEST__.publishEvent(roomId, {
        userId: `userId${roomId}`, // currentUserId
        nickName: 'name',
        profileUrl: 'https://picsum.photos/200',
        messageId: `messageId${Math.random()}`,
        messageContent: inputValue,
        createdAt: new Date().toISOString(),
        isWelcome: false,
      });

      setInputValue('');
    }
  };

  if (roomId === 0) {
    return <S.RoomMessageListContainer />;
  }

  return (
    <S.RoomMessageListContainer>
      {isLoading && <Loader />}
      {isError && <div>Error...</div>}
      <S.ChatListContainer ref={chatListContainerRef}>
        {combineMessages([...(data?.messages || []), ...liveMessageList]).map(
          (userSentMessage) => (
            <RoomMessageCard
              message={userSentMessage}
              key={userSentMessage.messageId}
            />
          )
        )}
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
