import { useQuery } from 'react-query';
import { GroupListParams } from './group';
import instance from '.';
import { useEffect } from 'react';

//params :
// - leader : 내가 그룹장인 여행그룹
// - approved : 승인된 여행그룹
// - pending : 승인 대기중인 여행그룹
export function getGroupList(params: GroupListParams) {
  return instance.get('/api/groups/list/my-list', {
    params,
  });
}

export const useMyLoungeData = (params: any) => {
  return useQuery(['myLoungeData', params], () => getGroupList(params));
};

// 참가자 조회 (그룹장)

export function getGroupMemberList(status: string, tripGroupId: number) {
  return instance.get(`/api/groups/members/${tripGroupId}?status=${status}`);
}

export const useGroupMemberList = (
  status: string,
  tripGroupId: number,
  fetched: boolean
) => {
  return useQuery(
    ['groupMemberList', status, tripGroupId],
    () => getGroupMemberList(status, tripGroupId),
    {
      enabled: fetched,
    }
  );
};
