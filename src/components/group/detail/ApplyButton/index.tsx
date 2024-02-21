import { useGroup } from '@/hooks/useGroup';

import Button from '@/components/common/Button';
import Loader from '@/components/common/Loader';
import DropdownMenu from '@/components/common/DropdownMenu';

import { IoIosArrowDown } from 'react-icons/io';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';

export interface ApplyButtonProps {
  tripGroupId: number;
  userStatus: string;
}

function ApplyButton({ tripGroupId, userStatus }: ApplyButtonProps) {
  const { handleModalAction, getDropdownOptions, isLoading } = useGroup();

  return (
    <div>
      {isLoading && (
        <Loader className='z-[1]' width={30} height={30} bgColor='white' />
      )}

      {userStatus === 'leader' && (
        <div className='absolute top-0 height-[31px]'>
          {/* 그룹 관리 */}
          <DropdownMenu options={getDropdownOptions(tripGroupId, userStatus)}>
            <Button
              type='button'
              styleType='basic'
              size='sm'
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
        </div>
      )}

      {userStatus !== 'leader' && (
        <div className='absolute top-0 flex items-center height-[31px]'>
          {/* 관심 */}
          <RiHeartLine /> <p className='ml-2'>관심</p>
        </div>
      )}

      {userStatus === 'notMember' && (
        <Button
          type='button'
          styleType='solid'
          style={isLoading ? { pointerEvents: 'none' } : {}}
          fullWidth
          onClickHandler={() => handleModalAction(tripGroupId, 'notMember')}
        >
          지원하기
        </Button>
      )}
      {userStatus === 'approved' && (
        <Button
          type='button'
          styleType='warning'
          style={isLoading ? { pointerEvents: 'none' } : {}}
          fullWidth
          onClickHandler={() => handleModalAction(tripGroupId, 'approved')}
        >
          그룹탈퇴
        </Button>
      )}
      {userStatus === 'pending' && (
        <Button
          type='button'
          styleType='warning'
          style={isLoading ? { pointerEvents: 'none' } : {}}
          fullWidth
          onClickHandler={() => handleModalAction(tripGroupId, 'pending')}
        >
          지원취소
        </Button>
      )}

      {userStatus === '마감' && (
        <Button type='button' styleType='disabled' fullWidth>
          모집 마감
        </Button>
      )}
    </div>
  );
}

export default ApplyButton;
