import instance from '.';

export interface AlarmData {
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
}

export const getAlarmList = async (): Promise<AlarmData> => {
  try {
    const response = await instance.get('/api/alert/');
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

export const readAlarm = async (alertId: number): Promise<boolean> => {
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
