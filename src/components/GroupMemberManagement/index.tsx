import Button from '../Button';

import { FaChevronDown } from 'react-icons/fa';
import * as S from './GroupMemberManagement.styles';

interface GroupMemberManagementProps {
  isOpenApplyList: boolean;
  setIsOpenApplyList: React.Dispatch<React.SetStateAction<boolean>>;
}

function GroupMemberManagement({
  isOpenApplyList,
  setIsOpenApplyList,
}: GroupMemberManagementProps) {
  const handleClickApplyModal = () => {
    console.log('지원자 목록 보기 Open');
    setIsOpenApplyList(!isOpenApplyList);
  };

  return (
    <>
      <S.AdminContainer>
        <div className='flex gap-3'>
          <Button
            type='button'
            styleType='basic'
            size='sm'
            style={{
              border: '1px solid #707070',
              color: '#222222',
              gap: '4px',
              height: '31px',
              padding: '12px',
            }}
          >
            멤버 관리 <FaChevronDown />
          </Button>
          <Button
            type='button'
            styleType='basic'
            size='sm'
            style={{
              border: '1px solid #707070',
              color: '#222222',
              gap: '4px',
              height: '31px',
              padding: '7px',
            }}
            onClickHandler={() => handleClickApplyModal()}
          >
            지원자 목록 보기 <FaChevronDown />
          </Button>
        </div>
        <div className='flex gap-3'>
          <Button
            type='button'
            size='sm'
            styleType='text'
            style={{ color: '#4e4e4e', minWidth: '0' }}
          >
            수정
          </Button>
          <Button
            type='button'
            size='sm'
            styleType='text'
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
