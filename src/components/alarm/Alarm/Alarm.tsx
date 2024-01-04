import { useEffect, useState } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useQueryClient } from 'react-query';

import { useGetAlarmData } from '@/hooks/useAlarm';

import AlarmModal from '../AlarmModal';

import { AiOutlineBell } from 'react-icons/ai';
import * as S from './Alarm.styles';

function Alarm() {
  const [isAlarmModal, setIsAlarmModal] = useState<boolean>(false);

  const { data } = useGetAlarmData(0);

  const [alarmCount, setAlarmCount] = useState<number>(0);

  const [isListening, setListening] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setAlarmCount(0);
      data.content.forEach((alarm) => {
        if (!alarm.isChecked) {
          setAlarmCount((prevCount) => prevCount + 1);
        }
      });
    }
  }, [data]);

  // TODO: SSE 연결
  const queryClient = useQueryClient();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    console.log(accessToken, 'accessToken');
    console.log(isListening, 'isListening');

    if (!isListening && accessToken) {
      let eventSource: any = undefined;

      eventSource = new EventSourcePolyfill(
        `${import.meta.env.VITE_BASE_URL}${
          import.meta.env.VITE_SERVER_URL
        }/alert/subscribe`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'text/event-stream',
          },
          heartbeatTimeout: 86400000,
          withCredentials: true,
        }
      );

      eventSource.onopen = (event: any) => {
        if (event.status === 200) {
          console.log('sse connect!!!!');
          setListening(true);
        }
      };

      eventSource.onmessage = (event: any) => {
        console.log(event.data);
        queryClient.invalidateQueries(['alarmData', 0]);
        setListening(true);
      };

      eventSource.onerror = (event: any) => {
        console.log('sse error!!!!');
        eventSource.close();
        setListening(false);
      };

      return () => {
        if (!isListening && eventSource !== undefined) {
          eventSource.close();
          setListening(false);
        }
      };
    }
  }, []);

  return (
    <>
      <AiOutlineBell size={24} onClick={() => setIsAlarmModal(true)} />
      <S.AlarmCount>
        {alarmCount > 19 ? alarmCount + '+' : alarmCount}
      </S.AlarmCount>
      {isAlarmModal && <AlarmModal onClose={() => setIsAlarmModal(false)} />}
    </>
  );
}

export default Alarm;
