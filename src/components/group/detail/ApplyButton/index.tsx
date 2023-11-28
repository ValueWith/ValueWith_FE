import Button from '@/components/common/Button';
import Loader from '@/components/common/Loader';
import { useGroup } from '@/hooks/useGroup';

export interface ApplyButtonProps {
  tripGroupId: number;
  userStatus: string;
}

function ApplyButton({ tripGroupId, userStatus }: ApplyButtonProps) {
  const { handleModalAction, isLoading } = useGroup();

  return (
    <div className='relative'>
      {isLoading && (
        <Loader className='z-[1]' width={30} height={30} bgColor='white' />
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
          마감
        </Button>
      )}
    </div>
  );
}

export default ApplyButton;
