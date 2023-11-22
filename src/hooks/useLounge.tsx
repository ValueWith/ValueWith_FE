import imageCompression from 'browser-image-compression';

import {
  editProfileRequest,
  getGroupList,
  getGroupMemberList,
  getProfileRequest,
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

  // 프로필 편집 - 정보 수정
  const handleEditProfile = async (
    data: any,
    memberId: any,
    memberEmail: any,
    file?: File
  ) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      const requestBlob = new Blob([JSON.stringify(data)], {
        type: 'application/json',
      });

      formData.append('requestDto', requestBlob);

      if (file !== undefined) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
        };

        const compressedFile = await imageCompression(file, options);
        formData.append('file', compressedFile);
      } else {
        formData.append('file', '');
      }

      await editProfileRequest(memberId, formData);

      const userInfo = {
        memberId,
        memberNickname: data.nickName,
        memberEmail,
        memberProfileUrl: data.memberProfileUrl,
      };

      localStorage.setItem('userInfo', JSON.stringify(userInfo));

      setModalDataState({
        isModalOpen: true,
        title: '프로필 편집',
        message: '프로필 편집에 성공했습니다.',
        onConfirm: () => {
          setModalDataState({
            ...modalDataState,
            isModalOpen: false,
          });
        },
      });

      queryClient.invalidateQueries('profile');
    } catch (error) {
      setModalDataState({
        isModalOpen: true,
        title: '프로필 편집',
        message: '프로필 편집에 실패하였습니다. 다시 시도해주세요.',
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
    handleEditProfile,
    isLoading,
  };
};

export const useProfile = () => {
  return useQuery('profile', getProfileRequest);
};
