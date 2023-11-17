import Button from '../Button';

import { FaChevronDown } from 'react-icons/fa';
import * as S from './GroupMemberManagement.styles';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useGroupMemberList } from '@/hooks/useLounge';

interface GroupMemberManagementProps {
  tripGroupId: number;
  isOpenApplyList: { isOpen: boolean; type: string };
  setIsOpenApplyList: Dispatch<
    SetStateAction<{ isOpen: boolean; type: string }>
  >;
  onSetApplyList: (applyList: any) => void;
}

function GroupMemberManagement({
  tripGroupId,
  isOpenApplyList,
  setIsOpenApplyList,
  onSetApplyList,
}: GroupMemberManagementProps) {
  const [fetched, setFetched] = useState(false);

  const {
    data: groupMemberList,
    isLoading,
    isError,
  } = useGroupMemberList(isOpenApplyList.type, tripGroupId, fetched);

  const handleClickApplyModal = (event: any, type: string) => {
    event.stopPropagation();

    setIsOpenApplyList({
      ...isOpenApplyList,
      type: type,
    });

    // 같은 버튼을 클릭했을 때는 지원자 목록 보기 리스트 창 감춤
    if (isOpenApplyList.isOpen && isOpenApplyList.type === type) {
      setIsOpenApplyList({
        ...isOpenApplyList,
        isOpen: false,
      });
    }

    // 다른 버튼을 클릭했을 때는 지원자 목록 보기 리스트 창 보여줌
    if (!isOpenApplyList.isOpen || isOpenApplyList.type !== type) {
      setIsOpenApplyList({ ...isOpenApplyList, isOpen: true, type: type });
    }

    setFetched(true);
    onSetApplyList(groupMemberList?.data);
  };

  useEffect(() => {
    onSetApplyList(groupMemberList?.data);
  }, [groupMemberList, isOpenApplyList]);

  return (
    <>
      <S.AdminContainer>
        <div className="flex gap-3">
          <Button
            type="button"
            styleType="basic"
            size="sm"
            style={{
              border: '1px solid #707070',
              color: '#222222',
              gap: '4px',
              height: '31px',
              padding: '12px',
            }}
            onClickHandler={(event) => handleClickApplyModal(event, 'approved')}
          >
            멤버 관리 <FaChevronDown />
          </Button>
          <Button
            type="button"
            styleType="basic"
            size="sm"
            style={{
              border: '1px solid #707070',
              color: '#222222',
              gap: '4px',
              height: '31px',
              padding: '7px',
            }}
            onClickHandler={(event) => handleClickApplyModal(event, 'pending')}
          >
            지원자 목록 보기 <FaChevronDown />
          </Button>
        </div>
        <div className="flex gap-3">
          <Button
            type="button"
            size="sm"
            styleType="text"
            style={{ color: '#4e4e4e', minWidth: '0' }}
          >
            수정
          </Button>
          <Button
            type="button"
            size="sm"
            styleType="text"
            style={{ color: '#4e4e4e', minWidth: '0' }}
          >
            삭제
          </Button>
        </div>
      </S.AdminContainer>
    </>
  );
}

export default GroupMemberManagement;
