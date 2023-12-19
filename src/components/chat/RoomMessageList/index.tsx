import { FormEvent, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { chatRoomIdState } from '@/recoil/chatRoomIdState';

import {
  Message,
  addOnMessageListener,
  postMessage,
  removeOnMessageListener,
} from '@/apis/chat';
import { useUser } from '@/hooks/useUser';
import { getCurrentTimeArray } from '@/utils/dateUtil';

import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import useGetMessages from '@/hooks/useChat';
import Loader from '@/components/common/Loader';
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
  resultArray.sort((a, b) => {
    const [yearA, monthA, dayA, hoursA, minutesA, secondsA] = a.createdAt;
    const [yearB, monthB, dayB, hoursB, minutesB, secondsB] = b.createdAt;
    const dateA = new Date(yearA, monthA - 1, dayA, hoursA, minutesA, secondsA);
    const dateB = new Date(yearB, monthB - 1, dayB, hoursB, minutesB, secondsB);
    return dateA.getTime() - dateB.getTime();
  });

  return resultArray;
}

function RoomMessageList() {
  const roomId = useRecoilValue(chatRoomIdState);
  const { userInfo } = useUser();

  const [liveMessageList, setLiveMessageList] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    setLiveMessageList([]);
    function messageHandler(message: Message) {
      setLiveMessageList((prev) => [...prev, message]);
    }
    addOnMessageListener(roomId, messageHandler);
    return () => removeOnMessageListener(roomId, messageHandler);
  }, [roomId]);

  const { data, isLoading, isError } = useGetMessages(roomId, page);

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
      // TODO: newMessage 속성 수정
      const newMessage: Message = {
        content: inputValue,
        createdAt: getCurrentTimeArray(),
        messageId: 0,
        email: userInfo.memberEmail,
        memberId: userInfo.memberId,
        nickName: userInfo.memberNickname,
        profileUrl: userInfo.memberProfileUrl,
      };
      postMessage(roomId, newMessage);
      setLiveMessageList((prev) => [...prev, newMessage]);
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
        {combineMessages([...(data?.content || []), ...liveMessageList]).map(
          (userSentMessage) => (
            <RoomMessageCard
              message={userSentMessage}
              key={userSentMessage.messageId}
            />
          )
        )}
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
