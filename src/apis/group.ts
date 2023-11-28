import instance from '.';

export interface GroupListParams {
  page: string;
  status: string; // 'all' | 'open';
  area: string;
  sort: string; // 'latest' | 'deadline';
  title: string;
}

export interface TripGroup {
  tripGroupId: number;
  name: string;
  content: string;
  maxUserNumber: number;
  currentUserNumber: number;
  tripArea: string;
  tripDate: string;
  dueDate: string;
  createdAt: string;
  status: '모집중' | '마감';
  thumbnailUrl: string;
  profileUrl: string;
  nickName: string;
  age: number;
  gender: 'male' | 'female';
}

export interface GroupListItem {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
  tripGroups: TripGroup[];
}

export interface GroupMember {
  groupMemberAge: number;
  groupMemberEmail: string;
  groupMemberGender: string;
  groupMemberNickname: string;
  groupMemberProfileUrl: string;
  groupMemberStatus: string;
}

export interface Place {
  address: string;
  category: string;
  distance?: number;
  name: string;
  orders: number;
  placeCode: string;
  x: number;
  y: number;
}

export interface GroupDetailListItem {
  tripGroupDetail: TripGroup;
  groupMembers: GroupMember[];
  places: Place[];
}

// 그룹 리스트 조회
export const fetchGroupList = async (
  params: GroupListParams
): Promise<GroupListItem> => {
  try {
    const response = await instance.get<GroupListItem>(
      import.meta.env.VITE_SERVER_URL + '/groups/list',
      {
        params: params,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error Fetching data: ', error);
    throw error;
  }
};

// 그룹 상세 데이터 조회
export const fetchGroupDetail = async (
  groupId: number
): Promise<GroupDetailListItem> => {
  try {
    const response = await instance.get<GroupDetailListItem>(
      import.meta.env.VITE_SERVER_URL + `/groups/list/${groupId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error Fetching data: ', error);
    throw error;
  }
};

// 그룹 삭제
export const deleteGroupRequest = async (tripGroupId: number) => {
  return instance.delete(
    import.meta.env.VITE_SERVER_URL + `/groups/${tripGroupId}`
  );
};

// 그룹 지원
export const applyGroupRequest = async (tripGroupId: number) => {
  return instance.post(
    import.meta.env.VITE_SERVER_URL + `/groups/application/${tripGroupId}`
  );
};

// 그룹 지원 취소
export const cancelApplyRequest = async (tripGroupId: number) => {
  return instance.delete(
    import.meta.env.VITE_SERVER_URL + `/groups/application/${tripGroupId}`
  );
};

// 그룹 탈퇴
export const leaveGroupRequest = async (tripGroupId: number) => {
  return instance.patch(
    import.meta.env.VITE_SERVER_URL + `/groups/${tripGroupId}/member/left`
  );
};
