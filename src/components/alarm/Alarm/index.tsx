import { useEffect, useState } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useQueryClient } from 'react-query';

import { useGetAlarmData } from '@/hooks/useAlarm';
import useNotification from '@/hooks/useNotification';

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
  const sendNotification = useNotification();

  useEffect(() => {
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
        queryClient.invalidateQueries(['alarmData', 0]);
        setListening(true);

        // onopen시 오는 알림은 push 알림을 보내지 말아야 함
        if (event.data.includes('EventStream Created.')) {
          return;
        }

        const eventData = JSON.parse(event.data);
        // push 알림 전송
        sendNotification(
          '새로운 알림이 있습니다.',
          {
            body: `${eventData.groupName}${eventData.content.content}`,
          },
          String(eventData.redirectUrl)
        );
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
      <div onClick={() => setIsAlarmModal(true)}>
        <AiOutlineBell size={24} />
        {alarmCount > 0 && <S.AlarmCount />}
      </div>
      {isAlarmModal && <AlarmModal onClose={() => setIsAlarmModal(false)} />}
    </>
  );
}

export default Alarm;
