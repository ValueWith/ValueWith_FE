import { useQuery } from 'react-query';
import {
  GroupListItem,
  GroupListParams,
  deleteGroupRequest,
  fetchGroupList,
} from '@/apis/group';
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

export const useGroup = () => {
  const handleDeleteGroup = async (tripGroupId: number) => {
    try {
      const response = await deleteGroupRequest(tripGroupId);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return { handleDeleteGroup };
};

export default useGroupDataFetching;
