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

export const subscribeAlarm = async () => {
  try {
    const response = await instance.get('/api/alert/subscribe');
    return response.data;
  } catch (error) {
    console.error('Error Subscribe Alarm: ', error);
    throw error;
  }
};

export const getAlarmList = async (): Promise<AlarmData> => {
  try {
    const response = await instance.get('/api/alert/');
    return response.data;
  } catch (error) {
    console.error('Error Fetching alarm data: ', error);
    throw error;
  }
};
