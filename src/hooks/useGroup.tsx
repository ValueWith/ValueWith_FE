import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { useRecoilState } from 'recoil';
import { modalState } from '@/recoil/modalState';

import {
  GroupListItem,
  GroupDetailListItem,
  fetchGroupDetail,
  applyGroupRequest,
  cancelApplyRequest,
  deleteGroupRequest,
  fetchGroupList,
  leaveGroupRequest,
} from '@/apis/group';

import {
  confirmTexts,
  confirmTypes,
  messages,
  titles,
} from '@/constants/groupModalOption';

export const useGroupDataFetching = (params: any) => {
  return useQuery<GroupListItem, Error>(['groupData', params], () =>
    fetchGroupList(params)
  );
};

export const useGroupDetailDataFetching = (tripGroupId: number) => {
  return useQuery<GroupDetailListItem>(['groupDetailData', tripGroupId], () =>
    fetchGroupDetail(tripGroupId)
  );
};

export const useGroup = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  // 그룹 지원
  const handleApplyGroup = async (tripGroupId: number) => {
    setIsLoading(true);
    try {
      const response = await applyGroupRequest(tripGroupId);
      console.log(response);

      queryClient.invalidateQueries(['groupDetailData', tripGroupId]);
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

      if (location.pathname === 'mylounge') {
        queryClient.invalidateQueries(['myLoungeData', { status: 'approved' }]);
      } else if (location.pathname.includes('group')) {
        queryClient.invalidateQueries(['groupDetailData', tripGroupId]);
      }
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

      if (location.pathname === 'mylounge') {
        queryClient.invalidateQueries(['myLoungeData', { status: 'pending' }]);
      } else if (location.pathname.includes('group')) {
        queryClient.invalidateQueries(['groupDetailData', tripGroupId]);
      }
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
    confirmType: 'confirm' | 'warning',
    onConfirm: () => void
  ) => {
    setModalDataState({
      isModalOpen: true,
      type: 'confirm',
      title,
      confirmType,
      confirmText,
      message,
      onConfirm: () => {
        onConfirm();
        setModalDataState((prevState) => ({
          ...prevState,
          confirmType: 'confirm',
          confirmText: '확인',
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
      confirmTypes[cardType],
      () => {
        if (cardType === 'leader') {
          handleDeleteGroup(tripGroupId);
        } else if (cardType === 'approved') {
          handleLeaveGroup(tripGroupId);
        } else if (cardType === 'pending') {
          handleCancelApplyGroup(tripGroupId);
        } else if (cardType === 'notMember') {
          handleApplyGroup(tripGroupId);
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
            onClickHandler: () => navigate(`/group/edit/${tripGroupId}`),
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

  return { getDropdownOptions, handleModalAction, isLoading };
};

export default useGroupDataFetching;
