import { AlarmData, getAlarmList } from '@/apis/alarm';
import { useQuery } from 'react-query';

export const useGetAlarmData = (page: number) => {
  return useQuery<AlarmData>(['alarmData', page], () => {
    return getAlarmList(page);
  });
};
