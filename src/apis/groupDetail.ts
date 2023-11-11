import axios from 'axios';

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
  age: string;
  content?: string;
  createdAt: string;
  currentUserNumber: number;
  dueDate: string;
  genter: string;
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
    const response = await axios.get<GroupDetailListItem>(
      'http://localhost:5000/groupDetail',
      { params: { groupId } }
    );
    return response.data;
  } catch (error) {
    console.error('Error Fetching data: ', error);
    throw error;
  }
};
