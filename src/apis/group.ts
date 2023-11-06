import axios from 'axios';

export interface GroupListParams {
  page: string;
  status: string;
  area: string;
  sort: string;
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
  status: string;
  thumbnailUrl: string;
  profileUrl: string;
  nickName: string;
  age: number;
  gender: string;
}

export interface GroupListItem {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
  tripGroups: TripGroup[];
}

export const fetchGroupList = async (
  params: GroupListParams
): Promise<GroupListItem> => {
  try {
    const response = await axios.get<GroupListItem>(
      'http://localhost:5000/mockData',
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
