import Button from '../Button';

import { FaChevronDown } from 'react-icons/fa';
import * as S from './GroupMemberManagement.styles';
import { Dispatch, SetStateAction } from 'react';

interface GroupMemberManagementProps {
  isOpenApplyList: { isOpen: boolean; type: string };
  setIsOpenApplyList: Dispatch<
    SetStateAction<{ isOpen: boolean; type: string }>
  >;
}

function GroupMemberManagement({
  isOpenApplyList,
  setIsOpenApplyList,
}: GroupMemberManagementProps) {
  const handleClickApplyModal = (event: any, type: string) => {
    event.stopPropagation();

    // 같은 버튼을 클릭했을 때는 지원자 목록 보기 리스트 창 감춤
    if (isOpenApplyList.isOpen && isOpenApplyList.type === type) {
      setIsOpenApplyList({ isOpen: false, type: '' });
    }

    // 다른 버튼을 클릭했을 때는 지원자 목록 보기 리스트 창 보여줌
    if (!isOpenApplyList.isOpen || isOpenApplyList.type !== type) {
      setIsOpenApplyList({ isOpen: true, type: type });
    }
  };

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
            onClickHandler={(event) =>
              handleClickApplyModal(event, 'management')
            }
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
            onClickHandler={(event) => handleClickApplyModal(event, 'list')}
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
