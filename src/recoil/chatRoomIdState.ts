import { MessageListItem, RoomInfo } from '@/apis/chat';
import { atom } from 'recoil';

export type RoomInfoMap = { [chatRoomId: number]: RoomInfo };

export type RoomMessageMap = { [chatRoomId: number]: MessageListItem };

export const chatRoomIdState = atom<number>({
  key: 'chatRoomIdState',
  default: 0,
});

export const roomInfoMapState = atom<RoomInfoMap>({
  key: 'roomInfoMap',
  default: {},
});

export const roomMessageMapState = atom<RoomMessageMap>({
  key: 'roomMessageMap',
  default: {},
});
