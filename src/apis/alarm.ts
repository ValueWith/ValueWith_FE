import instance from '.';

export interface AlarmContent {
  alertId: number;
  content: {
    content: string;
  };
  createdDateTime: [
    number, // year
    number, // month
    number, // day
    number, // hour
    number, // minute
    number, // second
    number // millisecond
  ];
  groupId: number;
  groupName: string;
  redirectUrl: string;
  isChecked: boolean;
}

export interface AlarmData {
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  content: AlarmContent[];
}

export const getAlarmList = async (page: number): Promise<AlarmData> => {
  try {
    const response = await instance.get(`/api/alert?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error Fetching alarm data: ', error);
    throw error;
  }
};

export const deleteAlarm = async (alertId: number): Promise<boolean> => {
  try {
    const response = await instance.delete(`/api/alert/${alertId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting alarm: ', error);
    throw error;
  }
};

export const readAlarm = async (alertId: number) => {
  try {
    const response = await instance.patch(`/api/alert/${alertId}`);
    return response.data;
  } catch (error) {
    console.error('Error patching read alarm: ', error);
    throw error;
  }
};

export const readAllAlarm = async () => {
  try {
    const response = await instance.patch(`/api/alert/all`);
    return response.data;
  } catch (error) {
    console.error('Error patching read all alarm: ', error);
    throw error;
  }
};
