import {
  getGroupList,
  getGroupMemberList,
  memberConfirmRequest,
  memberKickRequest,
} from '@/apis/mylounge';
import { useQuery, useQueryClient } from 'react-query';

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

export const useMyLoungeData = (params: any) => {
  return useQuery(['myLoungeData', params], () => getGroupList(params));
};

export const useLounge = () => {
  const queryClient = useQueryClient();

  // 멤버 승인
  const handleMemberConfirm = async (groupMemberId: number) => {
    try {
      const response = await memberConfirmRequest(groupMemberId);

      console.log(response);

      queryClient.invalidateQueries(['groupMemberList', 'pending']);
    } catch (error) {
      console.log(error);
    }
  };

  // 멤버 거절
  const handleMemberReject = async (groupMemberId: number) => {
    try {
      const response = await memberConfirmRequest(groupMemberId);

      console.log(response);

      queryClient.invalidateQueries(['groupMemberList', 'pending']);
    } catch (error) {
      console.log(error);
    }
  };

  // 멤버 추방
  const handleMemberKick = async (
    tripGroupId: number,
    groupMemberId: number
  ) => {
    try {
      const response = await memberKickRequest(tripGroupId, groupMemberId);

      console.log(response);

      queryClient.invalidateQueries([
        'groupMemberList',
        'approved',
        tripGroupId,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return { handleMemberConfirm, handleMemberReject, handleMemberKick };
};
