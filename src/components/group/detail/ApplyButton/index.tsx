import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '@/recoil/modalState';
import { QueryClient } from 'react-query';

import { checkApplicationStatus } from '@/utils/checkApplicationStatus';
import { GroupDetailListItem } from '@/apis/groupDetail';
import {
  deleteGroupApply,
  patchGroupApply,
  postGroupApply,
} from '@/apis/groupApply';

import Button from '@/components/Button';

interface ApplyButtonProps {
  data: GroupDetailListItem;
  queryClient: QueryClient;
}

function ApplyButton({ data, queryClient }: ApplyButtonProps) {
  // TODO: 현재 user email 받아와야 함.
  const currentUserEmail = 'loopy@test.com';
  const [applicationStatus, setApplicationStatus] = useState<string>('');
  const [modalDataState, setModalDataState] = useRecoilState(modalState);

  useEffect(() => {
    const status = checkApplicationStatus(
      data.groupMembers,
      data.tripGroupDetail.leaderEmail,
      currentUserEmail,
      data.tripGroupDetail.status
    );
    setApplicationStatus(status);
  }, [data]);

  const handleApply = () => {
    setModalDataState({
      isModalOpen: true,
      type: 'confirm',
      title: '지원하기',
      message: '현재 그룹에 지원 하시겠습니까?',
      onConfirm: async () => {
        setModalDataState({ ...modalDataState, isModalOpen: false });
        await postGroupApply(data.tripGroupDetail.tripGroupId);

        queryClient.invalidateQueries([
          'groupDetailData',
          data.tripGroupDetail.tripGroupId,
        ]);
      },
      onCancel: () => {
        setModalDataState({ ...modalDataState, isModalOpen: false });
      },
    });
  };

  const handleLeaveGroup = () => {
    setModalDataState({
      isModalOpen: true,
      type: 'confirm',
      title: '그룹 탈퇴하기',
      message: '현재 그룹에서 탈퇴하시겠습니까?',
      onConfirm: async () => {
        setModalDataState({ ...modalDataState, isModalOpen: false });
        await patchGroupApply(data.tripGroupDetail.tripGroupId);

        queryClient.invalidateQueries([
          'groupDetailData',
          data.tripGroupDetail.tripGroupId,
        ]);
      },
      onCancel: () => {
        setModalDataState({ ...modalDataState, isModalOpen: false });
      },
    });
  };

  const handleCancleApply = () => {
    setModalDataState({
      isModalOpen: true,
      type: 'confirm',
      title: '지원 취소하기',
      message: '현재 그룹에 지원을 취소하시겠습니까?',
      onConfirm: async () => {
        setModalDataState({ ...modalDataState, isModalOpen: false });
        await deleteGroupApply(data.tripGroupDetail.tripGroupId);

        queryClient.invalidateQueries([
          'groupDetailData',
          data.tripGroupDetail.tripGroupId,
        ]);
      },
      onCancel: () => {
        setModalDataState({ ...modalDataState, isModalOpen: false });
      },
    });
  };

  return (
    <>
      {applicationStatus === '지원하기' && (
        <Button
          type='button'
          styleType='solid'
          fullWidth
          onClickHandler={handleApply}
        >
          지원하기
        </Button>
      )}
      {applicationStatus === '그룹탈퇴' && (
        <Button
          type='button'
          styleType='warning'
          fullWidth
          onClickHandler={handleLeaveGroup}
        >
          그룹탈퇴
        </Button>
      )}
      {applicationStatus === '지원취소' && (
        <Button
          type='button'
          styleType='solid'
          fullWidth
          onClickHandler={handleCancleApply}
        >
          지원취소
        </Button>
      )}
      {applicationStatus === '마감' && (
        <Button type='button' styleType='disabled' fullWidth>
          마감
        </Button>
      )}
    </>
  );
}

export default ApplyButton;
