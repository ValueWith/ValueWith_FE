import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import instance from '.';

export interface Message {
  content: string;
  memberIdDto: {
    memberEmail: string;
    memberId: number;
    memberNickname: string;
    memberProfileUrl: string;
  };
}

export interface RoomInfo {
  chatRoomId: number;
  messages: Message[];
  title: string;
  tripGroupId: number;
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

let stompClient: Stomp.Client | null;

// 페이지 진입 시 소켓 연결하는 함수
export function requestSocketSession(onSuccess: (rooms: RoomInfo[]) => void) {
  const socket = new SockJS('https://tweaver.site/chat');
  stompClient = Stomp.over(socket);

  stompClient.connect({}, async () => {
    const rooms = await getRooms();
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
    const response = await instance.get(`/api/chat/room`);
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

export function postMessage(roomId: number, newMessage: Message) {
  stompClient?.send(`/pub/message/${roomId}`, {}, JSON.stringify(newMessage));
}

export async function enterRoom(roomId: number) {
  try {
    const response = await instance.post(`/api/chat/room/${roomId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error Fetching rooms', error);
    throw error;
  }
}
