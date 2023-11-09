import { atom } from 'recoil';

export const paramsState = atom({
  key: 'paramsState',
  default: {
    page: '1',
    status: 'all',
    area: 'all',
    sort: 'latest',
    title: '',
  },
});
