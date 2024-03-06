import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import instance from '.';

export interface Message {
  content: string;
  createdAt: number[];
  email: string;
  memberId: number;
  messageId?: number;
  nickName: string;
  profileUrl: string;
}

export interface LastMessage {
  content: string;
  createdAt: number[];
  memberIdDto: {
    memberEmail: string;
    memberId: number;
    memberNickname: string;
    memberProfileUrl: string;
  };
}

export interface RoomInfo {
  chatRoomId: number;
  lastMessage: LastMessage | null;
  title: string;
  tripGroupId: number;
}

export interface MessageListItem {
  content: Message[] | null;
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pabeable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    unpaged: boolean;
  };
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
}

export type MessageListener = (newMessage: Message) => void;

const messageListenerMap = new Map<number, MessageListener[]>();

let stompClient: Stomp.Client | null;

// 페이지 진입 시 소켓 연결하는 함수
export function requestSocketSession(onSuccess: (rooms: RoomInfo[]) => void) {
  const socket = new SockJS('https://valuewith.site/chat');
  stompClient = Stomp.over(socket);

  stompClient.connect({}, async () => {
    const rooms = await getRooms();

    if (!Array.isArray(rooms)) {
      console.error('getRooms() did not return an array');
      return;
    }

    rooms.forEach((roomInfo) => {
      stompClient?.subscribe(
        `/sub/chat/room/${roomInfo.chatRoomId}`,
        ({ body }) => {
          const newMessage = JSON.parse(body) as Message;
          messageListenerMap
            .get(roomInfo.chatRoomId)
            ?.forEach((messageListener) => messageListener(newMessage));
        }
      );
    });
    onSuccess(rooms);
  });

  return () => {
    if (stompClient && stompClient.connected) {
      stompClient.disconnect(() => {
        console.log('Disconnected!');
      });
    }
  };
}

export async function getRooms(): Promise<RoomInfo[]> {
  try {
    const response = await instance.get(
      import.meta.env.VITE_SERVER_URL + `/chat/room`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error Fetching rooms', error);
    throw error;
  }
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

export async function getMessages(roomId: number, page: number) {
  try {
    const response = await instance.get(
      import.meta.env.VITE_SERVER_URL + `/chat/room/${roomId}?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error('Error Fetching room messages', error);
    throw error;
  }
}

export function postMessage(roomId: number, newMessage: object) {
  stompClient?.send(`/pub/message/${roomId}`, {}, JSON.stringify(newMessage));
}

export async function enterRoom(roomId: number) {
  try {
    const response = await instance.post(
      import.meta.env.VITE_SERVER_URL + `/chat/room/${roomId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error Fetching rooms', error);
    throw error;
  }
}
