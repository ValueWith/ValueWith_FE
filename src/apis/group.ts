import axios from 'axios';

export interface GroupListParams {
  status: string;
  area: string;
  sorting: string;
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
  age: string;
  gender: string;
}

export interface GroupListItem {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
  tripGroups: TripGroup[];
}

export interface GroupListResponse {
  mockData: GroupListItem[];
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
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error Fetching data: ', error);
    throw error;
  }
};
