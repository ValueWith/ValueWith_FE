import { FormEvent, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useInView } from 'react-intersection-observer';

import {
  LastMessage,
  Message,
  addOnMessageListener,
  postMessage,
  removeOnMessageListener,
} from '@/apis/chat';
import { useUser } from '@/hooks/useUser';
import { getCurrentTimeArray } from '@/utils/dateUtil';
import { chatRoomIdState } from '@/recoil/chatRoomIdState';

import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import useGetMessages from '@/hooks/useChat';
import Loader from '@/components/common/Loader';
import RoomMessageCard from '../RoomMessageCard';

import * as S from './RoomMessageList.styles';

function generateMessageId() {
  return Number(Date.now().toString());
}

function convertToMessage(newMessage: LastMessage) {
  return {
    content: newMessage?.content,
    createdAt: getCurrentTimeArray(),
    email: newMessage?.memberIdDto.memberEmail,
    memberId: newMessage?.memberIdDto.memberId,
    nickName: newMessage?.memberIdDto.memberNickname,
    profileUrl: newMessage?.memberIdDto.memberProfileUrl,
    messageId: generateMessageId(),
  };
}

function combineMessages(messages: Message[]): Message[] {
  console.log('combine messages', messages);
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

  // messageId 순으로 정렬
  resultArray.sort((a, b) => {
    if (a.messageId && b.messageId) {
      return a.messageId - b.messageId;
    }
    return 0;
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
    setPage(0);
    function messageHandler(message: any) {
      // 실시간 채팅 수신 시 liveMessageList에 추가
      setLiveMessageList((prev) => [...prev, convertToMessage(message)]);
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

  const { ref } = useInView({
    rootMargin: '0px',
    threshold: 1.0,
    onChange: (inView) => {
      if (inView) {
        setPage((prev) => prev + 1);
      }
    },
  });

  const handleSubmitMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue.trim() !== '') {
      const newMessage: Message = {
        content: inputValue,
        createdAt: getCurrentTimeArray(),
        email: userInfo.memberEmail,
        memberId: userInfo.memberId,
        nickName: userInfo.memberNickname,
        profileUrl: userInfo.memberProfileUrl,
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
      {isLoading && <Loader />}
      {isError && <div>Error...</div>}
      <S.ChatListContainer ref={chatListContainerRef}>
        <div ref={ref} />
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
