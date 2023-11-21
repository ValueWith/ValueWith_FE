import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import {
  deleteGroupApply,
  patchGroupApply,
  postGroupApply,
} from '@/apis/groupApply';

export const useGroupDataFetching = (params: any) => {
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
  const navigate = useNavigate();
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

  return { getDropdownOptions, isLoading };
};

export const useGroupDetail = () => {
  const queryClient = useQueryClient();
  const [modalDataState, setModalDataState] = useRecoilState(modalState);
  const [isLoading, setIsLoading] = useState(false);

  const handleApply = (groupId: number) => {
    setModalDataState({
      isModalOpen: true,
      type: 'confirm',
      title: '지원하기',
      message: '현재 그룹에 지원 하시겠습니까?',
      onConfirm: async () => {
        setModalDataState({ ...modalDataState, isModalOpen: false });
        try {
          setIsLoading(true);
          await postGroupApply(groupId);
        } catch (error) {
          return Promise.reject(error);
        } finally {
          setIsLoading(false);
        }

        queryClient.invalidateQueries(['groupDetailData', groupId]);
      },
      onCancel: () => {
        setModalDataState({ ...modalDataState, isModalOpen: false });
      },
    });
  };

  const handleLeaveGroup = (groupId: number) => {
    setModalDataState({
      isModalOpen: true,
      type: 'confirm',
      title: '그룹 탈퇴하기',
      message: '현재 그룹에서 탈퇴하시겠습니까?',
      onConfirm: async () => {
        setModalDataState({ ...modalDataState, isModalOpen: false });
        try {
          setIsLoading(true);
          await patchGroupApply(groupId);
        } catch (error) {
          return Promise.reject(error);
        } finally {
          setIsLoading(false);
        }

        queryClient.invalidateQueries(['groupDetailData', groupId]);
      },
      onCancel: () => {
        setModalDataState({ ...modalDataState, isModalOpen: false });
      },
    });
  };

  const handleCancleApply = (groupId: number) => {
    setModalDataState({
      isModalOpen: true,
      type: 'confirm',
      title: '지원 취소하기',
      message: '현재 그룹에 지원을 취소하시겠습니까?',
      onConfirm: async () => {
        setModalDataState({ ...modalDataState, isModalOpen: false });

        try {
          setIsLoading(true);
          await deleteGroupApply(groupId);
        } catch (error) {
          return Promise.reject(error);
        } finally {
          setIsLoading(false);
        }

        queryClient.invalidateQueries(['groupDetailData', groupId]);
      },
      onCancel: () => {
        setModalDataState({ ...modalDataState, isModalOpen: false });
      },
    });
  };

  return {
    handleApply,
    handleLeaveGroup,
    handleCancleApply,
    isLoading,
  };
};

export default useGroupDataFetching;
