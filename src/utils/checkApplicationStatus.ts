import { GroupMember } from '@/apis/groupDetail';

export const checkApplicationStatus = (
  groupMembers: GroupMember[],
  leaderEmail: string,
  currentUserEmail: string
) => {
  const isGroupMember = groupMembers.some(
    (member) => member.groupMemberEmail === currentUserEmail
  );

  const isLeader = leaderEmail === currentUserEmail;

  if (isGroupMember) {
    return '지원취소';
  }

  if (isLeader) {
    return '';
  }

  return '지원하기';
};
