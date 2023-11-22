import { GroupListParams } from '@/apis/group';
import { atom } from 'recoil';

export const paramsState = atom<GroupListParams>({
  key: 'paramsState',
  default: {
    page: '1',
    status: 'all',
    area: 'all',
    sort: 'latest',
    title: '',
  },
});
