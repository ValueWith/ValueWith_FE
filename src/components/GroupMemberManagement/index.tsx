import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGroupMemberList } from '@/hooks/useLounge';

import { useRecoilState } from 'recoil';
import { modalState } from '@/recoil/modalState';

import Button from '../Button';
import DropdownMenu from '../DropdownMenu';

import * as S from './GroupMemberManagement.styles';
import { IoArrowForward } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import { useGroup } from '@/hooks/useGroup';

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
  const navigate = useNavigate();
  const [fetched, setFetched] = useState(false);
  const [modalDataState, setModalDataState] = useRecoilState(modalState);

  const {
    data: groupMemberList,
    isLoading,
    isError,
  } = useGroupMemberList(isOpenApplyList.type, tripGroupId, fetched);

  const { handleDeleteGroup } = useGroup();

  const dropdownOption = [
    {
      label: '수정',
      onClickHandler: () => console.log('수정'),
    },
    {
      label: '삭제',
      onClickHandler: () => {
        setModalDataState({
          isModalOpen: true,
          type: 'confirm',
          title: '그룹 삭제',
          confirmType: 'warning',
          confirmText: '삭제',
          message: `그룹을 삭제하면 복구할 수 없습니다. 
          정말로 그룹을 삭제하시겠습니까?`,
          onConfirm: () => {
            handleDeleteGroup(tripGroupId);
            setModalDataState({
              ...modalDataState,
              isModalOpen: false,
            });
          },
          onCancel: () => {
            setModalDataState({
              ...modalDataState,
              isModalOpen: false,
            });
          },
        });
      },
    },
  ];

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
          {/* 그룹 관리 */}
          <DropdownMenu options={dropdownOption}>
            <Button
              type="button"
              styleType="basic"
              size="sm"
              style={{
                border: '1px solid #707070',
                color: '#222222',
                gap: '4px',
                height: '31px',
                padding: '0 8px 0 12px',
              }}
            >
              그룹 관리 <IoIosArrowDown />
            </Button>
          </DropdownMenu>

          {/* 멤버 관리 */}
          <Button
            type="button"
            styleType="basic"
            size="sm"
            style={{
              border: '1px solid #707070',
              color: '#222222',
              gap: '4px',
              height: '31px',
              padding: '0 8px 0 12px',
            }}
            onClickHandler={(event) => handleClickApplyModal(event, 'approved')}
          >
            멤버 관리 <IoIosArrowDown />
          </Button>

          {/* 지원자 목록 보기 */}
          <Button
            type="button"
            styleType="basic"
            size="sm"
            style={{
              border: '1px solid #707070',
              color: '#222222',
              gap: '4px',
              height: '31px',
              padding: '0 8px 0 12px',
            }}
            onClickHandler={(event) => handleClickApplyModal(event, 'pending')}
          >
            지원자 목록 보기 <IoIosArrowDown />
          </Button>
        </div>

        <div className="flex gap-3">
          {/* 자세히 보기  */}
          <Button
            type="button"
            size="sm"
            styleType="text"
            style={{ color: '#000', minWidth: '0' }}
            onClickHandler={() => {
              navigate(`/group/${tripGroupId}`);
            }}
          >
            <span>자세히 보기</span>
            <IoArrowForward style={{ marginLeft: '5px' }} />
          </Button>
        </div>
      </S.AdminContainer>
    </>
  );
}

export default GroupMemberManagement;
