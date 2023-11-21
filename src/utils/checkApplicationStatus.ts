export const checkApplicationStatus = (data: any, currentUserEmail: any) => {
  const currentUserIsLeader =
    data.tripGroupDetail.leaderEmail === currentUserEmail;

  // 현재 유저가 leader인 경우
  if (currentUserIsLeader) {
    return '';
  }

  const currentUser = data.groupMembers.find(
    (member: any) => member.groupMemberEmail === currentUserEmail
  );

  if (data.tripGroupDetail.status === '마감') {
    return '마감';
  }

  // 현재 유저가 groupMembers에 포함되어 있는 경우
  if (currentUser) {
    switch (currentUser.groupMemberStatus) {
      case 'approved':
        return '그룹탈퇴';
      case 'pending':
        return '지원취소';
      default:
        return '그룹탈퇴';
    }
  }

  return '지원하기';
};
