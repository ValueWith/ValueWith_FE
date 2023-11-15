import instance from '.';

export interface GroupMember {
  groupMemberAge: string;
  groupMemberGender: string;
  groupMemberNickname: string;
  groupMemberProfileUrl: string;
}

export interface Place {
  address: string;
  category: string;
  distance: number;
  name: string;
  orders: number;
  placeCode: string;
  x: number;
  y: number;
}

export interface TripGroupDetail {
  age: number;
  content?: string;
  createdAt: string;
  currentUserNumber: number;
  dueDate: string;
  gender: string;
  maxUserNumber: number;
  name: string;
  nickName: string;
  profileUrl: string;
  status: string;
  thumbnailUrl: string;
  tripArea: string;
  tripDate: string;
  tripGroupId: number;
}

export interface GroupDetailListItem {
  tripGroupDetail: TripGroupDetail;
  groupMembers: GroupMember[];
  places: Place[];
}
export const fetchGroupDetail = async (
  groupId: number
): Promise<GroupDetailListItem> => {
  try {
    const response = await instance.get<GroupDetailListItem>(
      `/api/groups/list/${groupId}`
    );
    return response.data;
  } catch (error) {
    console.error('Error Fetching data: ', error);
    throw error;
  }
};
