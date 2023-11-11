import { useQuery } from 'react-query';
import { GroupListItem, GroupListParams, fetchGroupList } from '@/apis/group';
import { GroupDetailListItem, fetchGroupDetail } from '@/apis/groupDetail';

export const useGroupDataFetching = (params: GroupListParams) => {
  return useQuery<GroupListItem, Error>(['groupData', params], () =>
    fetchGroupList(params)
  );
};

export const useGroupDetailDataFetching = (groupId: number) => {
  return useQuery<GroupDetailListItem>(['groupDetailData', groupId], () =>
    fetchGroupDetail(groupId)
  );
};

export default useGroupDataFetching;
