import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import { modalState } from '@/recoil/modalState';

import {
  GroupListItem,
  GroupListParams,
  cancelApplyRequest,
  deleteGroupRequest,
  fetchGroupList,
  leaveGroupRequest,
} from '@/apis/group';
import { GroupDetailListItem, fetchGroupDetail } from '@/apis/groupDetail';

import { confirmTexts, messages, titles } from '@/constants/loungeModalOption';

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
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const [modalDataState, setModalDataState] = useRecoilState(modalState);

  // 그룹 삭제
  const handleDeleteGroup = async (tripGroupId: number) => {
    setIsLoading(true);
    try {
      const response = await deleteGroupRequest(tripGroupId);
      console.log(response);

      queryClient.invalidateQueries(['myLoungeData', { status: 'leader' }]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 그룹 탈퇴
  const handleLeaveGroup = async (tripGroupId: number) => {
    setIsLoading(true);
    try {
      const response = await leaveGroupRequest(tripGroupId);
      console.log(response);

      queryClient.invalidateQueries(['myLoungeData', { status: 'approved' }]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 그룹 지원 취소
  const handleCancelApplyGroup = async (tripGroupId: number) => {
    setIsLoading(true);
    try {
      const response = await cancelApplyRequest(tripGroupId);
      console.log(response);

      queryClient.invalidateQueries(['myLoungeData', { status: 'pending' }]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const showModal = (
    title: string,
    confirmText: string,
    message: string,
    onConfirm: () => void
  ) => {
    setModalDataState({
      isModalOpen: true,
      type: 'confirm',
      title,
      confirmType: 'warning',
      confirmText,
      message,
      onConfirm: () => {
        onConfirm();
        setModalDataState((prevState) => ({
          ...prevState,
          isModalOpen: false,
        }));
      },
      onCancel: () => {
        setModalDataState((prevState) => ({
          ...prevState,
          isModalOpen: false,
        }));
      },
    });
  };

  const handleModalAction = (tripGroupId: number, cardType: string) => {
    showModal(
      titles[cardType],
      confirmTexts[cardType],
      messages[cardType],
      () => {
        if (cardType === 'leader') {
          handleDeleteGroup(tripGroupId);
        } else if (cardType === 'approved') {
          handleLeaveGroup(tripGroupId);
        } else {
          handleCancelApplyGroup(tripGroupId);
        }
      }
    );
  };

  const getDropdownOptions = (tripGroupId: number, cardType: string) => {
    switch (cardType) {
      case 'leader':
        return [
          {
            label: '수정',
            onClickHandler: () => console.log('수정'),
          },
          {
            label: '삭제',
            onClickHandler: () => handleModalAction(tripGroupId, cardType),
          },
        ];
      case 'approved':
        return [
          {
            label: '그룹 탈퇴',
            onClickHandler: () => handleModalAction(tripGroupId, cardType),
          },
        ];
      case 'pending':
        return [
          {
            label: '지원 취소',
            onClickHandler: () => handleModalAction(tripGroupId, cardType),
          },
        ];
      default:
        return [];
    }
  };

  return { getDropdownOptions, isLoading };
};

export default useGroupDataFetching;
