import { atom } from 'recoil';

export interface ParamsModel {
  page: string;
  status: 'all' | 'open';
  area: string;
  sort: 'latest' | 'deadline';
  title: string;
}

export const paramsState = atom<ParamsModel>({
  key: 'paramsState',
  default: {
    page: '1',
    status: 'all',
    area: 'all',
    sort: 'latest',
    title: '',
  },
});
