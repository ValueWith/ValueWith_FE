import { AlarmData, AlarmPageData, getAlarmList } from '@/apis/alarm';
import { useQuery } from 'react-query';

export const useGetAlarmData = () => {
  return useQuery<AlarmPageData>('alarmData', () => {
    return getAlarmList();
  });
};
