import { GroupMember } from '@/apis/groupDetail';

export const checkApplicationStatus = (
  groupMembers: GroupMember[],
  leaderEmail: string,
  currentUserEmail: string,
  groupStatus: string
) => {
  const currentUserIsLeader = leaderEmail === currentUserEmail;

  // 현재 유저가 leader인 경우
  if (currentUserIsLeader) {
    return '';
  }

  const currentUser = groupMembers.find(
    (member) => member.groupMemberEmail === currentUserEmail
  );

  // 현재 유저가 groupMembers에 포함되어 있는 경우
  if (currentUser) {
    switch (currentUser.groupMemberStatus) {
      case 'approve':
        return '그룹탈퇴';
      case 'pending':
        return '지원취소';
      default:
        return '그룹탈퇴';
    }
  }

  if (groupStatus === '마감') {
    return '마감';
  }

  return '지원하기';
};
