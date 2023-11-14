import axios from 'axios';

export interface Message {
  userId: string;
  nickName: string;
  profileUrl: string;
  messageId: string;
  messageContent: string;
  createdAt: string; // ISO 8601 2013-06-13T13:12:13.123+09:00
  isWelcome: boolean;
}

export interface RoomInfo {
  roomId: number;
  currentMemberCount: number;
  maxMemberCount: number;
  title: string;
  lastMessage: Message;
}

export interface MessageListItem {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
  messages: Message[];
}

export type MessageListener = (newMessage: Message) => void;

const messageListenerMap = new Map<number, MessageListener[]>();

// 페이지 진입 시 소켓 연결하는 함수
export function requestSocketSession(onSuccess: (rooms: RoomInfo[]) => void) {
  // TODO: 실제로 해야하는 일
  // const socket = new SockJS(`${API_BASE_URL}${LIVE_ENDPOINT}`);
  // const stompClient = Stomp.over(socket);
  // stompClient.connect({}, async () => {
  //   const rooms = await getRooms();
  //   rooms.forEach((roomInfo) => {
  //     stompClient?.subscribe(`rooms/${roomInfo.roomId}/chats`, ({ body }) => {
  //       const newMessage = JSON.parse(body) as Message;
  //       messageListenerMap
  //         .get(roomInfo.roomId)
  //         ?.forEach((messageListener) => messageListener(newMessage));
  //     });
  //   });
  //   onSuccess(rooms);
  // });

  // TODO: Mock
  onSuccess([
    {
      roomId: 1,
      currentMemberCount: 1,
      maxMemberCount: 5,
      title: '한옥에서 한복입고 사진찍는거 어때?',
      lastMessage: {
        userId: 'test',
        nickName: '유진',
        profileUrl: 'https://picsum.photos/200',
        messageId: 'messageId1',
        messageContent: '',
        createdAt: '2023-11-12T15:03:17.402Z',
        isWelcome: true,
      },
    },
    {
      roomId: 2,
      currentMemberCount: 2,
      maxMemberCount: 5,
      title: '보드게임카페 가쥬아',
      lastMessage: {
        userId: 'test',
        nickName: '지유진',
        profileUrl: 'https://picsum.photos/200',
        messageId: 'messageId1',
        messageContent: '제 MBTI는 ISTJ 입니다.',
        createdAt: '2023-11-12T15:03:17.402Z',
        isWelcome: false,
      },
    },
    {
      roomId: 3,
      currentMemberCount: 3,
      maxMemberCount: 5,
      title: '물놀이 어때요?',
      lastMessage: {
        userId: 'test',
        nickName: '수균',
        profileUrl: 'https://picsum.photos/200',
        messageId: 'messageId1',
        messageContent: '안녕하세요 이수근입니다.',
        createdAt: '2023-11-12T15:03:17.402Z',
        isWelcome: false,
      },
    },
    {
      roomId: 4,
      currentMemberCount: 4,
      maxMemberCount: 5,
      title: '부산 회먹으러 갈사람?',
      lastMessage: {
        userId: 'test',
        nickName: '수균',
        profileUrl: 'https://picsum.photos/200',
        messageId: 'messageId1',
        messageContent: '저는 부산 처음가봐요.',
        createdAt: '2023-11-12T15:03:17.402Z',
        isWelcome: false,
      },
    },
  ]);

  return () => {
    // TODO: 실제로 해야하는 일
    // stompClient.connected && stompClient.disconnect();
  };
}

function getRooms(): Promise<RoomInfo[]> {
  return new Promise((resolve) => {
    // resolve(true);
  });
}

export function addOnMessageListener(
  roomId: number,
  messageListener: MessageListener
) {
  const messageListeners: MessageListener[] =
    messageListenerMap.get(roomId) ||
    (messageListenerMap.set(roomId, []).get(roomId) as MessageListener[]);

  if (!messageListeners.includes(messageListener)) {
    messageListeners.push(messageListener);
  }
}

export function removeOnMessageListener(
  roomId: number,
  messageListener: MessageListener
) {
  const messageListeners: MessageListener[] =
    messageListenerMap.get(roomId) ||
    (messageListenerMap.set(roomId, []).get(roomId) as MessageListener[]);

  if (messageListeners.includes(messageListener)) {
    const index = messageListeners.indexOf(messageListener);
    messageListeners.splice(index, 1);
  }
}

export async function getMessages(
  roomId: number,
  untilDatetime: string,
  page: number
): Promise<MessageListItem> {
  try {
    const response = await axios.get<MessageListItem>(
      `http://localhost:5000/messages?roomId=${roomId}&untilDatetime=${untilDatetime}&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error('Error Fetching data: ', error);
    throw error;
  }
}

export function postMessage(
  roomId: number,
  newMessage: Omit<Message, 'messageId'>
): Promise<boolean> {
  return new Promise((resolve) => {
    resolve(true);
  });
}

// TODO: underline is mock
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.__LIVE_TEST__ = {
  publishEvent(roomId: number, newMessage: Message) {
    messageListenerMap
      .get(roomId)
      ?.forEach((messageListener) => messageListener(newMessage));
  },
};
