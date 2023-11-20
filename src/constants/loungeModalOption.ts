// Record 타입은 객체의 키와 값에 대한 타입을 정의
export const titles: Record<string, string> = {
  leader: '그룹 삭제',
  approved: '그룹 탈퇴',
  pending: '지원 취소',
};

export const confirmTexts: Record<string, string> = {
  leader: '삭제',
  approved: '탈퇴',
};

export const messages: Record<string, string> = {
  leader: '그룹을 삭제하면 복구할 수 없습니다.정말로 그룹을 삭제하시겠습니까?',
  approved: '정말로 그룹을 탈퇴하시겠습니까?',
  pending: '정말로 지원을 취소하시겠습니까?',
};
