import { atom } from 'recoil';
import { RoomInfo } from '@/apis/chat';

export type RoomInfoMap = { [chatRoomId: number]: RoomInfo };

export const chatRoomIdState = atom<number>({
  key: 'chatRoomIdState',
  default: 0,
});

export const roomInfoMapState = atom<RoomInfoMap>({
  key: 'roomInfoMap',
  default: {},
});
