import { atom } from 'recoil';
import { Message, RoomInfo } from '@/apis/chat';

const defaultRoomInfo: RoomInfo = {
  chatRoomId: 0,
  messages: [],
  title: '',
  tripGroupId: 0,
};

type ChatMessages = {
  [roomId: number]: Message[];
};

export const chatRoomState = atom<RoomInfo>({
  key: 'chatRoomState',
  default: defaultRoomInfo,
});

export const chatRoomIdState = atom<number>({
  key: 'chatRoomIdState',
  default: 0,
});

export const chatMessagesState = atom<ChatMessages>({
  key: 'chatMessagesState',
  default: {},
});
