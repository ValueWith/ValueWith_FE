import { atom } from 'recoil';

export interface GroupRegistModel {
  groupArea: string;
}

export const groupRegistState = atom({
  key: 'groupResistState',
  default: {
    groupArea: '',
  },
});
