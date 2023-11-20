import instance from '.';

export interface GroupListParams {
  page: string;
  status: 'all' | 'open';
  area: string;
  sort: 'latest' | 'deadline';
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

export const fetchGroupList = async (
  params: GroupListParams
): Promise<GroupListItem> => {
  try {
    const response = await instance.get<GroupListItem>('/api/groups/list', {
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error('Error Fetching data: ', error);
    throw error;
  }
};
