import Button from '@/components/Button';
import { useGroupDetail } from '@/hooks/useGroup';

export interface ApplyButtonProps {
  groupId: number;
  userStatus: string;
}

function ApplyButton({ groupId, userStatus }: ApplyButtonProps) {
  const { handleApply, handleLeaveGroup, handleCancleApply } = useGroupDetail();

  return (
    <>
      {userStatus === '지원하기' && (
        <Button
          type="button"
          styleType="solid"
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
    </>
  );
}

export default ApplyButton;
