import {
  getGroupList,
  getGroupMemberList,
  memberConfirmRequest,
  memberKickRequest,
} from '@/apis/mylounge';
import { modalState } from '@/recoil/modalState';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';

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
  const [modalDataState, setModalDataState] = useRecoilState(modalState);
  const [isLoading, setIsLoading] = useState(false);

  // 멤버 승인
  const handleMemberConfirm = async (groupMemberId: number) => {
    try {
      setIsLoading(true);
      const response = await memberConfirmRequest(groupMemberId);

      console.log(response);

      queryClient.invalidateQueries(['groupMemberList', 'pending']);
    } catch (error) {
      setModalDataState({
        isModalOpen: true,
        title: '멤버 승인 실패',
        message: '멤버 승인에 실패하였습니다. 다시 시도해주세요.',
        onConfirm: () => {
          setModalDataState({
            ...modalDataState,
            isModalOpen: false,
          });
        },
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 멤버 거절
  const handleMemberReject = async (groupMemberId: number) => {
    try {
      setIsLoading(true);
      const response = await memberConfirmRequest(groupMemberId);

      console.log(response);

      queryClient.invalidateQueries(['groupMemberList', 'pending']);
    } catch (error) {
      setModalDataState({
        isModalOpen: true,
        title: '멤버 거절 실패',
        message: '멤버 거절에 실패하였습니다. 다시 시도해주세요.',
        onConfirm: () => {
          setModalDataState({
            ...modalDataState,
            isModalOpen: false,
          });
        },
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 멤버 추방
  const handleMemberKick = async (
    tripGroupId: number,
    groupMemberId: number
  ) => {
    try {
      setIsLoading(true);
      const response = await memberKickRequest(tripGroupId, groupMemberId);

      console.log(response);

      queryClient.invalidateQueries([
        'groupMemberList',
        'approved',
        tripGroupId,
      ]);
    } catch (error) {
      setModalDataState({
        isModalOpen: true,
        title: '멤버 추방 실패',
        message: '멤버 추방에 실패하였습니다. 다시 시도해주세요.',
        onConfirm: () => {
          setModalDataState({
            ...modalDataState,
            isModalOpen: false,
          });
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleMemberConfirm,
    handleMemberReject,
    handleMemberKick,
    isLoading,
  };
};
