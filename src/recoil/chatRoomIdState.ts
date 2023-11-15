import { atom } from 'recoil';

export const chatRoomIdState = atom<number>({
  key: 'chatRoomIdState',
  default: 0,
});
