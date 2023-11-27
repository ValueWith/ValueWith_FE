import { AlarmData, getAlarmList } from '@/apis/alarm';
import { useQuery } from 'react-query';

export const useGetAlarmData = () => {
  return useQuery<AlarmData>('alarmData', () => {
    return getAlarmList();
  });
};
