import Button from '@/components/Button';
import Loader from '@/components/Loader';
import { useGroupDetail } from '@/hooks/useGroup';

export interface ApplyButtonProps {
  groupId: number;
  userStatus: string;
}

function ApplyButton({ groupId, userStatus }: ApplyButtonProps) {
  const { handleApply, handleLeaveGroup, handleCancleApply, isLoading } =
    useGroupDetail();

  return (
    <div className="relative">
      {isLoading && (
        <Loader className="z-[1]" width={30} height={30} bgColor="white" />
      )}

      {userStatus === '지원하기' && (
        <Button
          type="button"
          styleType="solid"
          style={isLoading ? { pointerEvents: 'none' } : {}}
          fullWidth
          onClickHandler={() => handleApply(groupId)}
        >
          지원하기
        </Button>
      )}
      {userStatus === '그룹탈퇴' && (
        <Button
          type="button"
          styleType="warning"
          style={isLoading ? { pointerEvents: 'none' } : {}}
          fullWidth
          onClickHandler={() => handleLeaveGroup(groupId)}
        >
          그룹탈퇴
        </Button>
      )}
      {userStatus === '지원취소' && (
        <Button
          type="button"
          styleType="warning"
          style={isLoading ? { pointerEvents: 'none' } : {}}
          fullWidth
          onClickHandler={() => handleCancleApply(groupId)}
        >
          지원취소
        </Button>
      )}
      {userStatus === '마감' && (
        <Button type="button" styleType="disabled" fullWidth>
          마감
        </Button>
      )}
    </div>
  );
}

export default ApplyButton;
