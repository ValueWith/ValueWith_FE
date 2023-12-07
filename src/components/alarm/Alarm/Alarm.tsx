import { useEffect, useState } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';

import { useGetAlarmData } from '@/hooks/useAlarm';

import AlarmModal from '../AlarmModal';

import { AiOutlineBell } from 'react-icons/ai';
import * as S from './Alarm.styles';

function Alarm() {
  const [isAlarmModal, setIsAlarmModal] = useState<boolean>(false);

  const { data } = useGetAlarmData(0);

  const [alarmCount, setAlarmCount] = useState<number>(0);

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
  // const EventSource = EventSourcePolyfill;
  // const queryClient = useQueryClient();

  // const accessToken = localStorage.getItem('accessToken');

  // useEffect(() => {
  //   if (accessToken) {
  //     let eventSource: EventSource | null = null;
  //     const fetchSSE = async () => {
  //       try {
  //         eventSource = new EventSource(
  //           `${import.meta.env.VITE_SERVER_URL}/alert/subscribe`,
  //           {
  //             headers: {
  //               Authorization: accessToken,
  //             },
  //           }
  //         );
  //         eventSource.onmessage = async (event) => {
  //           const response = await event.data;
  //           console.log(response);
  //           queryClient.invalidateQueries(['alarmData']);
  //         };

  //         eventSource.onerror = async (event) => {
  //           if (eventSource) {
  //             eventSource.close();
  //           }
  //         };
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };
  //     fetchSSE();
  //     return () => eventSource?.close();
  //   }
  // }, []);

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
