import { useEffect, useState } from 'react';

import { checkApplicationStatus } from '@/utils/checkApplicationStatus';
import { GroupDetailListItem } from '@/apis/groupDetail';

import Button from '@/components/Button';

interface ApplyButtonProps {
  data: GroupDetailListItem;
}

function ApplyButton({ data }: ApplyButtonProps) {
  // TODO: 현재 user email 받아와야 함.
  const currentUserEmail = 'loopy@test.com';
  const [applicationStatus, setApplicationStatus] = useState<string>('');

  useEffect(() => {
    const status = checkApplicationStatus(
      data.groupMembers,
      data.tripGroupDetail.leaderEmail,
      currentUserEmail
    );
    setApplicationStatus(status);
  }, [data]);
  return (
    <>
      {applicationStatus &&
        (applicationStatus === '지원하기' ? (
          <Button type='button' styleType='solid' fullWidth>
            지원하기
          </Button>
        ) : (
          <Button type='button' styleType='warning' fullWidth>
            지원취소
          </Button>
        ))}
    </>
  );
}

export default ApplyButton;
