import { atom } from 'recoil';

export interface GroupRegistModel {
  groupArea: string;
  groupThumbnail: File | null;
}

export const groupRegistState = atom<GroupRegistModel>({
  key: 'groupResistState',
  default: {
    groupArea: '',
    groupThumbnail: null,
  },
});
